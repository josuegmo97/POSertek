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
  CSwitch,
  CSelect,
} from "@coreui/react";

const MainModalUnit = ({ 
  open, 
  onClose, 
  onChange, 
  onSubmit, 
  unitData,
  setUnitData,
  unitsList,
}) => {

  return (
    <CModal
      show={open}
      onClose={onClose}
      color="info"
    >
      <CModalHeader closeButton>
        <CModalTitle>{ unitData.id ? 'Editar' : 'Agregar'} Producto</CModalTitle>
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
                value={unitData.nombre}
              />
              <CFormText>Nombre</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="nombre_corto">Nombre corto</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CInput
                id="nombre_corto"
                name="nombre_corto"
                placeholder="Nombre corto"
                onChange={e => onChange(e)}
                value={unitData.nombre_corto}
              />
              <CFormText>Nombre corto.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="appendedInputButton">Decimal</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CSwitch
                className="mr-1"
                name="decimal"
                color="success"
                defaultChecked={unitData.decimal}
                onChange={() => setUnitData({...unitData, decimal: !unitData.decimal})}
              />
              <CFormText>Decimal</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="appendedInputButton">Sub unidad</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CSwitch
                className="mr-1"
                name="sub_unidad"
                color="success"
                defaultChecked={unitData.sub_unidad}
                onChange={() => setUnitData({...unitData, sub_unidad: !unitData.sub_unidad})}
              />
              <CFormText>Sub unidad</CFormText>
            </CCol>
          </CFormGroup>

          {unitData.sub_unidad ? (
            <CFormGroup row>
              <CCol md="4">
                <CLabel htmlFor="equivalencia">Equivalencia</CLabel>
                <br/>
                <CLabel htmlFor="equivalencia">1 { unitData.nombre || 'Unidad' }</CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CInput
                  type="number"
                  id="equivalencia"
                  name="equivalencia"
                  placeholder="Equivalencia"
                  onChange={e => onChange(e)}
                  value={unitData.equivalencia}
                />
                <CFormText>Equivalencia.</CFormText>
              </CCol>
              <CCol xs="12" md="4">
                <CSelect
                  custom
                  name="marca"
                  id="marca"
                  onChange={e => onChange(e)}
                >
                  <option value="" disabled defaultValue>Seleccione ...</option>
                  {unitsList.map((elem, i)=> (
                    <option key={i} value={elem.nombre}>{elem.nombre}({elem.nombre_corto})</option>
                  ))}
                </CSelect>
              </CCol>
            </CFormGroup>
          ) : null}

          <CFormGroup row>
            <CCol md="4">
              <CLabel htmlFor="unid_principal">Unidad principal</CLabel>
            </CCol>
            <CCol xs="12" md="8">
              <CInput
                type="number"
                id="unid_principal"
                name="unid_principal"
                placeholder="Unidad principal"
                onChange={e => onChange(e)}
                value={unitData.unid_principal}
              />
              <CFormText>Unidad principal.</CFormText>
            </CCol>
          </CFormGroup>

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Cancelar
            </CButton>
          <CButton type="submit" color="info">
            {unitData.id ? 'Editar' : 'Crear'} Producto
            </CButton>{" "}
        </CModalFooter>
      </CForm>
    </CModal>
  );
};

export default MainModalUnit;