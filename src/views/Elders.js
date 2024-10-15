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
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import successSvg from "src/assets/images/avatars/13.svg";
import errorPng from "src/assets/images/avatars/14.png";

function ElderForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    role: "",
    elderZP: "",
    createdBy: "",
  });

  const [elderDataList, setElderDataList] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal state
  const [showErrorModal, setShowErrorModal] = useState(false); // Error modal state

  // Auto-close modal after 2.5 seconds
  const autoCloseModal = (setShowModal) => {
    setTimeout(() => {
      setShowModal(false);
    }, 2500); // 2.5 seconds
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add createdAt field with current timestamp
      const elderData = { ...formData, createdAt: new Date().toISOString() };

      // Send POST request to backend
      const response = await fetch("http://localhost:8080/api/elders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(elderData), // Send form data as JSON
      });

      if (response.ok) {
        // If successful, add the new elder to the local list and clear form fields
        const newElder = await response.json();
        setElderDataList((prevList) => [...prevList, newElder]);

        // Clear form fields after submission
        setFormData({
          name: "",
          age: "",
          role: "",
          elderZP: "",
          createdBy: "",
        });

        // Show success modal and auto-close after 2.5 seconds
        setShowSuccessModal(true);
        autoCloseModal(setShowSuccessModal);
      } else {
        console.error("Failed to add elder.");
        setShowErrorModal(true);
        autoCloseModal(setShowErrorModal);
      }
    } catch (error) {
      console.error("Error posting elder data:", error);
      setShowErrorModal(true);
      autoCloseModal(setShowErrorModal);
    }
  };

  const handleEdit = (index) => {
    // Logic for handling elder data editing
  };

  const handleDelete = (index) => {
    // Logic for handling elder data deletion
  };

  return (
    <>
      {/* Success Modal */}
      <CModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      >
        <CModalHeader>Success</CModalHeader>
        <CModalBody className="text-center">
          <img src={successSvg} alt="Success" style={{ width: "150px" }} />
          <p>Elder successfully added!</p>
        </CModalBody>
      </CModal>

      {/* Error Modal */}
      <CModal visible={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <CModalHeader>Error</CModalHeader>
        <CModalBody className="text-center">
          <img src={errorPng} alt="Error" style={{ width: "150px" }} />
          <p>Failed to add elder. Please try again.</p>
        </CModalBody>
      </CModal>

      <CCard
        className="mb-4"
        style={{
          boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)",
          color: "blue",
          padding: "40px",
        }}
      >
        <CCardHeader style={{ backgroundColor: "#fff" }}>
          <h3>ELDER FORM</h3>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CCol md="6">
                <CFormLabel
                  htmlFor="name"
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  Full Name
                </CFormLabel>
                <CFormInput
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />
              </CCol>
              <CCol md="6">
                <CFormLabel
                  htmlFor="age"
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  Age
                </CFormLabel>
                <CFormInput
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md="6">
                <CFormLabel
                  htmlFor="role"
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  Role
                </CFormLabel>
                <CFormInput
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Enter role"
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
                  placeholder="Enter Elder ZP"
                  required
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
                  placeholder="Enter your name"
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

      {/* Elder Details Table */}
      {elderDataList.length > 0 && (
        <CCard className="mb-4">
          <CCardHeader>
            <h3>Elder Details</h3>
          </CCardHeader>
          <CCardBody>
            <CTable striped responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Age</CTableHeaderCell>
                  <CTableHeaderCell>Role</CTableHeaderCell>
                  <CTableHeaderCell>Elder ZP</CTableHeaderCell>
                  <CTableHeaderCell>Created By</CTableHeaderCell>
                  <CTableHeaderCell>Created At</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {elderDataList.map((elder, index) => (
                  <CTableRow key={elder.id || index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{elder.name}</CTableDataCell>
                    <CTableDataCell>{elder.age}</CTableDataCell>
                    <CTableDataCell>{elder.role}</CTableDataCell>
                    <CTableDataCell>{elder.elderZP}</CTableDataCell>
                    <CTableDataCell>{elder.createdBy}</CTableDataCell>
                    <CTableDataCell>
                      {elder.createdAt
                        ? new Date(elder.createdAt).toLocaleString()
                        : "-"}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info"
                        className="me-2"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleDelete(index)}
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

export default ElderForm;
