import React from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import logo1 from "src/assets/images/logo1.png";

const Login = () => {
  return (
    <div
      className=" min-vh-100 d-flex flex-row align-items-center"
      style={{
        backgroundImage: "url('src/assets/images/1.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        //backgroundColor: 'rgba(71, 71, 212,0.5)',
        backgroundBlendMode: "multiply",
      }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCard
              className="p-4"
              style={{ boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)" }}
            >
              <CCardBody>
                <CForm style={{ textAlign: "center" }}>
                  <CImage rounded src={logo1} height={150} />
                  <h1 style={{ marginTop: "20px" }}>Login</h1>
                  <p
                    className="text-body-secondary"
                    style={{ marginTop: "15px" }}
                  >
                    Please enter your credentials to login.
                  </p>

                  <CInputGroup className="mb-3" style={{ marginTop: "20px" }}>
                    <CInputGroupText
                      style={{
                        borderColor: "rgb(71, 71, 212)",
                        backgroundColor: "rgb(71, 71, 212)",
                        color: "#fff",
                      }}
                    >
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      style={{ borderColor: "rgb(71, 71, 212)" }}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-4" style={{ marginTop: "20px" }}>
                    <CInputGroupText
                      style={{
                        borderColor: "rgb(71, 71, 212)",
                        backgroundColor: "rgb(71, 71, 212)",
                        color: "#fff",
                      }}
                    >
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      style={{ borderColor: "rgb(71, 71, 212)" }}
                    />
                  </CInputGroup>

                  <CCol style={{ marginTop: "20px" }}>
                    <CRow xs={9}>
                      <Link to="/Dashboard">
                        <CButton
                          color="primary"
                          className="px-4"
                          style={{ width: "100%" }}
                        >
                          Login
                        </CButton>
                      </Link>
                    </CRow>
                    <CRow xs={6} className="text-right">
                      <CButton color="link" className="px-0">
                        Forgot password?
                      </CButton>
                    </CRow>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
