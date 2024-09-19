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
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  const [files, setFiles] = useState(null);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    nationalId: "",
    mobile: "",
  });

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(e.dataTransfer.files);
  };

  const handleDelete = (fileObj) => {
    const newFiles = Object.values(files).filter((file) => file !== fileObj);
    setFiles(newFiles);
  };

  const handleUpload = () => {
    setVisible(!visible);
    const formData = new FormData();
    formData.append("Files", files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Visitor Data Submitted:", formData);
    setVisible(true);
  };

  return (
    <>
      <CRow className="justify-content-md-center">
        <CCol xs={10}>
          {/* Upload file card */}
          <CCard
            className="mb-4"
            style={{ boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)" }}
          >
            <CCardHeader style={{ backgroundColor: "#fff", color: "blue" }}>
              <h3>Upload file</h3>
            </CCardHeader>
            <CCardBody>
              <div
                style={{
                  background: "#f3f4f6",
                  border: "2px dashed lightgray",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  color: "gray",
                  padding: "20px",
                }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <h3>Drag and Drop files to upload</h3>
                <h3>Or</h3>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  hidden
                  ref={inputRef}
                />
                <CButton
                  type="button"
                  color="dark"
                  onClick={() => inputRef.current.click()}
                  style={{ margin: "20px" }}
                >
                  Select Files
                </CButton>
              </div>

              {files && (
                <div style={{ margin: "40px" }}>
                  {Array.from(files).map((file, idx) => (
                    <div key={idx}>
                      {file.name}
                      <CButton
                        color="danger"
                        style={{ color: "#fff" }}
                        onClick={() => handleDelete(file)}
                      >
                        Delete
                      </CButton>
                    </div>
                  ))}
                  <CButton
                    color="success"
                    onClick={handleUpload}
                    style={{ marginRight: "20px", color: "#fff" }}
                    xs={10}
                  >
                    Upload
                  </CButton>
                </div>
              )}
            </CCardBody>
          </CCard>

          {/* Visitor Registration card */}
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
        </CCol>
      </CRow>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CModalBody
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "50px",
            textAlign: "center",
          }}
        >
          <CModalTitle>
            <h2>Registration Successful</h2>
          </CModalTitle>
          <Link
            to="/home"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CButton color="primary" className="mt-3" style={{ width: "80%" }}>
              OK
            </CButton>
          </Link>
        </CModalBody>
      </CModal>
    </>
  );
};

export default Registration;
