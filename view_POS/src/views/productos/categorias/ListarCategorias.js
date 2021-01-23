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
import MainModalCategories from "./MainModalCategories";

const initialCategoryData = {
  id_categoria: null,
  categoria: "",
  cod_categoria: "",
  descripcion: "",
  cat_principal: "",
  sub_categoria: false,
};

const ListarCategorias = () => {
  const MySwal = withReactContent(Swal);
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState(initialCategoryData);
  const [mainModalCategoryOpen, setMainModalCategoryOpen] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [principalCategory, setPrincipalCategory] = useState([]);


  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  useEffect(() => {
    Axios.get("http://localhost:8000/api/categoria/index")
      .then((res) => {
        setCategories(res.data.data)
        let subCat=res.data.data
        let listSubCat=subCat.filter(d=>d.sub_categoria===0)
        setPrincipalCategory(listSubCat)
      })
      .catch((err) => console.log(err));
  }, []);


  const columns = [
    "Codigo de categoria",
    "Categoria",
    "Descripción",
    "Categoria Padre",
    "Acciones",
  ];

  let _data = [];
  categories.forEach((elem) => {
    _data.push([
      elem.cod_categoria,
      elem.categoria,
      elem.descripcion,
      elem.cat_principal,
      <CButtonGroup>
        <CButton
          onClick={() => {
            setCategoryData(elem);
            handleOnOpenMainModalCategory();
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
    download: true,
    print: true,
  };

  const sendData = (data) => {
    if(categoryData.id) {
      Axios.post("http://localhost:8000/api/categoria/update", data)
      .then((res) => {
        let refreshData = categories;
        refreshData.forEach((d) => {
          if (categoryData.id_categoria === d.id) {
            d.id = categoryData.id;
            d.categoria = categoryData.categoria;
            d.cod_categoria = categoryData.cod_categoria;
            d.descripcion = categoryData.descripcion;
            d.sub_categoria = categoryData.sub_categoria;
            d.cat_principal = categoryData.cat_principal;
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
        handleOnCloseMainModalCategory();
      })
      .catch((err) => {});
    } else {
      Axios.post("http://localhost:8000/api/categoria/create", data)
      .then((res) => {
        let refreshData = categories;
        refreshData.forEach((d) => {
          if (categoryData.id_categoria === d.id) {
            d.id = categoryData.id;
            d.categoria = categoryData.categoria;
            d.cod_categoria = categoryData.cod_categoria;
            d.descripcion = categoryData.descripcion;
            d.sub_categoria = categoryData.sub_categoria;
            d.cat_principal = categoryData.cat_principal;
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
        handleOnCloseMainModalCategory();
      })
      .catch((err) => {});
    }
  };

  const handleOnOpenMainModalCategory = () => {
    setMainModalCategoryOpen(true);
  };

  const handleOnCloseMainModalCategory = () => {
    setMainModalCategoryOpen(false);
    setCategoryData(initialCategoryData);
  };

  const handleOnSubmitMainModalCategory = (e) => {
    e.preventDefault();
    sendData(categoryData);
  };

  const handleOnChangeMainModalCategory = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    })
  };


  return (
    <CRow>
      <CCol className="mb-2 mb-xl-0 text-right">
        <CButton onClick={() => handleOnOpenMainModalCategory()} color="info">Agregar</CButton>
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

      {/** MainModalCategories */}
      <MainModalCategories
        open={mainModalCategoryOpen}
        onClose={handleOnCloseMainModalCategory}
        onChange={handleOnChangeMainModalCategory}
        onSubmit={handleOnSubmitMainModalCategory}
        categoryData={categoryData}
        setCategoryData={setCategoryData}
        principalCategory={principalCategory}
      />
      
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
            Cancel
          </CButton>
          <CButton color="info">Do Something</CButton>{" "}
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default ListarCategorias;
