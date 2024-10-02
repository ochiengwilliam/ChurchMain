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
} from "@coreui/react";
import { cilTrash } from "@coreui/icons"; // Importing the trash icon
import CIcon from "@coreui/icons-react"; // Importing CIcon to use the icon component
import { useState } from "react";

const Form = () => {
  const [visitorDataList, setVisitorDataList] = useState([]); // State to store the list of visitors
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    nationalId: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the current formData to the list of visitors
    setVisitorDataList((prevList) => [...prevList, formData]);

    // Clear the form fields
    setFormData({
      firstName: "",
      middleName: "",
      surname: "",
      nationalId: "",
      mobile: "",
    });
  };

  const handleLinkCard = (index) => {
    // alert(`Linking card to visitor at position ${index + 1}...`);
    // Add your card linking logic here
  };

  const handleDelinkCard = (index) => {
    // alert(`Delinking card from visitor at position ${index + 1}...`);
    // Add your card delinking logic here
  };

  return (
    <>
      <CRow className="justify-content-md-center">
        <CCol xs={10}>
          {/* Visitor Registration Card */}
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
                </CRow>

                <CButton type="submit" color="primary">
                  Register Visitor
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>

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
                            <CIcon icon={cilTrash} />{" "}
                            {/* Using the trash icon here */}
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

export default Form;
