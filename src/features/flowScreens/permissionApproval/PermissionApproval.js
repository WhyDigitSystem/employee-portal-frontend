import React, { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import ModalComponent from "./ModalComponent";
import { GrStatusInfo } from "react-icons/gr";
import Axios from "axios";
import { SlOptionsVertical } from "react-icons/sl";
import { LiaCommentSolid } from "react-icons/lia";

export const PermissionApproval = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [permissionRequest, setPermissionRequest] = useState([]);
  const [permissionRequestId, setPermissionRequestId] = useState([]);

  const openModal = (rowData) => {
    setSelectedRowData(rowData);
    setPermissionRequestId(rowData.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRowData({});
    getPermissionApproval();
    setIsModalOpen(false);
  };

  const columns = [
    { Header: "SNo", accessor: "id" },
    { Header: "Date", accessor: "permissiondate" },
    { Header: "From Time", accessor: "fromhour" },
    { Header: "To Time", accessor: "tohour" },
    { Header: "Total Hrs", accessor: "totalhours" },
    { Header: "Notes", accessor: "notes" },
    { Header: "Notify", accessor: "" },
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
  ];

  useEffect(() => {
    getPermissionApproval();
  }, []);

  const getPermissionApproval = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      Axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/permissionRequest`,
        {
          headers,
        }
      )
        .then((response) => {
          console.log("Data saved successfully:", response.data);
          setPermissionRequest(
            response.data.paramObjectsMap.PermissionRequestVO
          );
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    }
  };

  return (
    <div className="card w-full p-4 bg-base-100 shadow-xl">
      <TableComponent columns={columns} data={permissionRequest} />
      <ModalComponent
        isOpen={isModalOpen}
        closeModal={closeModal}
        rowData={selectedRowData}
        reqId={permissionRequestId}
      />
    </div>
  );
};

export default PermissionApproval;
