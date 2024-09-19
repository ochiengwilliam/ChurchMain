import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Registration = () => {
  const [files, setFiles] = useState(null);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate(); // Initialize navigate hook

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

  const handleRedirect = () => {
    navigate("/members"); // Redirect to the "Members" page
  };

  return (
    <>
      <CRow className="justify-content-md-center">
        <CCol xs={10}>
          {/* Upload file card */}
          <CCard
            className="mb-4"
            style={{
              boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)",
              width: "80%", // Expanded the card's width to 80% of the container
              margin: "auto", // Center the card horizontally
            }}
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
                  height: "250px", // Expanded height of the drop zone area
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
                <div style={{ marginTop: "20px" }}>
                  {Array.from(files).map((file, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      {/* File name in the bar */}
                      <div
                        style={{
                          backgroundColor: "#198754", // Same color as the upload button
                          padding: "10px",
                          borderRadius: "5px",
                          flexGrow: 1, // Ensures the bar takes up available space
                          marginRight: "10px",
                        }}
                      >
                        <span style={{ color: "#fff", fontWeight: "bold" }}>
                          {file.name}
                        </span>
                      </div>

                      {/* Delete button positioned next to the bar */}
                      <CButton
                        color="danger"
                        style={{ color: "#fff" }}
                        onClick={() => handleDelete(file)}
                      >
                        Delete
                      </CButton>
                    </div>
                  ))}

                  {/* Upload button */}
                  <CButton
                    color="success"
                    onClick={handleUpload}
                    style={{ marginTop: "20px", color: "#fff" }}
                  >
                    Upload
                  </CButton>
                </div>
              )}
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
            <h2>Upload Successful</h2>
          </CModalTitle>
          <CButton
            color="primary"
            className="mt-3"
            style={{ width: "80%" }}
            onClick={handleRedirect} // Call the handleRedirect function
          >
            OK
          </CButton>
        </CModalBody>
      </CModal>
    </>
  );
};

export default Registration;
