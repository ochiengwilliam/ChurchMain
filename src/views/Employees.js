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

function EmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    nationalId: "",
    mobile: "",
  });

  const [employeeDataList, setEmployeeDataList] = useState([]);

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
      const response = await fetch("http://localhost:8080/api/employees/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (response.ok) {
        // If successful, add the form data to the local list and clear form fields
        const newEmployee = await response.json();
        setEmployeeDataList((prevList) => [...prevList, newEmployee]);

        // Clear form fields after submission
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          nationalId: "",
          mobile: "",
        });
      } else {
        console.error("Failed to add employee.");
      }
    } catch (error) {
      console.error("Error posting employee data:", error);
    }
  };

  const handleAssignCard = (index) => {
    // Logic for handling card assignment
  };

  const handleRemoveCard = (index) => {
    // Logic for handling card removal
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
          <h3>EMPLOYEE FORM</h3>
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
                <CFormLabel
                  htmlFor="lastName"
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  Surname
                </CFormLabel>
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
                <CFormLabel
                  htmlFor="nationalId"
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  National ID
                </CFormLabel>
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
                <CFormLabel
                  htmlFor="mobile"
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  Mobile Number
                </CFormLabel>
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

      {/* Employee Details Table */}
      {employeeDataList.length > 0 && (
        <CCard className="mb-4">
          <CCardHeader>
            <h3>Employee Details</h3>
          </CCardHeader>
          <CCardBody>
            <CTable striped responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>First Name</CTableHeaderCell>
                  <CTableHeaderCell>Middle Name</CTableHeaderCell>
                  <CTableHeaderCell>Surname</CTableHeaderCell>
                  <CTableHeaderCell>National ID</CTableHeaderCell>
                  <CTableHeaderCell>Mobile Number</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {employeeDataList.map((employee, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{employee.firstName}</CTableDataCell>
                    <CTableDataCell>{employee.middleName}</CTableDataCell>
                    <CTableDataCell>{employee.lastName}</CTableDataCell>
                    <CTableDataCell>{employee.nationalId}</CTableDataCell>
                    <CTableDataCell>{employee.mobile}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="success"
                        className="me-2"
                        onClick={() => handleAssignCard(index)}
                      >
                        Assign Card
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleRemoveCard(index)}
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

export default EmployeeForm;
