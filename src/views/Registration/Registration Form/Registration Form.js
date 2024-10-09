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
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormSelect,
} from "@coreui/react";
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useState } from "react";

const RegistrationForm = () => {
  const [registrationDataList, setRegistrationDataList] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    dob: "",
    district: "",
    zpNo: "",
    maritalStatus: "",
    spouseName: "",
    spouseZpNo: "",
    nationalId: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({
    nationalId: "",
    mobile: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for National ID
    if (name === "nationalId") {
      const isValid = /^\d{0,8}$/.test(value);
      const startsWithZero = value.startsWith("0");
      if (value.length > 8 || (value.length === 8 && startsWithZero)) {
        setErrors((prev) => ({
          ...prev,
          nationalId: "National ID must be 8 digits and cannot start with 0.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, nationalId: "" }));
      }
    }

    // Validation for Mobile Number
    if (name === "mobile") {
      const isValid = /^\d{0,9}$/.test(value);
      if (value.length > 9) {
        setErrors((prev) => ({
          ...prev,
          mobile: "Mobile number must be exactly 9 digits.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, mobile: "" }));
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:8080/api/registration";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data to API");
      }

      const result = await response.json();
      console.log("Data successfully posted:", result);

      setRegistrationDataList((prevList) => [...prevList, formData]);

      // Reset form data after successful submission
      setFormData({
        firstName: "",
        middleName: "",
        surname: "",
        dob: "",
        district: "",
        zpNo: "",
        maritalStatus: "",
        spouseName: "",
        spouseZpNo: "",
        nationalId: "",
        mobile: "",
      });

      setModalMessage("Registration was successful!"); // Success message
      setIsError(false); // Set modal style to success
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting data:", error);

      setModalMessage("There was an error registering. Please try again."); // Error message
      setIsError(true); // Set modal style to error
      setShowModal(true);
    }
  };

  const handleLinkCard = (index) => {
    console.log("Link Card action for:", registrationDataList[index]);
  };

  const handleDelinkCard = (index) => {
    console.log("Delink Card action for:", registrationDataList[index]);
  };

  return (
    <>
      <CRow className="justify-content-md-center">
        <CCol xs={10}>
          {/* Registration Card */}
          <CCard
            className="mb-4"
            style={{
              boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)",
              color: "blue",
              padding: "40px",
            }}
          >
            <CCardHeader style={{ backgroundColor: "#fff" }}>
              <h3>Registration Form</h3>
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
                      htmlFor="dob"
                      style={{ color: "blue", fontWeight: "bold" }}
                    >
                      Date of Birth
                    </CFormLabel>
                    <CFormInput
                      id="dob"
                      name="dob"
                      type="date" // Set input type to date
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol md="6">
                    <CFormLabel
                      htmlFor="district"
                      style={{ color: "blue", fontWeight: "bold" }}
                    >
                      District
                    </CFormLabel>
                    <CFormInput
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="Enter district"
                      required
                    />
                  </CCol>
                  <CCol md="6">
                    <CFormLabel
                      htmlFor="zpNo"
                      style={{ color: "blue", fontWeight: "bold" }}
                    >
                      ZP Number
                    </CFormLabel>
                    <CFormInput
                      id="zpNo"
                      name="zpNo"
                      value={formData.zpNo}
                      onChange={handleChange}
                      placeholder="Enter ZP number"
                      required
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol md="6">
                    <CFormLabel
                      htmlFor="maritalStatus"
                      style={{ color: "blue", fontWeight: "bold" }}
                    >
                      Marital Status
                    </CFormLabel>
                    <CFormSelect
                      id="maritalStatus"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Single">Single</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md="6">
                    <CFormLabel
                      htmlFor="spouseName"
                      style={{ color: "blue", fontWeight: "bold" }}
                    >
                      Spouse Name
                    </CFormLabel>
                    <CFormInput
                      id="spouseName"
                      name="spouseName"
                      value={formData.spouseName}
                      onChange={handleChange}
                      placeholder="Enter spouse name"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol md="6">
                    <CFormLabel
                      htmlFor="spouseZpNo"
                      style={{ color: "blue", fontWeight: "bold" }}
                    >
                      Spouse ZP Number
                    </CFormLabel>
                    <CFormInput
                      id="spouseZpNo"
                      name="spouseZpNo"
                      value={formData.spouseZpNo}
                      onChange={handleChange}
                      placeholder="Enter spouse ZP number"
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
                      placeholder="Enter National ID"
                      required
                      maxLength={8}
                    />
                    {errors.nationalId && (
                      <div style={{ color: "red" }}>{errors.nationalId}</div>
                    )}
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
                      placeholder="Enter Mobile Number"
                      required
                      maxLength={10}
                    />
                    {errors.mobile && (
                      <div style={{ color: "red" }}>{errors.mobile}</div>
                    )}
                  </CCol>
                </CRow>

                <CButton color="primary" type="submit">
                  Submit
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>

          {/* Registration Data Table */}
          <CTable striped hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>First Name</CTableHeaderCell>
                <CTableHeaderCell>Middle Name</CTableHeaderCell>
                <CTableHeaderCell>Surname</CTableHeaderCell>
                <CTableHeaderCell>Date of Birth</CTableHeaderCell>
                <CTableHeaderCell>District</CTableHeaderCell>
                <CTableHeaderCell>ZP Number</CTableHeaderCell>
                <CTableHeaderCell>Marital Status</CTableHeaderCell>
                <CTableHeaderCell>Spouse Name</CTableHeaderCell>
                <CTableHeaderCell>Spouse ZP Number</CTableHeaderCell>
                <CTableHeaderCell>National ID</CTableHeaderCell>
                <CTableHeaderCell>Mobile</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {registrationDataList.map((data, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{data.firstName}</CTableDataCell>
                  <CTableDataCell>{data.middleName}</CTableDataCell>
                  <CTableDataCell>{data.surname}</CTableDataCell>
                  <CTableDataCell>{data.dob}</CTableDataCell>
                  <CTableDataCell>{data.district}</CTableDataCell>
                  <CTableDataCell>{data.zpNo}</CTableDataCell>
                  <CTableDataCell>{data.maritalStatus}</CTableDataCell>
                  <CTableDataCell>{data.spouseName}</CTableDataCell>
                  <CTableDataCell>{data.spouseZpNo}</CTableDataCell>
                  <CTableDataCell>{data.nationalId}</CTableDataCell>
                  <CTableDataCell>{data.mobile}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="link" onClick={() => handleLinkCard(index)}>
                      Link
                    </CButton>
                    <CButton
                      color="link"
                      onClick={() => handleDelinkCard(index)}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>

      {/* Modal for Feedback */}
      <CModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        color={isError ? "danger" : "success"}
      >
        <CModalHeader closeButton>
          <h5>{isError ? "Error" : "Success"}</h5>
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

export default RegistrationForm;
