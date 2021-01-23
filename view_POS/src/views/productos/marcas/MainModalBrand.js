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
} from "@coreui/react";

const MainModalBrand = ({ 
  open, 
  onClose, 
  onChange, 
  onSubmit, 
  brandData 
}) => {

  return (
    <CModal
      show={open}
      onClose={onClose}
      color="info"
    >
      <CModalHeader closeButton>
        <CModalTitle>{brandData.id ? 'Editar' : 'Agregar'} marca</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={onSubmit}>
        <CModalBody>
          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="marca">Marca</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CInput
                id="marca"
                name="marca"
                placeholder="Marca"
                onChange={e => onChange(e)}
                value={brandData.marca}
              />
              <CFormText>Marca</CFormText>
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
                value={brandData.descripcion}
              />
            </CCol>
          </CFormGroup>

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Cancelar
            </CButton>
          <CButton type="submit" color="info">
            {brandData.id ? 'Editar' : 'Crear'} marca
            </CButton>{" "}
        </CModalFooter>
      </CForm>
    </CModal>
  );
};

export default MainModalBrand;