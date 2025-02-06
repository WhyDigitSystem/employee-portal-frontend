import Checkbox from "@mui/material/Checkbox";
import { FormControl, Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Axios from "axios";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import "react-tabs/style/react-tabs.css";
import CommonBulkUpload from "../../../utils/CommonBulkUpload";
import SampleFile from "../../../assets/SampleFile/Monthly Attendance.xlsx";
import ToastComponent from "../../../utils/ToastComponent";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export const NewSalaryProcess = ({ newSalaryProcess }) => {
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [loginEmpName, setLoginEmpName] = React.useState(
    localStorage.getItem("empname")
  );
  const [orgLeaveTypeList, setOrgLeaveTypeList] = useState([]);
  const [active, setActive] = useState(true);
  const [savedData, setSavedData] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  const [selectedRows, setSelectedRows] = useState([]); // Selected rows in modal
  const [modalVisible, setModalVisible] = useState(false);
  const [finalTableData, setFinalTableData] = useState([]); // Final selected data for main table

  const pwd = "Wds@2022";

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
  // const getAllEmployeeDetails = async () => {
  //   if (!month || !year) {
  //     alert("Please select both Month and Year");
  //     return;
  //   }

  //   const monthName = months[month - 1]; // Convert month number to name

  //   try {
  //     const response = await Axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/SalaryStructure/getEmployeeSalaryProcessDetails?month=${monthName}&orgId=${orgId}&year=${year}`
  //     );

  //     if (response.data.statusFlag === "Ok") {
  //       setData(
  //         response.data.paramObjectsMap.salaryProcessDetails.map((item) => ({
  //           empName: item.empName,
  //           empCode: item.empCode,
  //           monthTotalDays: item.monthTotalDays, // Days in Month
  //           effectiveWorkingDays: item.effectiveWorkingDays, // Total Working Days
  //           totalLeaves: item.totalLeaves, // No of Leaves
  //           lop: item.lop, // LOP
  //           grossPay: item.grossPay, // Gross Pay
  //           netPay: item.netPay, // Net Pay
  //           lopAmount: item.lopAmount,
  //           perDaySalary: item.perDaySalary,
  //         }))
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching Employee Leave Details:", error);
  //   }
  // };

  const getAllEmployeeDetails = async () => {
    if (!month || !year) {
      alert("Please select both Month and Year");
      return;
    }

    const monthName = months[month - 1];

    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/SalaryStructure/getEmployeeSalaryProcessDetails?month=${monthName}&orgId=${orgId}&year=${year}`
      );

      if (response.data.statusFlag === "Ok") {
        setData(
          response.data.paramObjectsMap.salaryProcessDetails.map((item) => ({
            empName: item.empName,
            empCode: item.empCode,
            monthTotalDays: item.monthTotalDays,
            effectiveWorkingDays: item.effectiveWorkingDays,
            totalLeaves: item.totalLeaves,
            lop: item.lop,
            grossPay: item.grossPay,
            netPay: item.netPay,
            lopAmount: item.lopAmount,
            perDaySalary: item.perDaySalary,
          }))
        );
        setSelectedRows([]); // Reset selection
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error fetching Employee Leave Details:", error);
    }
  };

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

  const handleSave = () => {
    if (!month || !year) {
      alert("Please select Month and Year before saving.");
      return;
    }

    const monthName = months[month - 1]; // Convert month number to name

    const dataToSave = data
      .filter((item) => selectedRows.includes(item.empCode)) // Only selected rows
      .map((item) => ({
        empCode: item.empCode,
        empName: item.empName,
        effectiveWorkingDays: parseInt(item.effectiveWorkingDays),
        grossPay: parseInt(item.grossPay),
        lop: parseInt(item.lop),
        lopAmount: parseInt(item.lopAmount),
        month: monthName,
        monthDays: parseInt(item.monthTotalDays),
        year: year,
        netPay: parseInt(item.netPay),
        totalLeaves: parseInt(item.totalLeaves),
        perDaySalary: parseInt(item.perDaySalary),
        orgId: parseInt(orgId),
      }));

    if (dataToSave.length === 0) {
      alert("Please select at least one employee to save.");
      return;
    }

    console.log("DataToSave:", dataToSave);

    const token = localStorage.getItem("token");
    if (token) {
      Axios.put(
        `${process.env.REACT_APP_API_URL}/api/SalaryStructure/createSalaryProcess`,
        dataToSave,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
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
          setMonth("");
          setYear("");
          setData([]);
          setFinalTableData([]);
          setSelectedRows([]);
          setErrorType("success");
          setMessage("Data saved successfully!");
          setNotification(true);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          setErrorType("error");
          setMessage("Data Not Saved!");
          setNotification(true);
        });
    }
  };

  const handleClosePermission = () => {
    newSalaryProcess(false);
  };

  const handleCancel = () => {
    setMonth("");
    setYear("");
    setData([]); // Clears the table data
    setFinalTableData([]);
    setFromDate(null); // Resets the From Date if needed
    setToDate(null); // Resets the To Date if needed
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 20 },
    (_, i) => new Date().getFullYear() - i
  ); // Last 20 years

  // Select/deselect all rows
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map((item) => item.empCode));
    } else {
      setSelectedRows([]);
    }
  };

  // Select/deselect individual row
  const handleRowSelect = (empCode) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(empCode)
        ? prevSelected.filter((code) => code !== empCode)
        : [...prevSelected, empCode]
    );
  };

  // Proceed with selected rows
  const handleProceed = () => {
    const selectedData = data.filter((item) =>
      selectedRows.includes(item.empCode)
    );
    setFinalTableData(selectedData); // Store only selected rows in main table
    setModalVisible(false);
  };

  return (
    <>
      <div>
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="row d-flex mt-3">
              {/* Month Dropdown */}
              <div className="col-md-3 mb-3">
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Select Month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    SelectProps={{ native: true }}
                    size="small"
                  >
                    <option value="">Select</option>
                    {months.map((m, index) => (
                      <option key={index} value={index + 1}>
                        {m}
                      </option>
                    ))}
                  </TextField>
                </FormControl>
              </div>

              {/* Year Dropdown */}
              <div className="col-md-3 mb-3">
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Select Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    SelectProps={{ native: true }}
                    size="small"
                  >
                    <option value="">Select</option>
                    {years.map((y, index) => (
                      <option key={index} value={y}>
                        {y}
                      </option>
                    ))}
                  </TextField>
                </FormControl>
              </div>
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
            {/* <div className="text-lg font-semibold text-gray-700 mt-4 mb-2">
              {toDate &&
                `${dayjs(toDate, "DD-MM-YYYY").format(
                  "MMMM YYYY"
                )}, Total Working Days: ${totalWorkingDays}`}
            </div> */}

            {/* Main Table (Only Selected Employees) */}
            <div className="mt-4">
              {/* <h4>Selected Employees</h4> */}
              <table className="w-full table-bordered">
                <thead>
                  <tr style={{ backgroundColor: "#626366", color: "white" }}>
                    <th className="py-3 px-4 text-left">Employee Name</th>
                    <th className="py-3 px-4 text-left">Employee Code</th>
                    <th className="py-3 px-4 text-center">Days in Month</th>
                    <th className="py-3 px-4 text-center">
                      Total Working Days
                    </th>
                    <th className="py-3 px-4 text-center">No of Leaves</th>
                    <th className="py-3 px-4 text-center">LOP</th>
                    <th className="py-3 px-4 text-center">Gross Pay</th>
                    <th className="py-3 px-4 text-center">Net Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {finalTableData.length > 0 ? (
                    finalTableData.map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="py-3 px-4 text-left">{row.empName}</td>
                        <td className="py-3 px-4 text-left">{row.empCode}</td>
                        <td className="py-3 px-4 text-center">
                          {row.monthTotalDays}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {row.effectiveWorkingDays}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {row.totalLeaves}
                        </td>
                        <td className="py-3 px-4 text-center">{row.lop}</td>
                        <td className="py-3 px-4 text-center">
                          {row.grossPay}
                        </td>
                        <td className="py-3 px-4 text-center">{row.netPay}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="py-3 px-4 text-center text-gray-500"
                      >
                        No data selected
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
      {/* Modal Dialog */}
      <Dialog
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Select Employees</DialogTitle>
        <DialogContent>
          <div className="overflow-x-auto shadow-lg rounded-lg mt-4">
            <table className="w-full table-bordered">
              <thead>
                <tr style={{ backgroundColor: "#626366", color: "white" }}>
                  <th className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedRows.length === data.length && data.length > 0
                      }
                      className="w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-4 text-left">Employee Name</th>
                  <th className="py-3 px-4 text-left">Employee Code</th>
                  <th className="py-3 px-4 text-center">Days in Month</th>
                  <th className="py-3 px-4 text-center">Total Working Days</th>
                  <th className="py-3 px-4 text-center">No of Leaves</th>
                  <th className="py-3 px-4 text-center">LOP</th>
                  <th className="py-3 px-4 text-center">Gross Pay</th>
                  <th className="py-3 px-4 text-center">Net Pay</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.empCode)}
                        onChange={() => handleRowSelect(row.empCode)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 text-left">{row.empName}</td>
                    <td className="py-3 px-4 text-left">{row.empCode}</td>
                    <td className="py-3 px-4 text-center">
                      {row.monthTotalDays}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.effectiveWorkingDays}
                    </td>
                    <td className="py-3 px-4 text-center">{row.totalLeaves}</td>
                    <td className="py-3 px-4 text-center">{row.lop}</td>
                    <td className="py-3 px-4 text-center">{row.grossPay}</td>
                    <td className="py-3 px-4 text-center">{row.netPay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProceed} color="primary" variant="contained">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>

      {notification && <ToastComponent content={message} type={errorType} />}
    </>
  );
};
export default NewSalaryProcess;
