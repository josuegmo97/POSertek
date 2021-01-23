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
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CTextarea,
  CFormText,
  CSwitch,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";

const ListarCategorias = () => {
  const MySwal = withReactContent(Swal);
  const [categories, setCategories] = useState([]);
  const [editData, setEditData] = useState({
    id_categoria: null,
    categoria: "",
    cod_categoria: "",
    descripcion: "",
    cat_principal: "",
    sub_categoria: false,
  });
  const [deleteData, setDeleteData] = useState({
    id: null,
  });
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [principalCategory, setPrincipalCategory] = useState([]);

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  const abrirCerrarModalAgregar = () => {
    setModalAgregar(!modalAgregar);
  };

  const handleOnChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:8000/api/categoria/index")
      .then((res) => {
        setCategories(res.data.data);
        let subCat = res.data.data;
        let listSubCat = subCat.filter((d) => d.sub_categoria === 0);
        setPrincipalCategory(listSubCat);
      })
      .catch((err) => console.log(err));
  }, []);

  const actions = (
    <CButton shape="pill" color="primary">
      <CIcon className="mr-2 mb-1" content={freeSet.cilPlus} />
      Añadir categoria
    </CButton>
  );

  const columns = [
    "Codigo de categoria",
    "Categoria",
    "Descripción",
    "Categoria Padre",
    "Acciones",
  ];
  let _data = [];
  categories.map((elem) => {
    _data.push([
      elem.cod_categoria,
      elem.categoria,
      elem.descripcion,
      elem.cat_principal,
      <CButtonGroup>
        <CButton
          onClick={() => {
            setEditData({
              ...editData,
              id_categoria: elem.id,
              categoria: elem.categoria,
              cod_categoria: elem.cod_categoria,
              descripcion: elem.descripcion,
              sub_categoria: elem.sub_categoria !== 0 ? true : false,
              cat_principal: elem.cat_principal,
            });
            abrirCerrarModalEditar();
          }}
          color="info"
        >
          Editar
        </CButton>
        <CButton
          onClick={() => {
            setDeleteData({
              ...deleteData,
              id:elem.id
            })
            abrirCerrarModalEliminar();
          }}
          color="danger"
        >
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
    download: true,
    print: true,
  };
  const sendData = (data) => {
    Axios.post("http://localhost:8000/api/categoria/update", data)
      .then((res) => {
        let refreshData = categories;
        refreshData.map((d) => {
          if (editData.id_categoria === d.id) {
            d.id = editData.id;
            d.categoria = editData.categoria;
            d.cod_categoria = editData.cod_categoria;
            d.descripcion = editData.descripcion;
            d.sub_categoria = editData.sub_categoria;
            d.cat_principal = editData.cat_principal;
          }
        });
        MySwal.fire({
          title: "Categoria actualizada correctamente",
          icon: "success",
          toast: true,
          showConfirmButton: false,
          timer: 2000,
          position: "top-end",
        });
        abrirCerrarModalEditar();
      })
      .catch((err) => {});
  };
  const deleteElem = async (elemId) => {
    await Axios.post(`http://localhost:8000/api/categoria/delete`, {
      id: elemId,
    })
      .then((res) => {
        if (res.status === 200) {
          MySwal.fire({
            title: "Categoria eliminada correctamente",
            icon: "success",
            toast: true,
            showConfirmButton: false,
            timer: 2000,
            position: "top-end",
          });
          setCategories(categories.filter((arg) => arg.id !== elemId));
          abrirCerrarModalEliminar()
        }
      })
      .catch((err) => {          MySwal.fire({
        title: "Error al eliminar la categoria",
        icon: "error",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
      });});
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    sendData(editData);
  };

  return (
    <CRow>
      <CCol className="mb-2 mb-xl-0 text-right">
        <CButton onClick={() => abrirCerrarModalAgregar()} color="info">
          Agregar
        </CButton>
      </CCol>
      <CCol xs="12" className="mt-2">
        <CCard>
          <MUIDataTable
            title={"Lista de Categorias"}
            data={_data}
            columns={columns}
            options={options}
          />
        </CCard>
      </CCol>
      {/**Modal Agregar */}
      <CModal
        show={modalAgregar}
        onClose={() => abrirCerrarModalAgregar()}
        color="info"
      >
        <CModalHeader closeButton>
          <CModalTitle>Agregar Categoria</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleOnSubmit}>
          <CModalBody>
            <CFormGroup row>
              <CCol md="4">
                <CLabel htmlFor="text-input">Codigo categoria</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput
                  id="text-input"
                  name="cod_categoria"
                  placeholder="Text"
                  onChange={handleOnChange}
                  value={editData.cod_categoria}
                />
                <CFormText>This is a help text</CFormText>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="4">
                <CLabel htmlFor="text-input">Nombre de la categoria</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput
                  id="text-input"
                  name="categoria"
                  placeholder="Text"
                  onChange={handleOnChange}
                  value={editData.categoria}
                />
                <CFormText>This is a help text</CFormText>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="4">
                <CLabel htmlFor="textarea-input">Descripción</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CTextarea
                  name="descripcion"
                  id="textarea-input"
                  rows="3"
                  placeholder="Content..."
                  onChange={handleOnChange}
                  value={editData.descripcion}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol tag="label" sm="4" className="col-form-label">
                Añadir categoria padre
              </CCol>
              <CCol sm="8">
                <CSwitch
                  className="mr-1 mt-2"
                  color="primary"
                  name="sub_categoria"
                  checked={editData.sub_categoria}
                  onChange={() => {
                    setEditData({
                      ...editData,
                      sub_categoria: !editData.sub_categoria,
                    });
                  }}
                />
              </CCol>
            </CFormGroup>
            {editData.sub_categoria ? (
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="select">Categoria padre</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CSelect
                    custom
                    name="cat_principal"
                    id="select"
                    onChange={handleOnChange}
                    value={editData.cat_principal}
                  >
                    <option value="">Seleccione una categoria</option>
                    {principalCategory.map((data) => {
                      return (
                        <option value={data.categoria}>{data.categoria}</option>
                      );
                    })}
                  </CSelect>
                </CCol>
              </CFormGroup>
            ) : null}
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => abrirCerrarModalAgregar()}
            >
              Cancelar
            </CButton>
            <CButton type="submit" color="info">
              Agregar
            </CButton>{" "}
          </CModalFooter>
        </CForm>
      </CModal>
      {/**Modal Editar */}
      <CModal
        show={modalEditar}
        onClose={() => abrirCerrarModalEditar()}
        color="info"
      >
        <CModalHeader closeButton>
          <CModalTitle>Editar Categoria</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleOnSubmit}>
          <CModalBody>
            <CFormGroup row>
              <CCol md="4">
                <CLabel htmlFor="text-input">Codigo categoria</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput
                  id="text-input"
                  name="cod_categoria"
                  placeholder="Text"
                  onChange={handleOnChange}
                  value={editData.cod_categoria}
                />
                <CFormText>This is a help text</CFormText>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="4">
                <CLabel htmlFor="text-input">Nombre de la categoria</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput
                  id="text-input"
                  name="categoria"
                  placeholder="Text"
                  onChange={handleOnChange}
                  value={editData.categoria}
                />
                <CFormText>This is a help text</CFormText>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="4">
                <CLabel htmlFor="textarea-input">Descripción</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CTextarea
                  name="descripcion"
                  id="textarea-input"
                  rows="3"
                  placeholder="Content..."
                  onChange={handleOnChange}
                  value={editData.descripcion}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol tag="label" sm="4" className="col-form-label">
                Añadir categoria padre
              </CCol>
              <CCol sm="8">
                <CSwitch
                  className="mr-1 mt-2"
                  color="primary"
                  name="sub_categoria"
                  checked={editData.sub_categoria}
                  onChange={() => {
                    setEditData({
                      ...editData,
                      sub_categoria: !editData.sub_categoria,
                    });
                  }}
                />
              </CCol>
            </CFormGroup>
            {editData.sub_categoria ? (
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="select">Categoria padre</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CSelect
                    custom
                    name="cat_principal"
                    id="select"
                    onChange={handleOnChange}
                    value={editData.cat_principal}
                  >
                    <option value={"0"}>Seleccione una categoria</option>
                    {principalCategory.map((data) => {
                      return (
                        <option value={parseInt(data.id)}>
                          {data.categoria}
                        </option>
                      );
                    })}
                  </CSelect>
                </CCol>
              </CFormGroup>
            ) : null}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => abrirCerrarModalEditar()}>
              Cancelar
            </CButton>
            <CButton type="submit" color="info">
              Editar
            </CButton>{" "}
          </CModalFooter>
        </CForm>
      </CModal>
      {/** Modal eliminar */}
      <CModal
        show={modalEliminar}
        onClose={() => abrirCerrarModalEliminar()}
        color="alert"
      >
        <CModalHeader closeButton>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => abrirCerrarModalEliminar()}>
            Cancelar
          </CButton>
          <CButton onClick={() => deleteElem(deleteData.id)} color="info">Eliminar</CButton>{" "}
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default ListarCategorias;
