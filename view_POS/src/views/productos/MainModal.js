import React, { useState, useEffect } from "react";
import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CTextarea,
  CFormText,
  CSwitch,
  CSelect,
} from "@coreui/react";
import Axios from "axios";

const MainModal = ({ 
  open, 
  onClose, 
  onChange, 
  onSubmit, 
  productData,
  setProductData,
}) => {

  // -------------------USE STATE-------------------
  
  const [categories, setCategories] = useState([{name: 'test'}]);
  const [brands, setBrands] = useState([{name: 'test'}]);
  const [units, setUnits] = useState([{name: 'test'}]);

  
  // -------------------USE EFFECT-------------------

  useEffect(() => {
    Axios
    .all([
      Axios.get('http://localhost:8000/api/categoria/index'),
      Axios.get('http://localhost:8000/api/unidades/index'),
      Axios.get('http://localhost:8000/api/marca/index'),
    ])
    .then(Axios.spread((...responses) => {
      setCategories(responses[0].data.data);
      setUnits(responses[1].data.data);
      setBrands(responses[2].data.data);
    }))
    .catch(err => {});
  }, [])

  const test = () => {
    console.log(categories);
  };

  // -------------------FUNCTIONS-------------------

  return (
    <CModal
      show={open}
      onClose={onClose}
      color="info"
    >
      <button onClick={() => test()}>test</button>
      <CModalHeader closeButton>
        <CModalTitle>Agregar Producto</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={onSubmit}>
        <CModalBody>
          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="nombre">Nombre</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CInput
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                onChange={e => onChange(e)}
                value={productData.nombre}
              />
              <CFormText>Nombre del Producto</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="sku">SKU</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CInput
                id="sku"
                name="sku"
                placeholder="SKU"
                onChange={e => onChange(e)}
                value={productData.sku}
              />
              <CFormText>SKU del Producto.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="tipo_codigo">Tipo de codigo</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CSelect
                custom
                name="tipo_codigo"
                id="tipo_codigo"
                onChange={e => onChange(e)}
                value={productData.tipo_codigo}
              >
                <option value="" defaultValue>Seleccione ...</option>
                <option value="libra">Codigo 1</option>
              </CSelect>
              <CFormText>Tipo de codigo.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="unidad">Unidad</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CSelect
                custom
                name="unidad"
                id="unidad"
                onChange={e => onChange(e)}
                value={productData.unidad_id}
              >
                <option value="" selected disabled>Seleccione ...</option>
                {units.map((elem, i)=> (
                  <option key={i} value={elem.nombre_corto}>{elem.nombre}({elem.nombre_corto})</option>
                ))}
              </CSelect>
              <CFormText>Unidad.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="marca">Marca</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CSelect
                custom
                name="marca"
                id="marca"
                onChange={e => onChange(e)}
                value={productData.marca_id}
              >
                <option value="" disabled defaultValue>Seleccione ...</option>
                {brands.map((elem, i)=> (
                  <option key={i} value={elem.marca}>{elem.marca}</option>
                ))}
              </CSelect>
              <CFormText>Marca.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="categoria">Categoria</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CSelect
                custom
                name="categoria"
                id="categoria"
                onChange={e => onChange(e)}
                value={productData.categoria_id}
              >
                <option value="" disabled defaultValue>Seleccione ...</option>
                {categories.map((elem, i)=> (
                  <option key={i} value={elem.categoria}>{elem.categoria}</option>
                ))}
              </CSelect>
              <CFormText>Categoria</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="subcategoria_id">Subcategoria</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CSelect
                custom
                name="subcategoria_id"
                id="subcategoria_id"
                onChange={e => onChange(e)}
                value={productData.subcategoria_id}
              >
                <option value="" disabled defaultValue>Seleccione ...</option>
                <option value="libra">Subcategoria 11</option>
              </CSelect>
              <CFormText>Subcategoria.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="cantidad_alerta">Cantidad alerta</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CInput
                id="cantidad_alerta"
                name="cantidad_alerta"
                placeholder="Cantidad alerta"
                onChange={e => onChange(e)}
                value={productData.cantidad_alerta}
              />
              <CFormText>Indica la cantidad de productos restante para la alerta.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="appendedInputButton">Imagen</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <div className="controls">
                <CInputGroup>
                  <CInput
                    id="appendedInputButton"
                    size="16"
                    type="text"
                    onChange={e => onChange(e)}
                  />
                  <CInputGroupAppend>
                    <CButton color="secondary">Imagen</CButton>
                  </CInputGroupAppend>
                </CInputGroup>
              </div>
              <CFormText>Imagen.</CFormText>
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
                placeholder="Descripcion"
                onChange={e => onChange(e)}
                value={productData.descripcion}
              />
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="appendedInputButton">Vender</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CSwitch
                className="mr-1"
                name="vender"
                color="success"
                defaultChecked={productData.vender}
                onChange={_ => setProductData({...productData, vender: !productData.vender})}
              />
              <CFormText>Vender</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="impuesto_noincluido">Impuesto no incluido</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CInput
                id="impuesto_noincluido"
                name="impuesto_noincluido"
                placeholder="Impuesto no incluido"
                onChange={e => onChange(e)}
                value={productData.impuesto_noincluido}
              />
              <CFormText>Impuesto no incluido</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="impuesto_incluido">Impuesto incluido</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CInput
                id="impuesto_incluido"
                name="impuesto_incluido"
                placeholder="Impuesto no incluido"
                onChange={e => onChange(e)}
                value={productData.impuesto_incluido}
              />
              <CFormText>Impuesto incluido</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="excluyendo_impuesto">Excluyendo impuesto</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CInput
                id="excluyendo_impuesto"
                name="excluyendo_impuesto"
                placeholder="Excluyendo impuesto"
                onChange={e => onChange(e)}
                value={productData.excluyendo_impuesto}
              />
              <CFormText>Excluyendo impuesto</CFormText>
            </CCol>
          </CFormGroup>

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Cancelar
            </CButton>
          <CButton type="submit" color="info">
            Crear Producto
            </CButton>{" "}
        </CModalFooter>
      </CForm>
    </CModal>
  );
};

export default MainModal;