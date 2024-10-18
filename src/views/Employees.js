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
import "ldrs/zoomies";
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
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const blueColor = "#007bff";

  const autoCloseModal = (setShowModal) => {
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["firstName", "middleName", "lastName"].includes(name)) {
      if (/^[A-Za-z]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
      return;
    }

    if (name === "nationalId") {
      if (/^\d*$/.test(value) && value.length <= 8) {
        setFormData((prev) => ({ ...prev, nationalId: value }));
      }
      return;
    }

    if (name === "mobile") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData((prev) => ({ ...prev, mobile: value }));
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          nationalId: "",
          mobile: "",
        });
        setShowSuccessModal(true);
        autoCloseModal(setShowSuccessModal);
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        setShowErrorModal(true);
        autoCloseModal(setShowErrorModal);
      });
  };

  const fetchEmployees = () => {
    setLoading(true);
    fetch("http://localhost:8080/api/employees/all")
      .then((response) => response.json())
      .then((data) => {
        setEmployeeDataList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (activeTab === "employees") {
      fetchEmployees();
    }
  }, [activeTab]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employeeDataList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(employeeDataList.length / itemsPerPage);

  return (
    <>
      {/* Success Modal */}
      <CModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      >
        <CModalHeader style={{ color: blueColor }}>Success</CModalHeader>
        <CModalBody className="text-center" style={{ color: blueColor }}>
          <img src={successSvg} alt="Success" style={{ width: "150px" }} />
          <p>Employee successfully added!</p>
        </CModalBody>
      </CModal>

      {/* Error Modal */}
      <CModal visible={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <CModalHeader style={{ color: blueColor }}>Error</CModalHeader>
        <CModalBody className="text-center" style={{ color: blueColor }}>
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
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: blueColor,
                  }}
                >
                  Employee Registration
                </h3>
              </CCardHeader>
              <CCardBody style={{ color: blueColor }}>
                <CForm onSubmit={handleSubmit}>
                  {/* Form Fields */}
                  <CRow className="mb-3">
                    <CCol md="6">
                      <CFormLabel
                        htmlFor="firstName"
                        style={{ fontWeight: "bold", color: blueColor }}
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
                        style={{ fontWeight: "bold", color: blueColor }}
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
                        style={{ fontWeight: "bold", color: blueColor }}
                      >
                        Surname
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
                        style={{ fontWeight: "bold", color: blueColor }}
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
                        style={{ fontWeight: "bold", color: blueColor }}
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
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: blueColor,
                  }}
                >
                  Employee Details
                </h3>
              </CCardHeader>
              <CCardBody>
                {loading ? (
                  <div className="text-center">
                    <l-zoomies
                      size="120"
                      stroke="5"
                      bg-opacity="0.1"
                      speed="1.2"
                      color="blue"
                    ></l-zoomies>
                  </div>
                ) : (
                  <>
                    <CTable striped hover responsive>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell style={{ color: blueColor }}>
                            No.
                          </CTableHeaderCell>
                          <CTableHeaderCell style={{ color: blueColor }}>
                            First Name
                          </CTableHeaderCell>
                          <CTableHeaderCell style={{ color: blueColor }}>
                            Middle Name
                          </CTableHeaderCell>
                          <CTableHeaderCell style={{ color: blueColor }}>
                            Surname
                          </CTableHeaderCell>
                          <CTableHeaderCell style={{ color: blueColor }}>
                            National ID
                          </CTableHeaderCell>
                          <CTableHeaderCell style={{ color: blueColor }}>
                            Mobile Number
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {currentEmployees.map((employee, index) => (
                          <CTableRow key={employee.id}>
                            <CTableDataCell style={{ color: "black" }}>
                              {indexOfFirstItem + index + 1}
                            </CTableDataCell>
                            <CTableDataCell style={{ color: "black" }}>
                              {employee.firstName}
                            </CTableDataCell>
                            <CTableDataCell style={{ color: "black" }}>
                              {employee.middleName}
                            </CTableDataCell>
                            <CTableDataCell style={{ color: "black" }}>
                              {employee.lastName}
                            </CTableDataCell>
                            <CTableDataCell style={{ color: "black" }}>
                              {employee.nationalId}
                            </CTableDataCell>
                            <CTableDataCell style={{ color: "black" }}>
                              {employee.mobile}
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>

                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <CButton
                        color="dark"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </CButton>
                      <span>
                        Page {currentPage} of {totalPages}
                      </span>
                      <CButton
                        color="dark"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </CButton>
                    </div>
                  </>
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
