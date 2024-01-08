import React, { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import ModalComponent from "./ModalComponent";
import axios from "axios";
import { GrStatusInfo } from "react-icons/gr";

export const LeaveApproval = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [leaveRequest, setLeaveRequest] = useState([]);

  const openModal = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRowData({});
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllLeaveRequest();
  }, []);

  const getAllLeaveRequest = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/leaverequest`
      );

      if (response.status === 200) {
        setLeaveRequest(response.data.paramObjectsMap.leaveRequestVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    { Header: "RequestId", accessor: "id" },
    { Header: "EmpCode", accessor: "empcode" },
    { Header: "EmpName", accessor: "empname" },
    { Header: "From Date", accessor: "fromdate" },
    { Header: "To Date", accessor: "todate" },
    { Header: "Total Days", accessor: "totaldays" },
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

  return (
    <div>
      <TableComponent columns={columns} data={leaveRequest} />
      <ModalComponent
        isOpen={isModalOpen}
        closeModal={closeModal}
        rowData={selectedRowData}
      />
    </div>
  );
};

export default LeaveApproval;
