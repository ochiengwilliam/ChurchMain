import React, { useState, useEffect } from "react";
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
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import { FiSearch } from "react-icons/fi";
import "ldrs/zoomies"; // Import the zoomies loader

const Members = () => {
  const [visible, setVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});
  const [cardNumber, setCardNumber] = useState(""); // State for card number
  const [cardSerialNumber, setCardSerialNumber] = useState(""); // State for card serial number
  const [searchZpNo, setSearchZpNo] = useState(""); // State for ZP number search
  const [searchMobile, setSearchMobile] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'receiving', 'nonReceiving'
  const [members, setMembers] = useState([]); // State to store members
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const membersPerPage = 10; // Number of members per page

  // Fetch members from the backend on component mount
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("http://localhost:8080/api/registration");
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchMembers();
  }, []);

  // Calculate the number of pages
  const totalPages = Math.ceil(members.length / membersPerPage);

  // Get the members for the current page
  const paginatedMembers = members
    .filter(
      (member) =>
        member.zpNo.toLowerCase().includes(searchZpNo.toLowerCase()) && // Search by ZP Number
        member.mobile.toLowerCase().includes(searchMobile.toLowerCase())
    )
    .slice((currentPage - 1) * membersPerPage, currentPage * membersPerPage);

  const handleAssignCardClick = (member) => {
    setSelectedMember(member);
    setVisible(true);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <CCard
        className="mb-4"
        style={{
          boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {/* Tabs for All Members */}
        <CNav variant="tabs" role="tablist">
          <CNavItem>
            <CNavLink
              active={activeTab === "all"}
              onClick={() => handleTabClick("all")}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              All Members
            </CNavLink>
          </CNavItem>
        </CNav>

        {/* Search Inputs */}
        <div className="mb-3 mt-3" style={{ maxWidth: "300px" }}>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <FiSearch />
            </CInputGroupText>
            <CFormInput
              placeholder="Search by ZP Number"
              value={searchZpNo}
              onChange={(e) => setSearchZpNo(e.target.value)}
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
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="text-center">
            <l-zoomies
              size="80"
              stroke="5"
              bg-opacity="0.1"
              speed="1.4"
              color="blue"
            ></l-zoomies>
            <p>Loading members...</p>
          </div>
        ) : (
          <>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ color: "blue" }}>
                    #
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ color: "blue" }}>
                    First Name
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ color: "blue" }}>
                    Surname
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ color: "blue" }}>
                    ZP Number
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ color: "blue" }}>
                    National ID
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ color: "blue" }}>
                    Phone Number
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ color: "blue" }}>
                    Action
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {paginatedMembers.map((member, index) => (
                  <CTableRow key={member.id}>
                    <CTableHeaderCell scope="row">
                      {(currentPage - 1) * membersPerPage + index + 1}
                    </CTableHeaderCell>
                    <CTableDataCell>{member.firstName}</CTableDataCell>
                    <CTableDataCell>{member.surname}</CTableDataCell>
                    <CTableDataCell>{member.zpNo || "-"}</CTableDataCell>
                    <CTableDataCell>{member.nationalId || "-"}</CTableDataCell>
                    <CTableDataCell>{member.mobile || "-"}</CTableDataCell>
                    <CTableDataCell>
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
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {/* Pagination Controls */}
            <CPagination className="mt-3">
              <CPaginationItem
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </CPaginationItem>
              {Array.from({ length: totalPages }, (_, index) => (
                <CPaginationItem
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </CPaginationItem>
            </CPagination>
          </>
        )}
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
            <strong>Surname:</strong> {selectedMember.surname || "-"}
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
            Cancel
          </CButton>
          <CButton color="primary" onClick={() => setVisible(false)}>
            Assign Card
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Members;
