import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUserPlus,
  cilGroup,
} from "@coreui/icons";

import {
  MdAccountCircle,
  MdCoPresent,
  MdCorporateFare,
  MdSpeakerPhone,
  MdGroupAdd,
  MdOutlineGroups2,
  MdWindow,
  MdBadge,
} from "react-icons/md";

import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavGroup,
    name: (
      <span style={{ fontWeight: "bold", fontSize: "18px" }}>Registration</span>
    ),
    icon: <MdAccountCircle className="nav-icon" style={{ fontSize: "50px" }} />,
    items: [
      {
        component: CNavItem,
        name: <span style={{}}>Regular Members</span>,
        to: "/RegularMembers",
      },
      {
        component: CNavItem,
        name: <span style={{}}>Registration Form</span>,
        to: "/RegistrationForm",
      },
      {
        component: CNavItem,
        name: <span style={{}}>Visitors</span>,
        to: "/visitors",
      },
    ],
  },

  {
    component: CNavItem,
    name: (
      <span style={{ fontWeight: "bold", fontSize: "18px" }}>Employees</span>
    ),
    to: "/employees",
    icon: <MdBadge className="nav-icon" />,
  },

  {
    component: CNavItem,
    name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Elders</span>,
    to: "/elders",
    icon: <MdOutlineGroups2 className="nav-icon" />,
  },

  {
    component: CNavItem,
    name: (
      <span style={{ fontWeight: "bold", fontSize: "18px" }}>Districts</span>
    ),
    to: "/districts",
    icon: (
      <MdWindow
        className="nav-icon"
        height={"56px"}
        style={{ fontSize: "50px" }}
      />
    ),
  },

  {
    component: CNavItem,
    name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Members</span>,
    to: "/members",
    icon: <MdGroupAdd className="nav-icon" />,
  },

  {
    component: CNavItem,
    name: (
      <span style={{ fontWeight: "bold", fontSize: "18px" }}>
        RFID Registration
      </span>
    ),
    to: "/rfid",
    icon: <MdSpeakerPhone className="nav-icon" />,
  },

  {
    component: CNavItem,
    name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Reports</span>,
    to: "/reports",
    icon: <MdCorporateFare className="nav-icon" />,
  },
];

export default _nav;
