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
import { zoomies } from "ldrs"; // Import the zoomies loader
zoomies.register(); // Register the zoomies loader

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
      })
      .catch((error) => {
        setModalMessage("There was an error registering the visitor.");
        setIsError(true);
        setShowModal(true);
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
                Available Visitors
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
                    Submit
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          )}

          {activeTab === "visitors" && (
            <CCard
              className="mb-4"
              style={{
                boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)",
                padding: "20px",
                marginTop: "20px",
              }}
            >
              <CCardHeader style={{ backgroundColor: "#fff" }}>
                <h3>Visitors</h3>
              </CCardHeader>
              <CCardBody>
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "200px",
                    }}
                  >
                    <l-zoomies
                      size="80"
                      stroke="5"
                      bg-opacity="0.1"
                      speed="1.4"
                      color="blue"
                    ></l-zoomies>
                  </div>
                ) : (
                  <CTable responsive striped bordered>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell style={{ color: "blue" }}>
                          No.
                        </CTableHeaderCell>
                        <CTableHeaderCell style={{ color: "blue" }}>
                          First Name
                        </CTableHeaderCell>

                        <CTableHeaderCell style={{ color: "blue" }}>
                          Surname
                        </CTableHeaderCell>
                        <CTableHeaderCell style={{ color: "blue" }}>
                          National ID
                        </CTableHeaderCell>
                        <CTableHeaderCell style={{ color: "blue" }}>
                          Mobile Number
                        </CTableHeaderCell>
                        <CTableHeaderCell style={{ color: "blue" }}>
                          Address
                        </CTableHeaderCell>
                        <CTableHeaderCell style={{ color: "blue" }}>
                          Gender
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {visitorDataList.map((visitor, index) => (
                        <CTableRow key={visitor.nationalId}>
                          <CTableDataCell>{index + 1}</CTableDataCell>
                          <CTableDataCell>{visitor.firstName}</CTableDataCell>

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

      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>{isError ? "Error" : "Success"}</CModalHeader>
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
