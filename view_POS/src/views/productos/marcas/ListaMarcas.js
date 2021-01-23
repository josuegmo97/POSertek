import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MUIDataTable from "mui-datatables";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import MainModalBrand from "./MainModalBrand";

const initialBrandData = {
  marca: '',
  descripcion: '',
};

const ListarMarcas = () => {
  const MySwal = withReactContent(Swal);
  const [brandsList, setBrandsList] = useState([]);
  const [brandData, setBrandData] = useState(initialBrandData);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [mainModalBrandOpen, setMainModalBrandOpen] = useState(false);


  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  useEffect(() => {
    Axios.get("http://localhost:8000/api/marca/index")
      .then((res) => {
        setBrandsList(res.data.data)
      })
      .catch((err) => console.log(err));
  }, []);


  const columns = [
    "Marca",
    "Descripción",
    "Acciones",
  ];


  let _data = [];
  brandsList.forEach((elem) => {
    _data.push([
      elem.marca,
      elem.descripcion,

      <CButtonGroup >
        <CButton
          onClick={() => {
            setBrandData(elem);
            handleOnOpenMainModalBrand();
          }}
          color="info"
        >
          Editar
        </CButton>
        <CButton onClick={() => abrirCerrarModalEliminar()} color="danger">
          Eliminar
        </CButton>
      </CButtonGroup >,
    ]);
  });

  const options = {
    filterType: "checkbox",
    caseSensitive: true,
    filter: false,
    responsive: "vertical",
    download: false,
    print: false,
  };

  // -----------------FUNCTIONS-----------------

  const handleOnOpenMainModalBrand = () => {
    setMainModalBrandOpen(true);
  };

  const handleOnCloseMainModalBrand = () => {
    setMainModalBrandOpen(false);
    setBrandData(initialBrandData);
  };

  const handleOnSubmitMainModalBrand = (e) => {
    e.preventDefault();
    if (brandData.id) {
      Axios
      .post('http://localhost:8000/api/marca/update', brandData)
      .then(_ => MySwal.fire({
        title: "Marca actualizada correctamente",
        icon: "success",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
      }))
      .catch(_ => MySwal.fire({
        title: "Ha ocurrido un error",
        icon: "error",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
      }))
    } else {
      Axios
      .post('http://localhost:8000/api/marca/create', brandData)
      .then(_ => MySwal.fire({
        title: "Marca creada correctamente",
        icon: "success",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
      }))
      .catch(_ => MySwal.fire({
        title: "Ha ocurrido un error",
        icon: "error",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
      }))
    }
    setBrandData(initialBrandData);
  };

  const handleOnChangeMainModalBrand = (e) => {
    setBrandData({
      ...brandData,
      [e.target.name]: e.target.value,
    })
  };

  return (
    <CRow>
      <CCol className="mb-2 mb-xl-0 text-right">
        <CButton onClick={() => handleOnOpenMainModalBrand()} color="info">Agregar</CButton>
      </CCol>
      <CCol xs="12" className="mt-2">
        <CCard>
          <MUIDataTable
            title={"Lista de Marcas"}
            data={_data}
            columns={columns}
            options={options}
          />
        </CCard>
      </CCol>

      {/** Main Modal */}

      <MainModalBrand
        open={mainModalBrandOpen}
        onClose={handleOnCloseMainModalBrand}
        onChange={handleOnChangeMainModalBrand}
        onSubmit={handleOnSubmitMainModalBrand}
        brandData={brandData}
      />

      {/** Modal eliminar */}
      <CModal
        show={modalEliminar}
        onClose={() => abrirCerrarModalEliminar()}
        color="alert"
      >
        <CModalHeader closeButton>
          <CModalTitle>Eliminar Marca</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Desea eliminar esta marca?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => abrirCerrarModalEliminar()}>
            Cancelar
          </CButton>
          <CButton color="info">Eliminar</CButton>{" "}
        </CModalFooter>
      </CModal>
    </CRow>

  );
};

export default ListarMarcas;
