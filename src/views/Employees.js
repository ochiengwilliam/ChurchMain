import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CNav,
  CNavItem,
  CNavLink,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import "ldrs/zoomies"; // Import the zoomies loader
import successSvg from "src/assets/images/avatars/13.svg";
import errorPng from "src/assets/images/avatars/14.png";

const Employee = () => {
  const [activeTab, setActiveTab] = useState("registration");
  const [employeeDataList, setEmployeeDataList] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    nationalId: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false); // Loading state for employees
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal state
  const [showErrorModal, setShowErrorModal] = useState(false); // Error modal state

  // Close modal automatically after 2.5 seconds
  const autoCloseModal = (setShowModal) => {
    setTimeout(() => {
      setShowModal(false);
    }, 2500); // 2.5 seconds
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission to add a new employee
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/employees/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployeeDataList((prevList) => [...prevList, data]);
        // Reset the form after submission
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          nationalId: "",
          mobile: "",
        });
        setShowSuccessModal(true); // Show success modal
        autoCloseModal(setShowSuccessModal); // Auto-close after 2.5 seconds
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        setShowErrorModal(true); // Show error modal
        autoCloseModal(setShowErrorModal); // Auto-close after 2.5 seconds
      });
  };

  // Fetch all employees from the backend
  const fetchEmployees = () => {
    setLoading(true); // Start loading
    fetch("http://localhost:8080/api/employees/all")
      .then((response) => response.json())
      .then((data) => {
        setEmployeeDataList(data);
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setLoading(false); // Stop loading on error
      });
  };

  // Effect to fetch employees when "Employees" tab is active
  useEffect(() => {
    if (activeTab === "employees") {
      fetchEmployees();
    }
  }, [activeTab]);

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
          <p>Employee successfully added!</p>
        </CModalBody>
      </CModal>

      {/* Error Modal */}
      <CModal visible={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <CModalHeader>Error</CModalHeader>
        <CModalBody className="text-center">
          <img src={errorPng} alt="Error" style={{ width: "150px" }} />
          <p>Failed to add employee. Please try again.</p>
        </CModalBody>
      </CModal>

      {/* Tabs Navigation */}
      <CNav variant="tabs" className="my-4">
        <CNavItem>
          <CNavLink
            href="#"
            active={activeTab === "registration"}
            onClick={() => setActiveTab("registration")}
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            Employee Registration
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#"
            active={activeTab === "employees"}
            onClick={() => setActiveTab("employees")}
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            Employees Details
          </CNavLink>
        </CNavItem>
      </CNav>

      <CRow className="justify-content-md-center">
        <CCol xs={12} md={10}>
          {activeTab === "registration" && (
            <CCard
              className="mb-4"
              style={{
                boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)",
                padding: "40px",
              }}
            >
              <CCardHeader style={{ backgroundColor: "#fff" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  Employee Registration
                </h3>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  {/* Form Fields */}
                  <CRow className="mb-3">
                    <CCol md="6">
                      <CFormLabel
                        htmlFor="firstName"
                        style={{ fontWeight: "bold" }}
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
                        style={{ fontWeight: "bold" }}
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
                        style={{ fontWeight: "bold" }}
                      >
                        Last Name
                      </CFormLabel>
                      <CFormInput
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        required
                      />
                    </CCol>
                    <CCol md="6">
                      <CFormLabel
                        htmlFor="nationalId"
                        style={{ fontWeight: "bold" }}
                      >
                        National ID
                      </CFormLabel>
                      <CFormInput
                        id="nationalId"
                        name="nationalId"
                        value={formData.nationalId}
                        onChange={handleChange}
                        placeholder="Enter national ID"
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md="6">
                      <CFormLabel
                        htmlFor="mobile"
                        style={{ fontWeight: "bold" }}
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
                  <CButton type="submit" color="primary">
                    Register Employee
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          )}

          {activeTab === "employees" && (
            <CCard className="mb-4">
              <CCardHeader>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  Employee Details
                </h3>
              </CCardHeader>
              <CCardBody>
                {loading ? (
                  <div className="text-center">
                    {/* Zoomies loader */}
                    <l-zoomies
                      size="80"
                      stroke="5"
                      bg-opacity="0.1"
                      speed="1.2"
                      color="darkgreen"
                    ></l-zoomies>
                  </div>
                ) : (
                  <CTable striped hover responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>#</CTableHeaderCell>
                        <CTableHeaderCell>First Name</CTableHeaderCell>
                        <CTableHeaderCell>Middle Name</CTableHeaderCell>
                        <CTableHeaderCell>Last Name</CTableHeaderCell>
                        <CTableHeaderCell>National ID</CTableHeaderCell>
                        <CTableHeaderCell>Mobile Number</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {employeeDataList.map((employee, index) => (
                        <CTableRow key={employee.id}>
                          <CTableDataCell>{index + 1}</CTableDataCell>
                          <CTableDataCell>{employee.firstName}</CTableDataCell>
                          <CTableDataCell>{employee.middleName}</CTableDataCell>
                          <CTableDataCell>{employee.lastName}</CTableDataCell>
                          <CTableDataCell>{employee.nationalId}</CTableDataCell>
                          <CTableDataCell>{employee.mobile}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                )}
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>
    </>
  );
};

export default Employee;
