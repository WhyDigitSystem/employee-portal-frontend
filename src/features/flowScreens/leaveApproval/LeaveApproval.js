import React, { useState } from "react";
import TableComponent from "./TableComponent";
import ModalComponent from "./ModalComponent";
import { FiInfo } from "react-icons/fi";
import { GrStatusInfo } from "react-icons/gr";

export const LeaveApproval = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});

  const openModal = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRowData({});
    setIsModalOpen(false);
  };

  const columns = [
    { Header: "SNo", accessor: "sno" },
    { Header: "Date", accessor: "date" },
    { Header: "From Date", accessor: "fromDate" },
    { Header: "To Date", accessor: "toDate" },
    { Header: "Total Days", accessor: "totalDays" },
    { Header: "Notes", accessor: "notes" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        // <button
        //   onClick={() => openModal(row.original)}
        //   style={{
        //     backgroundColor: "#4CAF50",
        //     color: "white",
        //     border: "none",
        //     padding: "10px 15px",
        //     textAlign: "center",
        //     textDecoration: "none",
        //     display: "inline-block",
        //     fontSize: "14px",
        //     cursor: "pointer",
        //   }}
        // >
        <GrStatusInfo
          onClick={() => openModal(row.original)}
          style={{ cursor: "pointer", marginRight: "5px" }}
        />
        // </button>
      ),
    },
    // Add more columns as needed
  ];

  const data = [
    {
      sno: "1",
      date: "25/11/2022",
      fromDate: "30/12/2022",
      toDate: "02/01/2023",
      totalDays: "3days",
      notes: "For Emergency Purpose",
    },
    {
      sno: "2",
      date: "07/02/2023",
      fromDate: "11/05/2023",
      toDate: "13/05/2023",
      totalDays: "2Days",
      notes: "For Emergency Purpose",
    },
    // Add more data rows as needed
  ];

  return (
    <div>
      <TableComponent columns={columns} data={data} />
      <ModalComponent
        isOpen={isModalOpen}
        closeModal={closeModal}
        rowData={selectedRowData}
      />
    </div>
  );
};

export default LeaveApproval;
