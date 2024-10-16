import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CButton,
} from "@coreui/react";

import { AppSidebarNav } from "./AppSidebarNav";

import logo1 from "src/assets/images/logo1.png";
import logoutImage from "src/assets/images/avatars/17.png"; // Import the logout image
import { CImage } from "@coreui/react";

// sidebar nav config
import navigation from "../_nav";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      //narrow
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
      style={{
        backgroundColor: "rgba(22, 89, 177, 0.925)",
        color: "white",
        boxShadow: "20px 0px 60px -5px rgba(0,0,0,0.2)",
        zIndex: 3,
      }}
    >
      <CSidebarHeader className="border-bottom">
        <div
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "center",
          }}
        >
          <CImage rounded src={logo1} width={50} height={50} />
          <h4>PCEA</h4>
        </div>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: "set", sidebarShow: false })}
        />
      </CSidebarHeader>

      {/* Navigation items */}
      <AppSidebarNav items={navigation} />

      {/* Sidebar Footer for Sign-Out Button */}
      <CSidebarFooter
        className="border-top d-none d-lg-flex"
        style={{ padding: "10px" }}
      >
        <CButton
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start", // Push content to the left
            backgroundColor: "transparent", // Transparent background
            border: "none", // No border
            boxShadow: "none", // No shadow
            padding: "10px 20px", // Padding for alignment
            transition: "background-color 0.3s ease", // Smooth transition for hover
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "black";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <img
            src={logoutImage}
            alt="Logout"
            style={{ width: "36px", marginRight: "16px" }}
          />
          Sign Out
        </CButton>
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
