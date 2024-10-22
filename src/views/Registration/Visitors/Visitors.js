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
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
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
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import successSvg from "src/assets/images/avatars/13.svg";
import errorPng from "src/assets/images/avatars/14.png";
import { zoomies } from "ldrs";
zoomies.register();

const Visitors = () => {
  const [activeTab, setActiveTab] = useState("registration");
  const [visitorDataList, setVisitorDataList] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    nationalId: "",
    mobile: "",
    address: "",
    gender: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["firstName", "middleName", "surname"].includes(name)) {
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
    fetch("http://localhost:8080/api/visitors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to register the visitor.");
        return response.json();
      })
      .then((data) => {
        setVisitorDataList((prevList) => [...prevList, data]);
        setFormData({
          firstName: "",
          middleName: "",
          surname: "",
          nationalId: "",
          mobile: "",
          address: "",
          gender: "",
        });
        setModalMessage("Visitor registration was successful!");
        setIsError(false);
        setShowModal(true);
        autoCloseModal(); // Call auto close function on success
      })
      .catch((error) => {
        setModalMessage("There was an error registering the visitor.");
        setIsError(true);
        setShowModal(true);
        autoCloseModal(); // Call auto close function on error
      });
  };

  const fetchVisitors = () => {
    setLoading(true);
    fetch("http://localhost:8080/api/visitors")
      .then((response) => response.json())
      .then((data) => {
        setVisitorDataList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching visitors:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (activeTab === "visitors") {
      fetchVisitors();
    }
  }, [activeTab]);

  const autoCloseModal = () => {
    setTimeout(() => {
      setShowModal(false);
    }, 1500); // Auto close after 1.5 seconds
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVisitors = visitorDataList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(visitorDataList.length / itemsPerPage);

  return (
    <>
      <CRow className="justify-content-md-center">
        <CCol xs={10}>
          <CNav variant="tabs" style={{ marginBottom: "20px" }}>
            <CNavItem>
              <CNavLink
                href="#"
                active={activeTab === "registration"}
                onClick={() => setActiveTab("registration")}
                style={{ fontWeight: "bold" }}
              >
                Visitor Registration
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#"
                active={activeTab === "visitors"}
                onClick={() => setActiveTab("visitors")}
                style={{ fontWeight: "bold" }}
              >
                Registered Visitors
              </CNavLink>
            </CNavItem>
          </CNav>

          {activeTab === "registration" && (
            <CCard
              className="mb-4"
              style={{
                boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)",
                color: "blue",
                padding: "40px",
                marginTop: "20px",
              }}
            >
              <CCardHeader style={{ backgroundColor: "#fff" }}>
                <h3>Visitor Registration</h3>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  {/* Registration Form Fields */}
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
                        htmlFor="surname"
                        style={{ color: "blue", fontWeight: "bold" }}
                      >
                        Surname
                      </CFormLabel>
                      <CFormInput
                        id="surname"
                        name="surname"
                        value={formData.surname}
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
                        placeholder="Enter national ID"
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
                    <CCol md="6">
                      <CFormLabel
                        htmlFor="address"
                        style={{ color: "blue", fontWeight: "bold" }}
                      >
                        Address
                      </CFormLabel>
                      <CFormInput
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md="6">
                      <CFormLabel
                        htmlFor="gender"
                        style={{ color: "blue", fontWeight: "bold" }}
                      >
                        Gender
                      </CFormLabel>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </CCol>
                  </CRow>
                  {/* Submit Button */}
                  <CButton type="submit" color="primary">
                    Submit
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          )}

          {/* Visitors List */}
          {activeTab === "visitors" && (
            <CCard className="mb-4">
              <CCardHeader>Registered Visitors</CCardHeader>
              <CCardBody>
                {loading ? (
                  <p>Loading visitors...</p>
                ) : (
                  <>
                    <CTable striped hover>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>#</CTableHeaderCell>
                          <CTableHeaderCell>First Name</CTableHeaderCell>
                          <CTableHeaderCell>Middle Name</CTableHeaderCell>
                          <CTableHeaderCell>Surname</CTableHeaderCell>
                          <CTableHeaderCell>National ID</CTableHeaderCell>
                          <CTableHeaderCell>Mobile</CTableHeaderCell>
                          <CTableHeaderCell>Address</CTableHeaderCell>
                          <CTableHeaderCell>Gender</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {currentVisitors.map((visitor, index) => (
                          <CTableRow key={visitor.id}>
                            <CTableDataCell>
                              {indexOfFirstItem + index + 1}
                            </CTableDataCell>
                            <CTableDataCell>{visitor.firstName}</CTableDataCell>
                            <CTableDataCell>
                              {visitor.middleName}
                            </CTableDataCell>
                            <CTableDataCell>{visitor.surname}</CTableDataCell>
                            <CTableDataCell>
                              {visitor.nationalId}
                            </CTableDataCell>
                            <CTableDataCell>{visitor.mobile}</CTableDataCell>
                            <CTableDataCell>{visitor.address}</CTableDataCell>
                            <CTableDataCell>{visitor.gender}</CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                    <CPagination align="end">
                      <CPaginationItem
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Previous
                      </CPaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <CPaginationItem
                          key={i}
                          active={i + 1 === currentPage}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </CPaginationItem>
                      ))}
                      <CPaginationItem
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </CPaginationItem>
                    </CPagination>
                  </>
                )}
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>

      {/* Modal */}
      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader closeButton>Registration Status</CModalHeader>
        <CModalBody className="text-center">
          {isError ? (
            <img src={errorPng} alt="Error" style={{ width: "150px" }} />
          ) : (
            <img src={successSvg} alt="Success" style={{ width: "150px" }} />
          )}
          <p>{modalMessage}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Visitors;
