import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MUIDataTable from "mui-datatables";
import {
  CButton,
  CCard,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButtonGroup,
} from "@coreui/react";
import MainModal from "./MainModal";

const initialProductData = {
  nombre: '',
  sku: '',
  tipo_codigo: '',
  unidad_id: '',
  marca_id: '',
  categoria_id: '',
  subcategoria_id: '',
  cantidad_alerta: '',
  imagen: '',
  descripcion: '',
  vender: false,
  impuesto_noincluido: '',
  impuesto_incluido: '',
  margen: '',
  excluyendo_impuesto: '',
};

const ListarProductos = () => {
  const MySwal = withReactContent(Swal);
  const [productsList, setProductsList] = useState([]);
  const [productData, setProductData] = useState(initialProductData);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [mainModalOpen, setMainModalOpen] = useState(false);


  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  useEffect(() => {
    Axios.get("http://localhost:8000/api/productos/index")
      .then((res) => {
        setProductsList(res.data.data)
      })
      .catch((err) => console.log(err));
  }, []);


  const columns = [
    "Nombre",
    "SKU",
    "Tipo codigo",
    "Unidad",
    "Marca",
    "Categoria",
    "Subcategoria",
    "Cantidad alerta",
    "imagen",
    "Descripcion",
    "Vender",
    "Inpuesto no incluido",
    "Inpuesto incluido",
    "Margen",
    "Excluyendo impuestos",
    "Acciones",
  ];


  let _data = [];
  productsList.forEach((elem) => {
    _data.push([
      elem.nombre,
      elem.sku,
      elem.tipo_codigo,
      elem.unidad_id,
      elem.marca_id,
      elem.categoria_id,
      elem.subcategoria_id,
      elem.cantidad_alerta,
      elem.imagen,
      elem.descripcion,
      elem.vender,
      elem.impuesto_noincluido,
      elem.impuesto_incluido,
      elem.margen,
      elem.excluyendo_impuesto,

      <CButtonGroup>
        <CButton
          onClick={() => {
            setProductData(elem);
            handleOnOpenMainModal();
          }}
          color="info"
        >
          Editar
        </CButton>
        <CButton onClick={() => abrirCerrarModalEliminar()} color="danger">
          Eliminar
        </CButton>
      </CButtonGroup>,
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

  const handleOnOpenMainModal = () => {
    setMainModalOpen(true);
  };

  const handleOnCloseMainModal = () => {
    setMainModalOpen(false);
    setProductData(initialProductData);
  };

  const handleOnSubmitMainModal = (e) => {
    e.preventDefault();
    console.log(productData);
  };

  const handleOnChangeMainModal = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    })
  };

  return (
    <CRow>
      <CCol className="mb-2 mb-xl-0 text-right">
        <CButton onClick={() => handleOnOpenMainModal()} color="info">Agregar</CButton>
      </CCol>
      <CCol xs="12" className="mt-2">
        <CCard>
          <MUIDataTable
            title={"Lista de Productos"}
            data={_data}
            columns={columns}
            options={options}
          />
        </CCard>
      </CCol>

      {/** Main Modal */}

      <MainModal 
        open={mainModalOpen}
        onClose={handleOnCloseMainModal}
        onChange={handleOnChangeMainModal}
        onSubmit={handleOnSubmitMainModal}
        productData={productData}
        setProductData={setProductData}
      />

      {/** Modal eliminar */}
      <CModal
        show={modalEliminar}
        onClose={() => abrirCerrarModalEliminar()}
        color="alert"
      >
        <CModalHeader closeButton>
          <CModalTitle>Eliminar Producto</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Desea eliminar este producto?
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

export default ListarProductos;
