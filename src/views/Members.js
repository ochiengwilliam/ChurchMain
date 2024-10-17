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
  const [editVisible, setEditVisible] = useState(false); // For editing modal
  const [selectedMember, setSelectedMember] = useState({});
  const [editMember, setEditMember] = useState({}); // For member being edited
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

  // Handle member deletion
  const handleDeleteMember = async (memberId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/registration/${memberId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the deleted member from the state
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.id !== memberId)
        );
        alert("Member deleted successfully.");
      } else {
        alert("Failed to delete the member.");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("An error occurred while deleting the member.");
    }
  };

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

  // Handle the "Edit" click
  const handleEditClick = (member) => {
    setEditMember(member); // Set the member to be edited
    setEditVisible(true); // Show the edit modal
  };

  // Handle saving the edited member
  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/registration/${editMember.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editMember),
        }
      );

      if (response.ok) {
        const updatedMember = await response.json();
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === updatedMember.id ? updatedMember : member
          )
        );
        alert("Member updated successfully.");
        setEditVisible(false); // Close modal on success
      } else {
        alert("Failed to update the member.");
      }
    } catch (error) {
      console.error("Error updating member:", error);
      alert("An error occurred while updating the member.");
    }
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
                            style={{ cursor: "pointer", fontWeight: "bold" }}
                            onClick={() => handleAssignCardClick(member)}
                          >
                            Assign Card
                          </CDropdownItem>
                          <CDropdownItem
                            style={{ cursor: "pointer", fontWeight: "bold" }}
                            onClick={() => handleEditClick(member)}
                          >
                            Edit
                          </CDropdownItem>
                          <CDropdownItem
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontWeight: "bold",
                            }}
                            pointer
                            onClick={() => handleDeleteMember(member.id)}
                          >
                            Delete
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {/* Pagination */}
            <CPagination align="center" aria-label="Page navigation example">
              <CPaginationItem
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </CPaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => (
                <CPaginationItem
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </CPaginationItem>
            </CPagination>
          </>
        )}
      </CCard>

      {/* Modal for Assigning Card */}
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Assign Card</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <h6>
              Assign card for:{" "}
              <span style={{ color: "blue" }}>
                {selectedMember.firstName} {selectedMember.surname}
              </span>
            </h6>
          </div>
          <CInputGroup className="mb-3">
            <CInputGroupText>Card Number</CInputGroupText>
            <CFormInput
              placeholder="Enter card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </CInputGroup>

          <CInputGroup className="mb-3">
            <CInputGroupText>Card Serial Number</CInputGroupText>
            <CFormInput
              placeholder="Enter card serial number"
              value={cardSerialNumber}
              onChange={(e) => setCardSerialNumber(e.target.value)}
            />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary">Assign</CButton>
        </CModalFooter>
      </CModal>

      {/* Modal for Editing Member */}
      <CModal
        alignment="center"
        visible={editVisible}
        onClose={() => setEditVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Edit Member</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CInputGroup className="mb-3">
            <CInputGroupText>First Name</CInputGroupText>
            <CFormInput
              value={editMember.firstName}
              onChange={(e) =>
                setEditMember({ ...editMember, firstName: e.target.value })
              }
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>Middle Name</CInputGroupText>
            <CFormInput
              value={editMember.middleName || ""}
              onChange={(e) =>
                setEditMember({ ...editMember, middleName: e.target.value })
              }
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>Surname</CInputGroupText>
            <CFormInput
              value={editMember.surname}
              onChange={(e) =>
                setEditMember({ ...editMember, surname: e.target.value })
              }
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>National ID</CInputGroupText>
            <CFormInput
              value={editMember.nationalId}
              onChange={(e) =>
                setEditMember({ ...editMember, nationalId: e.target.value })
              }
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>Mobile Number</CInputGroupText>
            <CFormInput
              value={editMember.mobile}
              onChange={(e) =>
                setEditMember({ ...editMember, mobile: e.target.value })
              }
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>ZP Number</CInputGroupText>
            <CFormInput
              value={editMember.zpNo}
              onChange={(e) =>
                setEditMember({ ...editMember, zpNo: e.target.value })
              }
            />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSaveEdit}>
            Save Changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Members;
