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
import successSvg from "src/assets/images/avatars/13.svg";
import errorPng from "src/assets/images/avatars/14.png";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    dob: "",
    district: "",
    zpNo: "",
    maritalStatus: "",
    spouseZpNo: "",
    nationalId: "",
    mobile: "",
    gender: "",
    baptized: "",
    occupation: "",
    parish: "",
    address: "",
    email: "",
  });

  const [children, setChildren] = useState([]); // Store multiple child data
  const [districts, setDistricts] = useState([]);
  const [errors, setErrors] = useState({
    nationalId: "",
    mobile: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSpouseZpNoDisabled, setIsSpouseZpNoDisabled] = useState(true);
  const [showChildrenFields, setShowChildrenFields] = useState(false); // Show child form fields if female

  // Fetch districts from API
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/districts");
        const data = await response.json();
        if (Array.isArray(data)) {
          setDistricts(data);
        } else if (data.districtList) {
          setDistricts(data.districtList);
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, []);

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
        setErrors((prev) => ({ ...prev, nationalId: "" }));
      } else if (value.length > 8) {
        setErrors((prev) => ({
          ...prev,
          nationalId: "National ID must be 8 digits",
        }));
      }
      return;
    }

    if (name === "mobile") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData((prev) => ({ ...prev, mobile: value }));
        setErrors((prev) => ({ ...prev, mobile: "" }));
      } else if (value.length > 10) {
        setErrors((prev) => ({
          ...prev,
          mobile: "Mobile number must be 10 digits",
        }));
      }
      return;
    }

    if (name === "gender" && value === "Female") {
      setShowChildrenFields(true); // Show child form when "Female" is selected
    } else if (name === "gender" && value !== "Female") {
      setShowChildrenFields(false); // Hide child form for other genders
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

  const handleChildDataChange = (e, index) => {
    const { name, value } = e.target;
    const newChildren = [...children];
    newChildren[index] = { ...newChildren[index], [name]: value };
    setChildren(newChildren);
  };

  const addChild = () => {
    setChildren([
      ...children,
      {
        childName: "",
        childContact: "",
        yearOfBirth: "",
        baptized: "",
        confirmed: "",
        attendsChurchSchool: "",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:8080/api/registration";

    try {
      // Submit the parent registration data first
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, children }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data to API");
      }

      const result = await response.json();
      console.log("Data successfully posted:", result);

      // If children data is added, post it to the children API
      if (children.length > 0) {
        const childrenApiUrl = "http://localhost:8080/api/children";
        const childResponse = await fetch(childrenApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(children),
        });

        if (!childResponse.ok) {
          throw new Error("Failed to submit child data");
        }

        const childResult = await childResponse.json();
        console.log("Child data successfully posted:", childResult);
      }

      // Reset form and children data after successful submission
      setFormData({
        firstName: "",
        middleName: "",
        surname: "",
        dob: "",
        district: "",
        zpNo: "",
        maritalStatus: "",
        spouseZpNo: "",
        nationalId: "",
        mobile: "",
        gender: "",
        baptized: "",
        occupation: "",
        parish: "",
        address: "",
        email: "",
      });
      setChildren([]);

      setModalMessage("Registration was successful!");
      setIsError(false);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    } catch (error) {
      console.error("Error submitting data:", error);

      setModalMessage("There was an error registering. Please try again.");
      setIsError(true);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    }
  };

  return (
    <>
      <CRow className="justify-content-md-center">
        <CCol xs={10}>
          <CCard className="mb-4">
            <CCardHeader>
              <h3 style={{ color: "blue", fontWeight: "bold" }}>
                Registration Form
              </h3>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                {/* Form Fields for the User */}
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
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>

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
                    {errors.nationalId && <p>{errors.nationalId}</p>}
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
                    {errors.mobile && <p>{errors.mobile}</p>}
                  </CCol>
                </CRow>

                <CRow className="mb-3">
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
                    />
                  </CCol>
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
                    >
                      <option value="">Select status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </CFormSelect>
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
                      placeholder="Enter spouse's ZP number"
                      disabled={isSpouseZpNoDisabled}
                    />
                  </CCol>
                  <CCol md="6">
                    <CFormLabel
                      htmlFor="gender"
                      style={{ color: "blue", fontWeight: "bold" }}
                    >
                      Gender
                    </CFormLabel>
                    <CFormSelect
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </CFormSelect>
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
                    <CFormSelect
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                    >
                      <option
                        value=""
                        style={{ color: "blue", fontWeight: "bold" }}
                      >
                        Select district
                      </option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.districtName}>
                          {district.districtName}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>

                {/* Other form fields */}
                {/* Child Information for Females */}
                {showChildrenFields && (
                  <div>
                    <CButton color="info" onClick={addChild}>
                      Add Child
                    </CButton>

                    {children.map((child, index) => (
                      <CCard key={index} className="mt-3">
                        <CCardBody>
                          <CRow>
                            <CCol md="6">
                              <CFormLabel htmlFor={`childName${index}`}>
                                Child's Name
                              </CFormLabel>
                              <CFormInput
                                id={`childName${index}`}
                                name="childName"
                                value={child.childName}
                                onChange={(e) =>
                                  handleChildDataChange(e, index)
                                }
                                placeholder="Enter child's name"
                                required
                              />
                            </CCol>

                            <CCol md="6">
                              <CFormLabel htmlFor={`yearOfBirth${index}`}>
                                Year of Birth
                              </CFormLabel>
                              <CFormInput
                                type="date" // Use type="date" to allow date selection
                                id={`yearOfBirth${index}`}
                                name="yearOfBirth"
                                value={child.yearOfBirth}
                                onChange={(e) =>
                                  handleChildDataChange(e, index)
                                }
                                required
                              />
                            </CCol>
                          </CRow>

                          <CRow className="mb-3">
                            <CCol md="6">
                              <CFormLabel htmlFor={`childContact${index}`}>
                                Child's Contact
                              </CFormLabel>
                              <CFormInput
                                id={`childContact${index}`}
                                name="childContact"
                                value={child.childContact}
                                onChange={(e) =>
                                  handleChildDataChange(e, index)
                                }
                                placeholder="Enter child's contact"
                              />
                            </CCol>

                            <CCol md="6">
                              <CFormLabel htmlFor={`baptized${index}`}>
                                Baptized
                              </CFormLabel>
                              <CFormSelect
                                id={`baptized${index}`}
                                name="baptized"
                                value={child.baptized}
                                onChange={(e) =>
                                  handleChildDataChange(e, index)
                                }
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>

                          <CRow className="mb-3">
                            <CCol md="6">
                              <CFormLabel htmlFor={`confirmed${index}`}>
                                Confirmed
                              </CFormLabel>
                              <CFormSelect
                                id={`confirmed${index}`}
                                name="confirmed"
                                value={child.confirmed}
                                onChange={(e) =>
                                  handleChildDataChange(e, index)
                                }
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </CFormSelect>
                            </CCol>

                            <CCol md="6">
                              <CFormLabel
                                htmlFor={`attendsChurchSchool${index}`}
                              >
                                Attends Church School
                              </CFormLabel>
                              <CFormSelect
                                id={`attendsChurchSchool${index}`}
                                name="attendsChurchSchool"
                                value={child.attendsChurchSchool}
                                onChange={(e) =>
                                  handleChildDataChange(e, index)
                                }
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>

                          {/* Button to remove the child entry */}
                          <CButton
                            color="danger"
                            onClick={() => removeChild(index)}
                          >
                            Remove Child
                          </CButton>
                        </CCardBody>
                      </CCard>
                    ))}
                  </div>
                )}

                {/* Submit Button */}
                <CButton type="submit" color="primary">
                  Submit
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal for Success/Error */}
      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader closeButton>{isError ? "Error" : "Success"}</CModalHeader>
        <CModalBody>
          <img
            src={isError ? errorPng : successSvg}
            alt={isError ? "Error" : "Success"}
            width={50}
            height={50}
          />
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
