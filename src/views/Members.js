import React, { useState } from "react";
import {
  CCard,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from "@coreui/react";
import { FiSearch } from "react-icons/fi";

const Members = () => {
  const [visible, setVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});
  const [cardNumber, setCardNumber] = useState(""); // New state for card number
  const [cardSerialNumber, setCardSerialNumber] = useState(""); // New state for card serial number
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [activeTab, setActiveTab] = useState(1); // 1: All, 2: Receiving, 3: Non-Receiving

  const handleAssignCardClick = (member) => {
    setSelectedMember(member);
    setVisible(true);
  };

  const members = [
    {
      id: 1,
      firstName: "Mark",
      lastName: "Otto",
      mobile: "@mdo",
      email: "otto@gmail.com",
      receiving: true,
    },
    {
      id: 2,
      firstName: "Jacob",
      lastName: "Thornton",
      mobile: "@fat",
      email: "otto@gmail.com",
      receiving: true,
    },
    {
      id: 3,
      firstName: "Larry",
      lastName: "Bird",
      mobile: "@twitter",
      email: "otto@gmail.com",
      receiving: true,
    },

    {
      id: 4,
      firstName: "Robbie",
      lastName: "Right",
      mobile: "01150010978",
      email: "robbie@gmail.com",
      receiving: false,
    },

    {
      id: 5,
      firstName: "Ashley",
      lastName: "Williams",
      mobile: "737872387918",
      email: "ashley@gmail.com",
      receiving: false,
    },

    {
      id: 6,
      firstName: "Ramsey",
      lastName: "Bolton",
      mobile: "34567890897654",
      email: "ramsey@gmail.com",
      receiving: true,
    },

    {
      id: 7,
      firstName: "Leannah",
      lastName: "Smith",
      mobile: "7881479894891",
      email: "leannah@gmail.com",
      receiving: false,
    },

    {
      id: 8,
      firstName: "Rosie",
      lastName: "Fox",
      mobile: "7634676893",
      email: "robbie@gmail.com",
      receiving: true,
    },
  ];

  const filteredMembers = members.filter(
    (member) =>
      member.firstName.toLowerCase().includes(searchFirstName.toLowerCase()) &&
      member.mobile.toLowerCase().includes(searchMobile.toLowerCase()) &&
      (activeTab === 1 ||
        (activeTab === 2 && member.receiving) ||
        (activeTab === 3 && !member.receiving))
  );

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
        {/* Tabs for All, Receiving, and Non-Receiving Members */}
        <CNav
          variant="pills"
          className="d-flex justify-content-center"
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
        </CNav>

        <CTabContent>
          <CTabPane visible={activeTab === 1}>
            <h4 style={{ color: "blue" }}>All Members</h4>
          </CTabPane>
          <CTabPane visible={activeTab === 2}>
            <h4 style={{ color: "blue" }}>Receiving Members</h4>
          </CTabPane>
          <CTabPane visible={activeTab === 3}>
            <h4 style={{ color: "blue" }}>Non-Receiving Members</h4>
          </CTabPane>
        </CTabContent>

        {/* Search Inputs */}
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <FiSearch />
          </CInputGroupText>
          <CFormInput
            placeholder="Search by First Name"
            value={searchFirstName}
            onChange={(e) => setSearchFirstName(e.target.value)}
          />
        </CInputGroup>

        <CInputGroup className="mb-3">
          <CInputGroupText>
            <FiSearch />
          </CInputGroupText>
          <CFormInput
            placeholder="Search by Mobile Number"
            value={searchMobile}
            onChange={(e) => setSearchMobile(e.target.value)}
          />
        </CInputGroup>

        {/* Table to display filtered members */}
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Surname</CTableHeaderCell>
              <CTableHeaderCell scope="col">National ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredMembers.map((member) => (
              <CTableRow key={member.id}>
                <CTableHeaderCell scope="row">{member.id}</CTableHeaderCell>
                <CTableDataCell>{member.firstName}</CTableDataCell>
                <CTableDataCell>{member.lastName || "-"}</CTableDataCell>
                <CTableDataCell></CTableDataCell>{" "}
                {/* National ID column left empty */}
                <CTableDataCell>{member.mobile}</CTableDataCell>
                <CTableDataCell>{member.email}</CTableDataCell>
                <CTableDataCell>
                  <div>
                    <CDropdown alignment="end">
                      <CDropdownToggle
                        color="success"
                        style={{ color: "#fff", fontWeight: "bold" }}
                      >
                        Action
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem
                          onClick={() => handleAssignCardClick(member)}
                        >
                          Assign Card
                        </CDropdownItem>
                        <CDropdownItem>Delete</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>

      {/* Modal for assigning card */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Assign Card</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
            <strong>First Name:</strong> {selectedMember.firstName}
          </p>
          <p>
            <strong>Surname:</strong> {selectedMember.lastName || "-"}
          </p>
          <p>
            <strong>Mobile Number:</strong> {selectedMember.mobile}
          </p>
          <p>
            <strong>Email:</strong> {selectedMember.email}
          </p>

          {/* New input fields for card number and serial number */}
          <CInputGroup className="mb-3">
            <CInputGroupText>Card Number</CInputGroupText>
            <CFormInput
              placeholder="Enter Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </CInputGroup>

          <CInputGroup className="mb-3">
            <CInputGroupText>Card Serial Number</CInputGroupText>
            <CFormInput
              placeholder="Enter Card Serial Number"
              value={cardSerialNumber}
              onChange={(e) => setCardSerialNumber(e.target.value)}
            />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Assign</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Members;
