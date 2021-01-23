import React from "react";
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
  CTextarea,
  CFormText,
  CSwitch,
  CSelect,
} from "@coreui/react";

const MainModalCategories = ({
  open,
  onClose,
  onChange,
  onSubmit,
  categoryData,
  setCategoryData,
  principalCategory
}) => {

  return (
    <CModal
      show={open}
      onClose={onClose}
      color="info"
    >
      <CModalHeader closeButton>
        <CModalTitle>{categoryData.id ? 'Editar' : 'Crear'} Categoria</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={onSubmit}>
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
                onChange={onChange}
                value={categoryData.cod_categoria}
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
                onChange={onChange}
                value={categoryData.categoria}
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
                onChange={onChange}
                value={categoryData.descripcion}
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
                checked={categoryData.sub_categoria}
                onChange={() => {
                  setCategoryData({
                    ...categoryData,
                    sub_categoria: !categoryData.sub_categoria,
                  });
                }}
              />
            </CCol>
          </CFormGroup>
          {categoryData.sub_categoria ? (
            <CFormGroup row>
              <CCol md="4">
                <CLabel htmlFor="select">Categoria padre</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CSelect
                  custom
                  name="cat_principal"
                  id="select"
                  onChange={onChange}
                  value={categoryData.cat_principal}
                >
                  <option value={"0"}>Seleccione una categoria</option>
                  {principalCategory.map(data => {
                    return (
                      <option value={parseInt(data.id)}>{data.categoria}</option>
                    )
                  })}
                </CSelect>
              </CCol>
            </CFormGroup>
          ) : null}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Cancel
          </CButton>
          <CButton type="submit" color="info">
            {categoryData.id ? 'Editar' : 'Crear'} categoria
          </CButton>{" "}
        </CModalFooter>
      </CForm>
    </CModal>
  );
};

export default MainModalCategories;
