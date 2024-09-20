import React, { useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CRow,
  CCol,
  CFormSelect,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";

function RFID() {
  const [formData, setFormData] = useState({
    serialNumber: "",
    purpose: "",
  });

  const [rfidDataList, setRfidDataList] = useState([]); // State to store submitted RFID data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the current form data to the list of submitted RFID data
    setRfidDataList((prevList) => [...prevList, formData]);

    // Clear the form fields
    setFormData({
      serialNumber: "",
      purpose: "",
    });
  };

  return (
    <>
      {/* RFID Registration Card */}
      <CCard
        className="mb-4"
        style={{
          boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)",
          color: "blue",
          padding: "40px",
        }}
      >
        <CCardHeader style={{ backgroundColor: "#fff" }}>
          <h3>RFID REGISTRATION FORM</h3>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CCol md="6">
                <CFormLabel
                  htmlFor="serialNumber"
                  style={{
                    color: "blue",
                    fontWeight: "bold",
                    fontSize: "21px",
                  }}
                >
                  Serial Number
                </CFormLabel>
                <CFormInput
                  id="serialNumber"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  placeholder="Enter Serial Number"
                  required
                />
              </CCol>
            </CRow>

            {/* Purpose Dropdown */}
            <CRow className="mb-3">
              <CCol md="6">
                <CFormLabel
                  htmlFor="purpose"
                  style={{
                    color: "blue",
                    fontWeight: "bold",
                    fontSize: "21px",
                  }}
                >
                  Purpose
                </CFormLabel>
                <CFormSelect
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Purpose</option>
                  <option
                    value="Employee Monitoring"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Employee Monitoring
                  </option>
                  <option
                    value="Identification"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Identification
                  </option>
                  <option
                    value="Holy Communion"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Holy Communion
                  </option>
                </CFormSelect>
              </CCol>
            </CRow>

            <CButton type="submit" color="primary">
              Submit
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>

      {/* Table to display RFID data */}
      {rfidDataList.length > 0 && (
        <CCard className="mb-4">
          <CCardHeader>
            <h3>Registered RFID Data</h3>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Serial Number</CTableHeaderCell>
                  <CTableHeaderCell>Purpose</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rfidDataList.map((rfid, index) => (
                  <CTableRow
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#D2B48C" : "#FFFFFF", // Brown for even rows, white for odd
                      color: index % 2 === 0 ? "#FFFFFF" : "#000000", // Adjusting text color for contrast
                    }}
                  >
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{rfid.serialNumber}</CTableDataCell>
                    <CTableDataCell>{rfid.purpose}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      )}
    </>
  );
}

export default RFID;
