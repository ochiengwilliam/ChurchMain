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
} from "@coreui/react";
import { zoomies } from "ldrs";

// Register the zoomies loader
zoomies.register();

function DistrictForm() {
  const [activeTab, setActiveTab] = useState("registration"); // State for active tab
  const [formData, setFormData] = useState({
    districtName: "",
    elderZP: "",
    createdBy: "",
  });
  const [districtsDataList, setDistrictsDataList] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

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
        const newDistrict = await response.json();
        setDistrictsDataList((prevList) => [...prevList, newDistrict]);
        setFormData({ districtName: "", elderZP: "", createdBy: "" });
      } else {
        console.error("Failed to add district.");
      }
    } catch (error) {
      console.error("Error posting district data:", error);
    }
  };

  // Fetch districts data when "details" tab is active
  useEffect(() => {
    if (activeTab === "details") {
      const fetchDistrictsData = async () => {
        setLoading(true); // Start loading
        try {
          const response = await fetch("http://localhost:8080/api/districts");
          if (response.ok) {
            const data = await response.json();
            setDistrictsDataList(data);
          } else {
            console.error("Failed to fetch districts data.");
          }
        } catch (error) {
          console.error("Error fetching districts data:", error);
        } finally {
          setLoading(false); // Stop loading
        }
      };

      fetchDistrictsData();
    }
  }, [activeTab]);

  return (
    <>
      {/* Tabs Navigation */}
      <CNav variant="tabs" className="my-4">
        <CNavItem>
          <CNavLink
            href="#"
            active={activeTab === "registration"}
            onClick={() => setActiveTab("registration")}
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            District Registration
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#"
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            Registered Districts
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
      )}

      {activeTab === "details" && (
        <CCard className="mb-4">
          <CCardHeader>
            <h5 style={{ color: "blue", fontWeight: "bold" }}>
              Registered Districts
            </h5>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <div style={{ textAlign: "center" }}>
                <l-zoomies
                  size="80"
                  stroke="5"
                  bg-opacity="0.1"
                  speed="1.4"
                  color="blue"
                ></l-zoomies>
              </div>
            ) : (
              <CTable striped responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell style={{ color: "blue" }}>
                      No.
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ color: "blue" }}>
                      District Name
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ color: "blue" }}>
                      Elder ZP
                    </CTableHeaderCell>
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
            )}
          </CCardBody>
        </CCard>
      )}
    </>
  );
}

export default DistrictForm;
