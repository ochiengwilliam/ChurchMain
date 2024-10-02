import React, { useState } from "react";
import {
  CCard,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import { FiSearch } from "react-icons/fi";

const Reports = () => {
  // Static members data
  const members = [
    {
      id: 1,
      firstName: "Mark",
      lastName: "Otto",
      mobile: "2334567890",
      email: "otto@gmail.com",
      receiving: true,
      cardNumber: "123456",
      cardSerialNumber: "SN123456",
    },
    {
      id: 2,
      firstName: "Jacob",
      lastName: "Jack",
      mobile: "345678907890",
      email: "fat@gmail.com",
      receiving: true,
      cardNumber: "654321",
      cardSerialNumber: "SN654321",
    },
    {
      id: 3,
      firstName: "Larry",
      lastName: "Bird",
      mobile: "4567890",
      email: "bird@gmail.com",
      receiving: true,
      cardNumber: "112233",
      cardSerialNumber: "SN112233",
    },
    {
      id: 4,
      firstName: "Robbie",
      lastName: "Right",
      mobile: "01150010978",
      email: "robbie@gmail.com",
      receiving: false,
      cardNumber: "",
      cardSerialNumber: "",
    },
    {
      id: 5,
      firstName: "Ashley",
      lastName: "Williams",
      mobile: "737872387918",
      email: "ashley@gmail.com",
      receiving: false,
      cardNumber: "",
      cardSerialNumber: "",
    },
    {
      id: 6,
      firstName: "Ramsey",
      lastName: "Bolton",
      mobile: "34567890897654",
      email: "ramsey@gmail.com",
      receiving: true,
      cardNumber: "445566",
      cardSerialNumber: "SN445566",
    },
    {
      id: 7,
      firstName: "Leannah",
      lastName: "Smith",
      mobile: "7881479894891",
      email: "leannah@gmail.com",
      receiving: false,
      cardNumber: "",
      cardSerialNumber: "",
    },
    {
      id: 8,
      firstName: "Rosie",
      lastName: "Fox",
      mobile: "7634676893",
      email: "fox@gmail.com",
      receiving: true,
      cardNumber: "778899",
      cardSerialNumber: "SN778899",
    },
  ];

  // State to manage active report tab
  const [activeTab, setActiveTab] = useState(1); // 1: All, 2: Holy Communion, 3: Non-Receiving, 4: Active Members, 5: Dormant Members

  // States for search filters
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");

  // Function to handle print
  const handlePrint = () => {
    window.print();
  };

  // Function to filter members based on active tab and search inputs
  const getFilteredMembers = () => {
    return members.filter((member) => {
      const matchesFirstName = member.firstName
        .toLowerCase()
        .includes(searchFirstName.toLowerCase());
      const matchesMobile = member.mobile
        .toLowerCase()
        .includes(searchMobile.toLowerCase());

      let matchesTab = false;
      if (activeTab === 1) {
        matchesTab = true; // All Members
      } else if (activeTab === 2) {
        matchesTab = member.receiving; // Holy Communion
      } else if (activeTab === 3) {
        matchesTab = !member.receiving; // Non-Receiving
      } else if (activeTab === 4) {
        matchesTab = member.id !== 5 && member.id !== 7; // Active Members
      } else if (activeTab === 5) {
        matchesTab = member.id === 5 || member.id === 7; // Dormant Members
      }

      return matchesFirstName && matchesMobile && matchesTab;
    });
  };

  const filteredMembers = getFilteredMembers();

  return (
    <>
      <CCard
        className="mb-4"
        style={{
          boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)",
          color: "light-gray",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {/* Tabs for All, Holy Communion, Non-Receiving, Active, Dormant Members */}
        <CNav
          variant="pills"
          className="d-flex justify-content-center mb-3"
          role="tablist"
        >
          <CNavItem>
            <CNavLink
              active={activeTab === 1}
              onClick={() => setActiveTab(1)}
              style={{
                margin: "0 5px",
                borderRadius: "100px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              All Members
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 2}
              onClick={() => setActiveTab(2)}
              style={{
                margin: "0 5px",
                borderRadius: "100px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Holy Communion
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 3}
              onClick={() => setActiveTab(3)}
              style={{
                margin: "0 5px",
                borderRadius: "100px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Non-Receiving Members
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 4}
              onClick={() => setActiveTab(4)}
              style={{
                margin: "0 5px",
                borderRadius: "100px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Active Members
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 5}
              onClick={() => setActiveTab(5)}
              style={{
                margin: "0 5px",
                borderRadius: "100px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Dormant Members
            </CNavLink>
          </CNavItem>
        </CNav>

        {/* Optional: Search Inputs */}
        <div className="d-flex justify-content-center mb-3">
          <CInputGroup className="mx-2" style={{ maxWidth: "300px" }}>
            <CInputGroupText>
              <FiSearch />
            </CInputGroupText>
            <CFormInput
              placeholder="Search by First Name"
              value={searchFirstName}
              onChange={(e) => setSearchFirstName(e.target.value)}
            />
          </CInputGroup>

          <CInputGroup className="mx-2" style={{ maxWidth: "300px" }}>
            <CInputGroupText>
              <FiSearch />
            </CInputGroupText>
            <CFormInput
              placeholder="Search by Mobile Number"
              value={searchMobile}
              onChange={(e) => setSearchMobile(e.target.value)}
            />
          </CInputGroup>
        </div>

        {/* Table to display filtered members */}
        <CTable striped responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Surname</CTableHeaderCell>
              <CTableHeaderCell scope="col">Card Number</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Card Serial Number
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Receiving Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredMembers.map((member) => (
              <CTableRow key={member.id}>
                <CTableHeaderCell scope="row">{member.id}</CTableHeaderCell>
                <CTableDataCell>{member.firstName}</CTableDataCell>
                <CTableDataCell>{member.lastName || "-"}</CTableDataCell>
                <CTableDataCell>
                  {member.cardNumber ? member.cardNumber : "-"}
                </CTableDataCell>
                <CTableDataCell>
                  {member.cardSerialNumber ? member.cardSerialNumber : "-"}
                </CTableDataCell>
                <CTableDataCell>{member.mobile}</CTableDataCell>
                <CTableDataCell>{member.email}</CTableDataCell>
                <CTableDataCell>
                  {member.receiving ? "Holy Communion" : "Non-Receiving"}
                </CTableDataCell>
              </CTableRow>
            ))}

            {/* Row for the Print Button */}
            <CTableRow>
              <CTableDataCell colSpan="8" className="text-center">
                <CButton color="primary" onClick={handlePrint}>
                  Print Report
                </CButton>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCard>
    </>
  );
};

export default Reports;
