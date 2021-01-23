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
  CFormText,
} from "@coreui/react";

const MainModalVariations = ({
  open,
  onClose,
  onChange,
  onSubmit,
  variationData,
  newValue,
  onChangeNewValue,
  newValueList,
}) => {
  return (
    <CModal
      show={open}
      onClose={onClose}
      color="info"
    >
      <CModalHeader closeButton>
        <CModalTitle>{variationData.id ? 'Editar' : 'Agregar'} Variacion</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={onSubmit}>
        <CModalBody>
          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="descripcion">Descripcion</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CInput
                id="descripcion"
                name="descripcion"
                placeholder="Descripcion"
                onChange={e => onChange(e)}
                value={variationData.descripcion}
              />
              <CFormText>Descripcion</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="nombre">Valores</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              {newValueList.map((elem, i) => {
                return (
                  <CInput
                    key={i}
                    style={{marginBottom: '1em'}}
                    id=""
                    name=""
                    placeholder="Valor"
                    onChange={(e) => onChangeNewValue(e, i)}
                    value={elem.descripcion}
                  />
                )
              })}
              <CButton color="secondary" onClick={newValue}>
                Agregar nuevo valor
              </CButton>
              <CFormText>Valores</CFormText>
            </CCol>
          </CFormGroup>

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Cancelar
          </CButton>
          <CButton type="submit" color="info">
            {variationData.id ? 'Editar' : 'Crear'} Producto
          </CButton>{" "}
        </CModalFooter>
      </CForm>
      
    </CModal>
  );
};

export default MainModalVariations;
