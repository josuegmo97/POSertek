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
import MainModalUnit from "./MainModalUnit";

const initialUnitData = {
  nombre: '',
  nombre_corto: '',
  decimal: false,
  sub_unidad: false,
  equivalencia: 0,
  unid_principal: 0,
};

const ListarUnidades = () => {
  const MySwal = withReactContent(Swal);
  const [unitsList, setUnitsList] = useState([]);
  const [unitData, setUnitData] = useState(initialUnitData);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [mainModalUnitOpen, setMainModalUnitOpen] = useState(false);


  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  useEffect(() => {
    Axios.get("http://localhost:8000/api/unidades/index")
      .then((res) => {
        setUnitsList(res.data.data)
      })
      .catch((err) => console.log(err));
  }, []);


  const columns = [
    "Nombre",
    "Nombre corto",
    "Decimal",
    "Sub unidad",
    "Equivalencia",
    "Unidad Principal",
    "Acciones",
  ];


  let _data = [];
  unitsList.forEach((elem) => {
    _data.push([
      elem.nombre,
      elem.nombre_corto,
      elem.decimal,
      elem.sub_unidad,
      elem.equivalencia,
      elem.unid_principal,

      <CButtonGroup >
        <CButton
          onClick={() => {
            setUnitData(elem);
            handleOnOpenMainModalUnit();
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

const handleOnOpenMainModalUnit = () => {
  setMainModalUnitOpen(true);
};

const handleOnCloseMainModalUnit = () => {
  setMainModalUnitOpen(false);
  setUnitData(initialUnitData);
};

const handleOnSubmitMainModalUnit = (e) => {
  e.preventDefault();
  if (unitData.id) {
    Axios
    .post('http://localhost:8000/api/unidades/update', unitData)
    .then(MySwal.fire({
      title: "Unidad actualizada correctamente",
      icon: "error",
      toast: true,
      showConfirmButton: false,
      timer: 2000,
      position: "top-end",
    }))
    .catch(MySwal.fire({
      title: "Ha ocurrido un error",
      icon: "error",
      toast: true,
      showConfirmButton: false,
      timer: 2000,
      position: "top-end",
    }))
  } else {
    Axios
    .post('http://localhost:8000/api/unidades/create', unitData)
    .then(_ => MySwal.fire({
      title: "Unidad creada correctamente",
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
  setUnitData(initialUnitData);
};

const handleOnChangeMainModalUnit = (e) => {
  setUnitData({
    ...unitData,
    [e.target.name]: e.target.value,
  })
};

return (
  <CRow>
    <CCol className="mb-2 mb-xl-0 text-right">
      <CButton onClick={() => handleOnOpenMainModalUnit()} color="info">Agregar</CButton>
    </CCol>
    <CCol xs="12" className="mt-2">
      <CCard>
        <MUIDataTable
          title={"Lista de Unidades"}
          data={_data}
          columns={columns}
          options={options}
        />
      </CCard>
    </CCol>

    {/** Main Modal */}

    <MainModalUnit
      open={mainModalUnitOpen}
      onClose={handleOnCloseMainModalUnit}
      onChange={handleOnChangeMainModalUnit}
      onSubmit={handleOnSubmitMainModalUnit}
      unitData={unitData}
      setUnitData={setUnitData}
      unitsList={unitsList}  
    />

    {/** Modal eliminar */}
    <CModal
      show={modalEliminar}
      onClose={() => abrirCerrarModalEliminar()}
      color="alert"
    >
      <CModalHeader closeButton>
        <CModalTitle>Eliminar Unidad</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Desea eliminar esta Unidad?
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

export default ListarUnidades;
