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
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CTableBody,
} from "@coreui/react";
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

function DistrictForm() {
  const [formData, setFormData] = useState({
    districtName: "",
    elderZP: "",
    createdBy: "",
  });

  const [districtsDataList, setDistrictsDataList] = useState([]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend
      const response = await fetch("http://localhost:8080/api/districts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (response.ok) {
        // If successful, add the form data to the local list and clear form fields
        const newDistrict = await response.json();
        setDistrictsDataList((prevList) => [...prevList, newDistrict]);

        // Clear form fields after submission
        setFormData({
          districtName: "",
          elderZP: "",
          createdBy: "",
        });
      } else {
        console.error("Failed to add district.");
      }
    } catch (error) {
      console.error("Error posting district data:", error);
    }
  };

  const handleRemoveDistrict = (index) => {
    // Logic for handling district removal
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
          <h3>DISTRICT FORM</h3>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CCol md="6">
                <CFormLabel
                  htmlFor="districtName"
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  District Name
                </CFormLabel>
                <CFormInput
                  id="districtName"
                  name="districtName"
                  value={formData.districtName}
                  onChange={handleChange}
                  placeholder="Enter district name"
                  required
                />
              </CCol>
              <CCol md="6">
                <CFormLabel
                  htmlFor="elderZP"
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  Elder ZP
                </CFormLabel>
                <CFormInput
                  id="elderZP"
                  name="elderZP"
                  value={formData.elderZP}
                  onChange={handleChange}
                  placeholder="Enter elder ZP"
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md="6">
                <CFormLabel
                  htmlFor="createdBy"
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  Created By
                </CFormLabel>
                <CFormInput
                  id="createdBy"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
                  placeholder="Enter creator's name"
                  required
                />
              </CCol>
            </CRow>

            <CButton
              type="submit"
              color="primary"
              style={{ fontWeight: "bold" }}
            >
              Submit
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>

      {/* District Details Table */}
      {districtsDataList.length > 0 && (
        <CCard className="mb-4">
          <CCardHeader>
            <h3>District Details</h3>
          </CCardHeader>
          <CCardBody>
            <CTable striped responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>District Name</CTableHeaderCell>
                  <CTableHeaderCell>Elder ZP</CTableHeaderCell>
                  <CTableHeaderCell>Created By</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {districtsDataList.map((district, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{district.districtName}</CTableDataCell>
                    <CTableDataCell>{district.elderZP}</CTableDataCell>
                    <CTableDataCell>{district.createdBy}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="danger"
                        onClick={() => handleRemoveDistrict(index)}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
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

export default DistrictForm;
