import Checkbox from "@mui/material/Checkbox";
import { FormControl, Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Axios from "axios";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import "react-tabs/style/react-tabs.css";
import { encryptPassword } from "../../user/components/utils";
import CommonBulkUpload from "../../../utils/CommonBulkUpload";
import SampleFile from "../../../assets/SampleFile/Monthly Attendance.xlsx";

export const NewAttendanceProcess = ({ newAttendanceProcess }) => {
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [loginEmpName, setLoginEmpName] = React.useState(
    localStorage.getItem("empname")
  );
  const [reportingPersonRole, setReportingPersonRole] = React.useState("");
  const [reportPersonOptions, setReportPersonOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  // LEAVE PROCESS FIELDS
  const [casual, setCasual] = useState("");
  const [sick, setSick] = useState("");
  const [annual, setAnnual] = useState("");
  const [maternity, setMaternity] = useState("");
  const [paternity, setPaternity] = useState("");
  const [parental, setParental] = useState("");
  const [bereavement, setBereavement] = useState("");
  const [compensatory, setCompensatory] = useState("");
  const [orgLeaveTypeList, setOrgLeaveTypeList] = useState([]);
  const [active, setActive] = useState(true);
  const [savedData, setSavedData] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [totalWorkingDays, setTotalWorkingDays] = useState(0);
  const [uploadOpen, setUploadOpen] = useState(false);

  const pwd = "Wds@2022";
  const trimmedpwd = pwd.trim();

  const handleSearch = () => {
    // Mock data for demonstration
    setData([
      { name: "John Doe", code: "EMP001", leaves: 2, workingDays: 20, lop: 1 },
      {
        name: "Jane Smith",
        code: "EMP002",
        leaves: 1,
        workingDays: 21,
        lop: 0,
      },
      {
        name: "Michael Johnson",
        code: "EMP003",
        leaves: 3,
        workingDays: 19,
        lop: 2,
      },
    ]);
  };

  const handleBulkUploadOpen = () => {
    setUploadOpen(true);
  };

  const handleBulkUploadClose = () => {
    setUploadOpen(false);
  };

  const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
  };

  const handleSubmit = () => {
    console.log("Submit clicked");
    handleBulkUploadClose();
  };

  const handleLopChange = (index, newValue) => {
    const updatedData = [...data];
    updatedData[index].lop = newValue;
    setData(updatedData);
  };

  useEffect(() => {
    getLeaveTypeName();
  }, []);

  const getLeaveTypeName = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/getLeaveTypeNameByOrgId?orgId=${orgId}`
      );
      if (response.data.statusFlag === "Ok") {
        setOrgLeaveTypeList(response.data.paramObjectsMap.leaveType);
        console.log(response.data.paramObjectsMap.leaveType);
      }
    } catch (error) {
      console.error("Error fetching Leave Types:", error);
    }
  };
  const getAllEmployeeDetails = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both From Date and To Date");
      return;
    }

    // Convert DD-MM-YYYY to YYYY-MM-DD
    const formattedFromDate = dayjs(fromDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const formattedToDate = dayjs(toDate, "DD-MM-YYYY").format("YYYY-MM-DD");

    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/masterController/getAttendanceDetailsOfEmpForMonth?fromDate=${formattedFromDate}&orgId=${orgId}&toDate=${formattedToDate}`
      );

      if (response.data.statusFlag === "Ok") {
        setTotalWorkingDays(
          response.data.paramObjectsMap.attendanceDetails[0]?.totalDays || 0
        );
        setData(
          response.data.paramObjectsMap.attendanceDetails.map((item) => ({
            name: item.empName,
            code: item.empCode,
            leaves: item.consumedLeave,
            workingDays: item.precentDays,
            lop: item.totalDays - item.precentDays,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching Employee Leave Details:", error);
    }
  };

  // const handleFromDate = (newDate) => {
  //   const originalDateString = newDate;
  //   const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
  //   setFromDate(formattedDate);
  // };
  // const handleToDate = (newDate) => {
  //   const originalDateString = newDate;
  //   const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
  //   setToDate(formattedDate);
  // };

  const handleFromDate = (newDate) => {
    setFromDate(newDate ? dayjs(newDate).format("DD-MM-YYYY") : null);
  };

  const handleToDate = (newDate) => {
    setToDate(newDate ? dayjs(newDate).format("DD-MM-YYYY") : null);
  };

  const handleActive = (event) => {
    setActive(event.target.checked);
  };

  const handleNew = () => {
    setFromDate(null);
    setToDate(null);
    setData([]);
  };

  const handleValidation = () => {
    const newErrors = {};
    // if (role.trim() === "") {
    //   newErrors.role = "Role is required";
    // }
    // if (email.trim() === "") {
    //   newErrors.email = "Phone Number is required";
    // }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // const handleSave = () => {
  //   console.log("handlesave is working");

  //   if (handleValidation()) {
  //     console.log("handle validation is working");

  //     const dataToSave = {
  //       branch: null,
  //       branchCode: null,
  //       empCode: empCode,
  //       empName: empName,
  //       lop: lop,
  //       presentDays: precentDays,
  //       salaryMonth: dept,
  //       totalDays: totalDays,
  //       totalLeaves: consumedLeave,
  //       year: empCode,
  //       orgId: orgId,
  //     };

  //     console.log("DataToSave:", dataToSave);

  //     const token = localStorage.getItem("token");

  //     if (token) {
  //       const headers = {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       };

  //       // Execute both requests in parallel using Promise.all()
  //       Promise.all([
  //         Axios.put(
  //           `${process.env.REACT_APP_API_URL}/api/masterController/createUpdateEmployee`,
  //           dataToSave,
  //           { headers }
  //         ),
  //       ])
  //         .then(([employeeResponse, userResponse]) => {
  //           if (
  //             employeeResponse.data.statusFlag === "Error" ||
  //             userResponse.data.statusFlag === "Error"
  //           ) {
  //             console.error(
  //               "Backend error:",
  //               employeeResponse.data.paramObjectsMap?.errorMessage ||
  //                 userResponse.data.paramObjectsMap?.errorMessage
  //             );
  //             return; // Stop execution if there's an error
  //           }

  //           console.log("Employee Data Saved:", employeeResponse.data);
  //           console.log("User Data Saved:", userResponse.data);

  //           setSavedData(userResponse.data);
  //           handleNew();
  //         })
  //         .catch((error) => {
  //           console.error("Error saving data:", error);
  //           alert("Error while saving data. Please try again.");
  //         });
  //     }
  //   }
  // };

  const handleSave = () => {
    console.log("handlesave is working");

    if (handleValidation()) {
      console.log("handle validation is working");

      if (!toDate) {
        alert("Please select a To Date before saving.");
        return;
      }

      const parsedToDate = dayjs(toDate, "DD-MM-YYYY");

      const salaryMonth = parsedToDate.format("MMMM"); // Month Name (e.g., "January")
      const year = parsedToDate.format("YYYY"); // Year (e.g., "2024")

      // Prepare data from the existing state (data from getAllEmployeeDetails)
      const dataToSave = data.map((item) => ({
        branch: null,
        branchCode: null,
        empCode: item.code, // Employee Code from API data
        empName: item.name, // Employee Name from API data
        lop: item.lop, // LOP entered by the user
        orgId: orgId,
        presentDays: item.workingDays, // Present Days from API data
        salaryMonth: salaryMonth,
        totalDays: totalWorkingDays, // Total working days from API response
        totalLeaves: item.leaves, // Leaves taken from API data
        year: year, // Extracted year from toDate
      }));

      console.log("DataToSave:", dataToSave);

      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        Axios.put(
          `${process.env.REACT_APP_API_URL}/api/salaryMaster/createMonthlyAttendance`,
          dataToSave,
          { headers }
        )
          .then((response) => {
            if (response.data.statusFlag === "Error") {
              console.error(
                "Backend error:",
                response.data.paramObjectsMap?.errorMessage
              );
              return;
            }

            console.log("Employee Data Saved:", response.data);
            setSavedData(response.data);
            handleNew();
          })
          .catch((error) => {
            console.error("Error saving data:", error);
            alert("Error while saving data. Please try again.");
          });
      }
    }
  };

  const handleClosePermission = () => {
    newAttendanceProcess(false);
  };

  const handleCancel = () => {
    setData([]); // Clears the table data
    setTotalWorkingDays(0); // Resets total working days
    setFromDate(null); // Resets the From Date if needed
    setToDate(null); // Resets the To Date if needed
  };

  return (
    <>
      <div>
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="row d-flex mt-3">
              <div className="col-md-3 mb-3">
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="From Date"
                      format="DD-MM-YYYY"
                      value={fromDate ? dayjs(fromDate, "DD-MM-YYYY") : null} // Convert string back to Dayjs
                      onChange={handleFromDate}
                      slotProps={{
                        textField: { size: "small", clearable: true },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>

              <div className="col-md-3 mb-3">
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="To Date"
                      format="DD-MM-YYYY"
                      value={toDate ? dayjs(toDate, "DD-MM-YYYY") : null} // Convert string back to Dayjs
                      onChange={handleToDate}
                      slotProps={{
                        textField: { size: "small", clearable: true },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>

              {/* <div className="col-md-4 mb-3">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={active} onChange={handleActive} />
                    }
                    label="Active"
                  />
                </FormGroup>
              </div> */}
            </div>
            <div className="d-flex flex-wrap justify-start mt-3 gap-4">
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={getAllEmployeeDetails}
                className="self-center"
              >
                Search
              </Button>
              <Button
                variant="contained"
                component="label"
                color="primary"
                size="medium"
                className="self-center"
                onClick={handleBulkUploadOpen}
              >
                Upload File
                {/* <input type="file" hidden onChange={handleBulkUploadOpen} /> */}
              </Button>
            </div>
            {/* </span> */}
            {uploadOpen && (
              <CommonBulkUpload
                open={uploadOpen}
                handleClose={handleBulkUploadClose}
                title="Upload Files"
                uploadText="Upload file"
                downloadText="Sample File"
                fileName="Monthly Attendance.xlsx"
                onSubmit={handleSubmit}
                sampleFileDownload={SampleFile}
                handleFileUpload={handleFileUpload}
                apiUrl={`/salaryMaster/excelUploadForMonthlyAttendance`}
                screen="PutAway"
                orgId={orgId}
              />
            )}
          </div>
          {/* {data.length > 0 && ( */}
          <div>
            <div className="text-lg font-semibold text-gray-700 mt-4 mb-2">
              {toDate &&
                `${dayjs(toDate, "DD-MM-YYYY").format(
                  "MMMM YYYY"
                )}, Total Working Days: ${totalWorkingDays}`}
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg">
              <table className="w-full table-bordered">
                <thead>
                  <tr
                    className="text-white"
                    style={{ backgroundColor: "#626366" }}
                  >
                    <th className="py-3 px-4 text-left">Employee Name</th>
                    <th className="py-3 px-4 text-left">Employee Code</th>
                    <th className="py-3 px-4 text-center">No Of Leaves</th>
                    <th className="py-3 px-4 text-center">
                      No of Working Days
                    </th>
                    <th className="py-3 px-4 text-center">LOP</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="py-3 px-4 text-left">{row.name}</td>
                        <td className="py-3 px-4 text-left">{row.code}</td>
                        <td className="py-3 px-4 text-center">{row.leaves}</td>
                        <td className="py-3 px-4 text-center">
                          {row.workingDays}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="number"
                            value={row.lop}
                            onChange={(e) =>
                              handleLopChange(index, e.target.value)
                            }
                            className="border p-1 w-16 text-center"
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-3 px-4 text-center text-gray-500"
                      >
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-start mt-3 gap-4">
            <Button
              variant="outlined"
              color="primary"
              size="medium"
              onClick={handleCancel}
              className="self-center"
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleSave}
              className="self-center"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewAttendanceProcess;
