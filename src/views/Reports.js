import React from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from "@coreui/react";

const Reports = () => {
  const members = [
    {
      id: 1,
      firstName: "Mark",
      lastName: "Otto",
      time: "09:00 AM",
      status: "Present",
    },
    {
      id: 2,
      firstName: "Jacob",
      lastName: "Thornton",
      time: "09:15 AM",
      status: "Absent",
    },
    {
      id: 3,
      firstName: "Larry",
      lastName: "Bird",
      time: "09:10 AM",
      status: "Present",
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Time</CTableHeaderCell>
          <CTableHeaderCell scope="col">Status</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {members.map((member) => (
          <CTableRow key={member.id}>
            <CTableHeaderCell scope="row">{member.id}</CTableHeaderCell>
            <CTableDataCell>{member.firstName}</CTableDataCell>
            <CTableDataCell>{member.lastName}</CTableDataCell>
            <CTableDataCell>{member.time}</CTableDataCell>
            <CTableDataCell>{member.status}</CTableDataCell>
          </CTableRow>
        ))}

        {/* New row for the print button */}
        <CTableRow>
          <CTableDataCell colSpan="5" className="text-center">
            {/* <CButton color="primary" onClick={handlePrint}>
              Print Report
            </CButton> */}
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  );
};

export default Reports;
