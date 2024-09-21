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
  // State to store individual form data
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    nationalId: "",
    mobile: "",
  });

  // State to store the list of employees
  const [employeeDataList, setEmployeeDataList] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the current form data to the employee list
    setEmployeeDataList((prevList) => [...prevList, formData]);

    // Clear the form fields
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      nationalId: "",
      mobile: "",
    });
  };

  // Handle assigning a card to an employee
  const handleAssignCard = (index) => {
    // alert(`Assigning card to employee at position ${index + 1}...`);
    // Add your card assigning logic here
  };

  // Handle removing a card from an employee
  const handleRemoveCard = (index) => {
    //alert(`Removing card from employee at position ${index + 1}...`);
    // Add your card removing logic here
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
