import React, { useState } from "react";
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
} from "@coreui/react";
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const Visitors = () => {
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
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const [modalMessage, setModalMessage] = useState(""); // State for storing the modal message
  const [isError, setIsError] = useState(false); // State to handle success/error style

  const handleChange = (e) => {
    const { name, value } = e.target;
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
        if (!response.ok) {
          throw new Error("Failed to register the visitor. Please try again.");
        }
        return response.json();
      })
      .then((data) => {
        setVisitorDataList((prevList) => [...prevList, data]);

        // Reset form fields
        setFormData({
          firstName: "",
          middleName: "",
          surname: "",
          nationalId: "",
          mobile: "",
          address: "",
          gender: "",
        });

        // Show the success message in modal
        setModalMessage("Visitor registration was successful!");
        setIsError(false); // Set modal style to success
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error:", error);

        // Show the error message in modal
        setModalMessage(
          "There was an error registering the visitor. Please try again."
        );
        setIsError(true); // Set modal style to error
        setShowModal(true);
      });
  };

  return (
    <>
      <CRow className="justify-content-md-center">
        <CCol xs={10}>
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
                {/* Form Inputs */}
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
                    <CFormInput
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      placeholder="Enter gender"
                    />
                  </CCol>
                </CRow>

                <CButton type="submit" color="primary">
                  Register Visitor
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>

          {/* Success/Error Modal */}
          <CModal visible={showModal} onClose={() => setShowModal(false)}>
            <CModalHeader onClose={() => setShowModal(false)}>
              {isError ? "Registration Error" : "Registration Successful"}
            </CModalHeader>
            <CModalBody
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {/* Conditionally use the error or success image */}
              <img
                src={
                  isError
                    ? "src/assets/images/avatars/12.jpg"
                    : "src/assets/images/avatars/10.jpg"
                }
                alt={isError ? "Error Icon" : "Success Icon"}
                style={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "10px",
                }}
              />
              <p style={{ margin: "0" }}>{modalMessage}</p>
            </CModalBody>
            <CModalFooter style={{ display: "flex", justifyContent: "center" }}>
              <CButton
                color={isError ? "danger" : "success"}
                onClick={() => setShowModal(false)}
              >
                Close
              </CButton>
            </CModalFooter>
          </CModal>

          {/* Visitor Details Table */}
          {visitorDataList.length > 0 && (
            <CCard className="mb-4">
              <CCardHeader>
                <h3>Visitor Details</h3>
              </CCardHeader>
              <CCardBody>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>#</CTableHeaderCell>
                      <CTableHeaderCell>First Name</CTableHeaderCell>
                      <CTableHeaderCell>Middle Name</CTableHeaderCell>
                      <CTableHeaderCell>Surname</CTableHeaderCell>
                      <CTableHeaderCell>National ID</CTableHeaderCell>
                      <CTableHeaderCell>Mobile Number</CTableHeaderCell>
                      <CTableHeaderCell>Address</CTableHeaderCell>
                      <CTableHeaderCell>Gender</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {visitorDataList.map((visitor, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{index + 1}</CTableDataCell>
                        <CTableDataCell>{visitor.firstName}</CTableDataCell>
                        <CTableDataCell>{visitor.middleName}</CTableDataCell>
                        <CTableDataCell>{visitor.surname}</CTableDataCell>
                        <CTableDataCell>{visitor.nationalId}</CTableDataCell>
                        <CTableDataCell>{visitor.mobile}</CTableDataCell>
                        <CTableDataCell>{visitor.address}</CTableDataCell>
                        <CTableDataCell>{visitor.gender}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="success"
                            className="me-2"
                            onClick={() => handleLinkCard(index)}
                          >
                            Link Card
                          </CButton>
                          <CButton
                            color="danger"
                            onClick={() => handleDelinkCard(index)}
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
        </CCol>
      </CRow>
    </>
  );
};

export default Visitors;
