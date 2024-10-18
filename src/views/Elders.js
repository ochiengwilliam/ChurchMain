import React, { useState, useEffect } from "react";
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
  CNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import successSvg from "src/assets/images/avatars/13.svg";
import errorPng from "src/assets/images/avatars/14.png";
import { dotWave } from "ldrs";
import { zoomies } from "ldrs";

dotWave.register();
zoomies.register();

function ElderForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    role: "",
    elderZP: "",
    createdBy: "",
  });

  const [elderDataList, setElderDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [nameError, setNameError] = useState("");
  const [activeTab, setActiveTab] = useState("registration");

  const autoCloseModal = (setShowModal) => {
    setTimeout(() => {
      setShowModal(false);
    }, 1500);
  };

  useEffect(() => {
    if (activeTab === "details") {
      const fetchElderData = async () => {
        setLoading(true); // Start loading
        try {
          const response = await fetch("http://localhost:8080/api/elders");
          const data = await response.json();

          setElderDataList(data);
        } catch (error) {
          console.error("Error fetching elder data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchElderData();
    }
  }, [activeTab]);
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/; // Only alphabets and spaces
    if (!nameRegex.test(name)) {
      setNameError("Input valid name.");
      return false;
    }
    setNameError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      if (value === "" || validateName(value)) {
        setFormData({ ...formData, [name]: value });
        return;
      } else {
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateName(formData.name)) {
      return;
    }

    try {
      const elderData = { ...formData, createdAt: new Date().toISOString() };

      const response = await fetch("http://localhost:8080/api/elders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(elderData),
      });

      if (response.ok) {
        const newElder = await response.json();
        setElderDataList((prevList) => [...prevList, newElder]);

        setFormData({
          name: "",
          age: "",
          role: "",
          elderZP: "",
          createdBy: "",
        });

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

  return (
    <>
      {/* Nav for tab switching */}
      <CNav variant="tabs" className="my-4">
        <CNavItem>
          <CNavLink
            href="#"
            active={activeTab === "registration"}
            onClick={() => setActiveTab("registration")}
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            Elder Registration
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#"
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            Registered Elders
          </CNavLink>
        </CNavItem>
      </CNav>

      {/* Conditional rendering based on active tab */}
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
                  {nameError && (
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {nameError}
                    </p>
                  )}
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
                    placeholder="Enter Creator"
                    required
                  />
                </CCol>
              </CRow>

              <CButton type="submit" color="primary">
                Submit
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      )}

      {activeTab === "details" && (
        <CCard
          className="mb-4"
          style={{
            boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)",
            color: "blue",
            padding: "40px",
          }}
        >
          <CCardHeader style={{ backgroundColor: "#fff" }}>
            <h3>Registered Elders</h3>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <div className="text-center">
                <l-zoomies
                  size="120"
                  stroke="5"
                  bg-opacity="0.1"
                  speed="1.4"
                  color="blue"
                ></l-zoomies>
              </div>
            ) : elderDataList.length === 0 ? (
              <p>No elders registered yet.</p>
            ) : (
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell style={{ color: "blue" }}>
                      No.
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ color: "blue" }}>
                      Name
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ color: "blue" }}>
                      Age
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ color: "blue" }}>
                      ZP
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {elderDataList.map((elder, index) => (
                    <CTableRow key={elder.id}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{elder.name}</CTableDataCell>
                      <CTableDataCell>{elder.age}</CTableDataCell>

                      <CTableDataCell>{elder.elderZP}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      )}

      {/* Success Modal */}
      <CModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        centered
      >
        <CModalHeader>
          <h5>Success</h5>
        </CModalHeader>
        <CModalBody className="text-center">
          <img src={successSvg} alt="Success" style={{ width: "150px" }} />
          <p className="mt-3" style={{ color: "green" }}>
            Elder data added successfully.
          </p>
        </CModalBody>
      </CModal>

      {/* Error Modal */}
      <CModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        centered
      >
        <CModalHeader>
          <h5>Error</h5>
        </CModalHeader>
        <CModalBody className="text-center">
          <img src={errorPng} alt="Error" style={{ width: "150px" }} />
          <p className="mt-3" style={{ color: "red" }}>
            Failed to add elder data.
          </p>
        </CModalBody>
      </CModal>
    </>
  );
}

export default ElderForm;
