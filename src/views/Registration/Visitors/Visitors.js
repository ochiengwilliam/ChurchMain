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
} from "@coreui/react";
import "ldrs/zoomies"; // Import the zoomies loader

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
  const [loading, setLoading] = useState(false); // Loading state

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
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
      })
      .catch((error) => {
        setModalMessage("There was an error registering the visitor.");
        setIsError(true);
        setShowModal(true);
      });
  };

  // Fetch visitors from the backend
  const fetchVisitors = () => {
    setLoading(true); // Start loading
    fetch("http://localhost:8080/api/visitors")
      .then((response) => response.json())
      .then((data) => {
        setVisitorDataList(data);
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching visitors:", error);
        setLoading(false); // Stop loading on error
      });
  };

  // Effect to fetch visitors when "Visitors" tab is active
  useEffect(() => {
    if (activeTab === "visitors") {
      fetchVisitors();
    }
  }, [activeTab]);

  return (
    <>
      {/* Tabs Navigation */}
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink
            href="#"
            active={activeTab === "registration"}
            onClick={() => setActiveTab("registration")}
          >
            Visitor Registration
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#"
            active={activeTab === "visitors"}
            onClick={() => setActiveTab("visitors")}
          >
            Visitors
          </CNavLink>
        </CNavItem>
      </CNav>

      <CRow className="justify-content-md-center">
        <CCol xs={10}>
          {activeTab === "registration" && (
            <CCard
              className="mb-4"
              style={{
                boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)",
                color: "blue",
                padding: "40px",
              }}
            >
              <CCardHeader style={{ backgroundColor: "#fff" }}>
                <h3>Visitor Registration</h3>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  {/* Form Fields */}
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
                        className="form-select"
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </CCol>
                  </CRow>

                  <CButton type="submit" color="primary">
                    Register Visitor
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          )}

          {activeTab === "visitors" && (
            <CCard className="mb-4">
              <CCardHeader>
                <h3>Visitor Details</h3>
              </CCardHeader>
              <CCardBody>
                {loading ? (
                  <div className="text-center">
                    {/* Replace CSpinner with zoomies loader */}
                    <l-zoomies
                      size="80"
                      stroke="5"
                      bg-opacity="0.1"
                      speed="1.2"
                    ></l-zoomies>
                  </div>
                ) : (
                  <CTable striped hover responsive>
                    <CTableHead>
                      <CTableRow>
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
                      {visitorDataList.map((visitor) => (
                        <CTableRow key={visitor.id}>
                          <CTableDataCell>{visitor.firstName}</CTableDataCell>
                          <CTableDataCell>{visitor.middleName}</CTableDataCell>
                          <CTableDataCell>{visitor.surname}</CTableDataCell>
                          <CTableDataCell>{visitor.nationalId}</CTableDataCell>
                          <CTableDataCell>{visitor.mobile}</CTableDataCell>
                          <CTableDataCell>{visitor.address}</CTableDataCell>
                          <CTableDataCell>{visitor.gender}</CTableDataCell>
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

      {/* Modal */}
      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader onClose={() => setShowModal(false)}>
          {isError ? "Error" : "Success"}
        </CModalHeader>
        <CModalBody>{modalMessage}</CModalBody>
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
