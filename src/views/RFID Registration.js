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
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
} from "@coreui/react";

function RFID() {
  const [formData, setFormData] = useState({
    serialNumber: "", // Only keep the serial number
    purpose: "", // Add purpose field
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
    console.log("Form Data Submitted:", formData);
    // Add form submission logic here
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
                  style={{ color: "blue", fontWeight: "bold" }}
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

            <CButton type="submit" color="primary">
              Submit
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>

      {/* Purpose Card with Tabs */}
      <CCard
        className="mb-4"
        style={{
          boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)",
          color: "blue",
          padding: "40px",
        }}
      >
        <CCardHeader style={{ backgroundColor: "#fff" }}>
          <h3>PURPOSE</h3>
        </CCardHeader>
        <CCardBody>
          <CTabs activeItemKey={2}>
            <CTabList variant="underline">
              <CTab
                aria-controls="home-tab-pane"
                style={{ fontSize: "21px" }}
                itemKey={1}
              >
                Employee Monitoring
              </CTab>
              <CTab
                aria-controls="profile-tab-pane"
                style={{ fontSize: "21px" }}
                itemKey={2}
              >
                Identification
              </CTab>
              <CTab
                aria-controls="contact-tab-pane"
                style={{ fontSize: "21px" }}
                itemKey={3}
              >
                Holy Communion
              </CTab>
            </CTabList>
            <CTabContent>
              <CTabPanel
                className="py-3"
                aria-labelledby="home-tab-pane"
                itemKey={1}
              >
                Employee Monitoring
              </CTabPanel>
              <CTabPanel
                className="py-3"
                aria-labelledby="profile-tab-pane"
                itemKey={2}
              >
                Identification
              </CTabPanel>
              <CTabPanel
                className="py-3"
                aria-labelledby="contact-tab-pane"
                itemKey={3}
              >
                Holy Communion
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </>
  );
}

export default RFID;
