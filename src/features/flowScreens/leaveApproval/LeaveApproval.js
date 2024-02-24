import React, { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import ModalComponent from "./ModalComponent";
import axios from "axios";
import { SlOptionsVertical } from "react-icons/sl";
import { LiaCommentSolid } from "react-icons/lia";

export const LeaveApproval = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [leaveRequest, setLeaveRequest] = useState([]);
  const [leaveRequestId, setLeaveRequestId] = useState({});
  const [leaveMail, setLeaveMail] = useState();
  const [toEmpName, setToEmpName] = useState();
  const [loginEmpCode, setLoginEmpCode] = React.useState(localStorage.getItem("empcode"));
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [loginUserRole, setloginUserRole] = React.useState(localStorage.getItem("userDetails"));



  const openModal = (rowData) => {
    setSelectedRowData(rowData);
    setLeaveRequestId(rowData.id);
    setLeaveMail(rowData.empmail);
    setToEmpName(rowData.empname);
    setIsModalOpen(true);
    console.log("Testing:", rowData.empmail);
  };

  const closeModal = () => {
    setSelectedRowData({});
    getAllLeaveRequest();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (loginUserRole === "MANAGER") {
      getAllLeaveRequestByRole();
    }
    else {
      getAllLeaveRequest();
    }

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


  const getAllLeaveRequestByRole = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/leaverequest/approval?empcode=${loginEmpCode}&orgId=${orgId}`
      );

      if (response.status === 200) {
        setLeaveRequest(response.data.paramObjectsMap.leaveRequestVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // console.log("Testing:",leaveMail);

  const columns = [
    { Header: "RequestId", accessor: "id" },
    { Header: "EmpCode", accessor: "empcode" },
    { Header: "EmpName", accessor: "empname" },
    { Header: "Emp Email", accessor: "empmail" },
    { Header: "From Date", accessor: "fromdate" },
    { Header: "To Date", accessor: "todate" },
    { Header: "Total Days", accessor: "totaldays" },
    { Header: "Notes", accessor: "notes" },
    { Header: "Status", accessor: "status" },
    {
      Header: <LiaCommentSolid className="w-6 h-6" />,
      accessor: "actions",
      Cell: ({ row }) => (
        <SlOptionsVertical
          onClick={() => openModal(row.original)}
          style={{ cursor: "pointer", margin: "auto" }}
        />
      ),
    },
    // Add more columns as needed
  ];

  return (
    <div className="card w-full p-4 bg-base-100 shadow-xl">
      <TableComponent columns={columns} data={leaveRequest} />
      <ModalComponent
        isOpen={isModalOpen}
        closeModal={closeModal}
        rowData={selectedRowData}
        reqId={leaveRequestId}
        toMail={leaveMail}
        toempName={toEmpName}
      />

    </div>
  );
};

export default LeaveApproval;
