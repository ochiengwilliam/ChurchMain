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
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from "@coreui/react";
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

function DistrictForm() {
  const [formData, setFormData] = useState({
    districtName: "",
    elderZP: "",
    createdBy: "",
    createdAt: "",
    updatedBy: "",
    updatedAt: "",
  });

  const [districtsDataList, setDistrictsDataList] = useState([]);
  const [activeKey, setActiveKey] = useState(1);

  // Fetch district data from the backend
  const fetchDistricts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/districts");
      if (response.ok) {
        const data = await response.json();
        // Keep all fields intact in the data
        setDistrictsDataList(data);
      } else {
        console.error("Failed to fetch districts.");
      }
    } catch (error) {
      console.error("Error fetching district data:", error);
    }
  };

  useEffect(() => {
    fetchDistricts(); // Fetch districts on component mount
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/districts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If successful, refetch the districts
        fetchDistricts();
        // Clear form fields after submission
        setFormData({
          districtName: "",
          elderZP: "",
          createdBy: "",
          createdAt: "",
          updatedBy: "",
          updatedAt: "",
        });
      } else {
        console.error("Failed to add district.");
      }
    } catch (error) {
      console.error("Error posting district data:", error);
    }
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
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
              District Form
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
              District Details
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent activeTab={activeKey}>
          {/* Tab for District Form */}
          <CTabPane visible={activeKey === 1}>
            <CCardHeader style={{ backgroundColor: "#fff" }}>
              <h3>DISTRICT FORM</h3>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow className="mb-3">
                  <CCol md="6">
                    <CFormLabel
                      htmlFor="districtName"
                      style={{ color: "blue", fontWeight: "bold" }}
                    >
                      District Name
                    </CFormLabel>
                    <CFormInput
                      id="districtName"
                      name="districtName"
                      value={formData.districtName}
                      onChange={handleChange}
                      placeholder="Enter district name"
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
                      placeholder="Enter elder ZP"
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
                      placeholder="Enter creator's name"
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3"></CRow>
                <CButton
                  type="submit"
                  color="primary"
                  style={{ fontWeight: "bold" }}
                >
                  Submit
                </CButton>
              </CForm>
            </CCardBody>
          </CTabPane>

          {/* Tab for District Details */}
          <CTabPane visible={activeKey === 2}>
            <CCardHeader>
              <h3>District Details</h3>
            </CCardHeader>
            <CCardBody>
              {districtsDataList.length > 0 ? (
                <CTable striped responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>#</CTableHeaderCell>
                      <CTableHeaderCell>District Name</CTableHeaderCell>
                      <CTableHeaderCell>Elder ZP</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {districtsDataList.map((district, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{index + 1}</CTableDataCell>
                        <CTableDataCell>{district.districtName}</CTableDataCell>
                        <CTableDataCell>{district.elderZP}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              ) : (
                <p>No district data available.</p>
              )}
            </CCardBody>
          </CTabPane>
        </CTabContent>
      </CCard>
    </>
  );
}

export default DistrictForm;
