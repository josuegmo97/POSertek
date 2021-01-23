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
import MainModalVariations from "./MainModalVariations";

const initialVariationData = {
  descripcion: '',
  valores: [],
};

const initialVariationValueData = {
  descripcion: '',
};

const ListarVariaciones = () => {
  const MySwal = withReactContent(Swal);
  const [variationsList, setVariationsList] = useState([]);
  const [newValueList, setNewValueList] = useState([]);
  const [variationData, setVariationData] = useState(initialVariationData);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [mainModalVariationOpen, setMainModalVariationOpen] = useState(false);


  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  useEffect(() => {
    Axios.get("http://localhost:8000/api/variaciones/index")
      .then((res) => {
        setVariationsList(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);


  const columns = [
    "Descripción",
    "Valores",
    "Acciones",
  ];


  let _data = [];
  variationsList.forEach((elem) => {
    let values = elem.valores.map(val => {
      return val.descripcion
    });
    _data.push([
      elem.descripcion,
      values.join(', '),

      <CButtonGroup >
        <CButton
          onClick={() => {
            setVariationData(elem);
            handleOnOpenMainModalBrand(elem);
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

  const handleOnOpenMainModalBrand = (elem) => {
    if (elem) {
      setNewValueList(elem.valores);
      setMainModalVariationOpen(true);
    } else {
      setMainModalVariationOpen(true);
    }
  };

  const handleOnCloseMainModalBrand = () => {
    setMainModalVariationOpen(false);
    setVariationData(initialVariationData);
  };

  const handleOnSubmitMainModalBrand = (e) => {
    e.preventDefault();
    setVariationData({
      ...variationData,
      valores: newValueList,
    });

    Axios
    .post('http://localhost:8000/api/variaciones/create', variationData)
    .then(_ => {
      MySwal.fire({
        title: variationData.id ? "Variacion actualizada correctamente" : "Variacion creada",
        icon: "success",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
      });
    })
    .catch(_ => {
      MySwal.fire({
        title: "Ha ocurrido un error",
        icon: "error",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
      });
    })

    setVariationsList([]);
    setVariationData(initialVariationData);
  };

  const handleOnChangeMainModalBrand = (e) => {
    setVariationData({
      ...variationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnBrandNewValue = () => {
    let newValues = [];
    newValues.push(initialVariationValueData);
    setNewValueList([...newValueList, newValues])
  };

  const handleOnChangeValues = (e, i) => {  
    newValueList.forEach((elem, index) => {
      if (index === i) {
        elem.descripcion = e.target.value;
      }
    });
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

      <MainModalVariations
        open={mainModalVariationOpen}
        onClose={handleOnCloseMainModalBrand}
        onChange={handleOnChangeMainModalBrand}
        onSubmit={handleOnSubmitMainModalBrand}
        variationData={variationData}
        setVariationData={setVariationData}
        newValue={handleOnBrandNewValue}
        onChangeNewValue={handleOnChangeValues}
        newValueList={newValueList}
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
          <CButton color="danger">Eliminar</CButton>{" "}
        </CModalFooter>
      </CModal>
    </CRow>

  );
};

export default ListarVariaciones;
