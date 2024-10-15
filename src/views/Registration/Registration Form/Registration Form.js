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
  CFormSelect,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import { useEffect, useState } from "react";

const RegistrationForm = () => {
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
  const [districts, setDistricts] = useState([]);
  const [errors, setErrors] = useState({
    nationalId: "",
    mobile: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSpouseZpNoDisabled, setIsSpouseZpNoDisabled] = useState(true);

  useEffect(() => {
    // Fetch districts from the API
    const fetchDistricts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/districts");
        const data = await response.json();
        setDistricts(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for National ID (must be numeric and exactly 8 digits)
    if (name === "nationalId") {
      if (/^\d*$/.test(value) && value.length <= 8) {
        setFormData((prev) => ({ ...prev, nationalId: value }));
        setErrors((prev) => ({ ...prev, nationalId: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          nationalId: "National ID must be numeric and no more than 8 digits.",
        }));
      }
    }

    // Validation for Mobile Number (must be numeric and exactly 10 digits)
    if (name === "mobile") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData((prev) => ({ ...prev, mobile: value }));
        setErrors((prev) => ({ ...prev, mobile: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          mobile: "Mobile number must be numeric and no more than 10 digits.",
        }));
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMaritalStatusChange = (e) => {
    const maritalStatus = e.target.value;
    setFormData({ ...formData, maritalStatus });
    setIsSpouseZpNoDisabled(maritalStatus !== "Married");
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
              <h3>Registration Form</h3>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                {/* Personal Information */}
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
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>

                {/* District and ZP Number */}
                <CRow className="mb-3">
                  <CCol md="6">
                    <CFormLabel
                      htmlFor="district"
                      style={{ color: "blue", fontWeight: "bold" }}
                    >
                      District
                    </CFormLabel>
                    <CFormSelect
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a district</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.districtName}>
                          {district.districtName}
                        </option>
                      ))}
                    </CFormSelect>
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

                {/* Marital Status and Spouse ZP Number */}
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
                      onChange={handleMaritalStatusChange}
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
                      placeholder="Enter Spouse ZP number"
                      disabled={isSpouseZpNoDisabled}
                    />
                  </CCol>
                </CRow>

                {/* National ID and Mobile */}
                <CRow className="mb-3">
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
                    {errors.nationalId && (
                      <span style={{ color: "red" }}>{errors.nationalId}</span>
                    )}
                  </CCol>
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
                    {errors.mobile && (
                      <span style={{ color: "red" }}>{errors.mobile}</span>
                    )}
                  </CCol>
                </CRow>

                <CButton color="primary" type="submit">
                  Submit
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal */}
      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>
          <h5>{isError ? "Error" : "Success"}</h5>
        </CModalHeader>
        <CModalBody>
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

export default RegistrationForm;
