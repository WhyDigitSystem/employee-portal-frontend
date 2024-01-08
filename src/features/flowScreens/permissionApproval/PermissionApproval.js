import React, { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import ModalComponent from "./ModalComponent";
import { FiInfo } from "react-icons/fi";
import { GrStatusInfo } from "react-icons/gr";
import Axios from "axios";

export const PermissionApproval = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [data, setData] = useState([]);

  const openModal = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRowData({});
    setIsModalOpen(false);
  };

  const columns = [
    { Header: "SNo", accessor: "id" },
    { Header: "Date", accessor: "permissiondate" },
    { Header: "From Time", accessor: "fromhour" },
    { Header: "To Time", accessor: "tohour" },
    { Header: "Total Hrs", accessor: "totalhours" },
    { Header: "Notes", accessor: "notes" },
    { Header: "Notify", accessor: "remarks" },
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

  // const data = [
  //   {
  //     sno: "1",
  //     date: "25/11/2022",
  //     fromTime: "12:30PM",
  //     toTime: "2:30PM",
  //     totalHrs: "2Hrs",
  //     notes: "For Emergency Purpose",
  //     notify: "Karupu",
  //   },
  //   {
  //     sno: "1",
  //     date: "02/08/2023",
  //     fromTime: "03:30PM",
  //     toTime: "5:30PM",
  //     totalHrs: "2Hrs",
  //     notes: "For Emergency Purpose",
  //     notify: "Cesil",
  //   },
  //   // Add more data rows as needed
  // ];

  useEffect(() => {
    // 👆 daisy UI themes initialization
    getAllState();
  }, []);

  const getAllState = () => {
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
          setData(response.data.paramObjectsMap.PermissionRequestVO);
          // handleView();
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error saving data:", error);
        });
    }
  };

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

export default PermissionApproval;
