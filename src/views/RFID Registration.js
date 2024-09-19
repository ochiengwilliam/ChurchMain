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
} from "@coreui/react";

function rfid() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    nationalId: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee Data Submitted:", formData);
    // Add form submission logic here
  };

  return (
    <>
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
                  htmlFor="firstName"
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  First Name
                </CFormLabel>
                <CFormInput
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  required
                />
              </CCol>
              <CCol md="6">
                <CFormLabel
                  htmlFor="middleName"
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  Middle Name
                </CFormLabel>
                <CFormInput
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  placeholder="Enter middle name"
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md="6">
                <CFormLabel htmlFor="lastName">Surname</CFormLabel>
                <CFormInput
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter surname"
                  required
                />
              </CCol>
              <CCol md="6">
                <CFormLabel htmlFor="nationalId">Serial Number</CFormLabel>
                <CFormInput
                  id="nationalId"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  placeholder="Enter National ID"
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md="6">
                <CFormLabel htmlFor="mobile">Member Type</CFormLabel>
                <CFormInput
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  required
                />
              </CCol>
            </CRow>

            <CButton type="submit" color="primary">
              Submit
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
}

export default rfid;
