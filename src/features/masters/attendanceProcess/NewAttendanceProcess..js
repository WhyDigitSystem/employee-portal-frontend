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

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
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

  const handleFromDate = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setFromDate(formattedDate);
  };
  const handleToDate = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setToDate(formattedDate);
  };
  const handleActive = (event) => {
    setActive(event.target.checked);
  };

  const handleNew = () => {
    setCompensatory("");
    setReportingPersonRole("");
    setActive(true);
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

  const handleSave = () => {
    console.log("handlesave is working");

    if (handleValidation()) {
      console.log("handle validation is working");

      const dataToSave = {
        // aadhar: aadharNo,
        // accountNo: accNo,
        // bankName: bank,
        // blood: bloodGroup,
        // branchId: branch,
        // createdby: loginEmpName,
        // department: dept,
        // designation: designation,
        // email: email,
        // empCode: empCode,
        // employeeName: employeeName,
        // gender: gender,
        // ifscCode: ifsc,
        // joiningDate: joinDate,
        // mobileNo: mobNo,
        // orgId: orgId,
        // pan: pan,
        // reportingPerson: reportPerson,
        // reportingPersonRole: reportingPersonRole,
        // resigningDate: resigningDate,
        // role: role,
        // alternateMobileNo: altMobNo,
        // active: active,
      };

      const dataToSaveUser = {
        // branchId: branch,
        // empcode: empCode,
        // employeeName: employeeName,
        // role: role,
        // email: email,
        // updatedby: loginEmpName,
        // createdby: loginEmpName,
        // password: encryptPassword(trimmedpwd),
      };

      console.log("DataToSave:", dataToSave);
      console.log("DataToSaveUser:", dataToSaveUser);

      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Execute both requests in parallel using Promise.all()
        Promise.all([
          Axios.put(
            `${process.env.REACT_APP_API_URL}/api/masterController/createUpdateEmployee`,
            dataToSave,
            { headers }
          ),
          Axios.post(
            `${process.env.REACT_APP_API_URL}/api/user/signup`,
            dataToSaveUser,
            { headers }
          ),
        ])
          .then(([employeeResponse, userResponse]) => {
            if (
              employeeResponse.data.statusFlag === "Error" ||
              userResponse.data.statusFlag === "Error"
            ) {
              console.error(
                "Backend error:",
                employeeResponse.data.paramObjectsMap?.errorMessage ||
                  userResponse.data.paramObjectsMap?.errorMessage
              );
              return; // Stop execution if there's an error
            }

            console.log("Employee Data Saved:", employeeResponse.data);
            console.log("User Data Saved:", userResponse.data);

            setSavedData(userResponse.data);
            handleNew();

            // Call handleLeaveAllocationSave() only after both requests succeed
            handleLeaveAllocationSave();
          })
          .catch((error) => {
            console.error("Error saving data:", error);
            alert("Error while saving data. Please try again.");
          });
      }
    }
  };

  const handleLeaveAllocationSave = () => {
    const dataToSaveLeaveAllocation = {
      orgId: orgId,
      casual: casual,
      sick: sick,
      annual: annual,
      maternity: maternity,
      paternity: paternity,
      parental: parental,
      bereavement: bereavement,
      compensatory: compensatory,
      updatedby: loginEmpName,
      createdby: loginEmpName,
    };

    console.log("DataToSaveLeaveAllocation:", dataToSaveLeaveAllocation);

    const token = localStorage.getItem("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      Axios.post(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/leaveEligible`,
        dataToSaveLeaveAllocation,
        { headers }
      )
        .then((response) => {
          if (response.data.statusFlag === "Error") {
            console.error(
              "Backend error:",
              response.data.paramObjectsMap?.errorMessage
            );
            return; // Stop execution if there's an error
          }

          console.log("Leave Allocation Data Saved:", response.data);
          setSavedData(response.data);

          // Clear token and reset form data only after success
          localStorage.removeItem("token");
          handleNew();
        })
        .catch((error) => {
          console.error("Error saving leave allocation data:", error);
        });
    }
  };

  const handleClosePermission = () => {
    newAttendanceProcess(false);
  };

  return (
    <>
      <div>
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-between">
              {/* <h1 className="text-xl font-semibold mb-3">New Employee</h1> */}
              {/* <IoMdClose
                type="button"
                className="cursor-pointer w-8 h-8 mb-3"
                onClick={handleClosePermission}
              /> */}
            </div>
            <div className="row d-flex mt-3">
              <div className="col-md-4 mb-3">
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="From Date"
                      slotProps={{
                        textField: { size: "small", clearable: true },
                      }}
                      value={fromDate}
                      onChange={handleFromDate}
                      // error={Boolean(errors.dob)}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>

              <div className="col-md-4 mb-3">
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="To Date"
                      slotProps={{
                        textField: { size: "small", clearable: true },
                      }}
                      value={toDate}
                      onChange={handleToDate}
                      // error={Boolean(errors.dob)}
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
            <div className="row d-flex mt-3">
              <div className="col-md-4 mb-3">
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={handleSearch}
                  className="self-center"
                >
                  Search
                </Button>
                <span className="ml-4">
                  <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    size="medium"
                    className="self-center"
                  >
                    Upload File
                    <input type="file" hidden onChange={handleFileUpload} />
                  </Button>
                </span>
              </div>
            </div>
            {data.length > 0 && (
              <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full border-collapse bg-white shadow-md rounded-md">
                  <thead>
                    <tr className="bg-blue-600 text-white">
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
                    {data.map((row, index) => (
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
                        <td className="py-3 px-4 text-center">{row.lop}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="d-flex flex-row mt-3">
              {/* <button
                type="button"
                onClick={handleSave}
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Save
              </button> */}
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleSearch}
                className="self-center"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewAttendanceProcess;
