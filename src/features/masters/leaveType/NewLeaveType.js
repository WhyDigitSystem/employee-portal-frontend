import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import "react-tabs/style/react-tabs.css";
import ToastComponent from "../../../utils/ToastComponent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function NewLeaveType({ newLeaveType }) {
  const [leaveCode, setLeaveCode] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [leaveapplicable, setLeaveapplicable] = useState("");
  const [totLeave, setTotLeave] = useState("");
  const [errors, setErrors] = React.useState({});
  const [savedData, setSavedData] = React.useState("");
  const [notification, setNotification] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [errorType, setErrorType] = React.useState("");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [loginEmpName, setLoginEmpName] = React.useState(localStorage.getItem("empname"));


  const handleLeaveCode = (event) => {
    setLeaveCode(event.target.value);
  };
  const handleLeaveType = (event) => {
    setLeaveType(event.target.value);
  };
  const handleLeaveapplicable = (event) => {
    setLeaveapplicable(event.target.value);
  };
  const handleTotLeave = (event) => {
    setTotLeave(event.target.value);
  };

  const buttonStyle = {
    fontSize: "20px", // Adjust the font size as needed save
  };

  const handleCloseNewLeaveType = () => {
    newLeaveType(false);
  };

  const handleNew = () => {
    setLeaveCode("");
    setLeaveType("");
    setLeaveapplicable("");
    setTotLeave("");
  };

  const handleValidation = () => {
    const newErrors = {};

    if (leaveCode === "") {
      newErrors.leaveCode = "Leave Code is required";
    }

    if (leaveType === "") {
      newErrors.leaveType = "Leave Type is required";
    }

    if (leaveapplicable === "") {
      newErrors.leaveapplicable = "Leave Applicable is required";
    }

    if (totLeave === "") {
      newErrors.totLeave = "Total Leave is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    handleValidation()
    if (handleValidation()) {
      const dataToSave = {
        orgId: orgId,
        leave_code: leaveCode,
        leave_type: leaveType,
        applicable: leaveapplicable,
        total_leave: totLeave,
        createdby: loginEmpName,
        updatedby: loginEmpName,
      };

      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        Axios.post(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/leavetype`,
          dataToSave,
          { headers }
        )
          .then((response) => {
            console.log("Data saved successfully:", response.data);
            setSavedData(response.data);
            handleNew();
            setMessage(response.data.paramObjectsMap.message);
            setErrorType("success");
            setNotification(true);
          })
          .catch((error) => {
            console.error("Error saving data:", error);
            setMessage(error.message);
            setErrorType("error");
            setNotification(true);
          });
      } else {
        console.error("User is not authenticated. Please log in.");
        //setNotification(true);
      }
    }
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-between">
            <h1 className="text-xl font-semibold mb-3">New Leave Type</h1>
            <IoMdClose
              onClick={handleCloseNewLeaveType}
              type="button"
              className="cursor-pointer w-8 h-8 ml-auto"
            />
          </div>
          <div className="row d-flex mt-3">
            <div className="col-md-4">
              <FormControl fullWidth variant="filled">
                <TextField
                  id="leavecode"
                  label="Leave Code"
                  size="small"
                  value={leaveCode}
                  onChange={handleLeaveCode}
                  // error={Boolean(errors.leaveCode)}
                  inputProps={{ maxLength: 30 }}

                />
                {errors.leaveCode && (
                  <span className="text-red-500">{errors.leaveCode}</span>
                )}
              </FormControl>
            </div>
            <div className="col-md-4">
              <FormControl fullWidth variant="filled">
                <TextField
                  id="leaveType"
                  label="Leave Type"
                  size="small"
                  value={leaveType}
                  onChange={handleLeaveType}
                  //error={Boolean(errors.leaveType)}
                  inputProps={{ maxLength: 30 }}
                />
                {errors.leaveType && (
                  <span className="text-red-500">{errors.leaveType}</span>
                )}
              </FormControl>
            </div>

            {/* LEAVE TYPE FIELD */}
            <div className="col-md-4 mb-3">
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Leave Applicable</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Leave Applicable"
                  value={leaveapplicable}
                  onChange={handleLeaveapplicable}

                >
                  <MenuItem value={"ALL"}>All</MenuItem>
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
                {errors.leaveapplicable && (
                  <span className="text-red-500">{errors.leaveapplicable}</span>
                )}
              </FormControl>
            </div>

            <div className="col-md-4">
              <FormControl fullWidth variant="filled">
                <TextField
                  id="totalLeave"
                  label="Total Leave"
                  size="small"
                  value={totLeave}
                  onChange={handleTotLeave}
                  //error={Boolean(errors.totLeave)}
                  inputProps={{ maxLength: 30 }}
                />
                {errors.totLeave && (
                  <span className="text-red-500">{errors.totLeave}</span>
                )}
              </FormControl>
            </div>
            <div className="col-md-4 mb-3">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Active"
                />
              </FormGroup>
            </div>
          </div>

          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCloseNewLeaveType}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {notification && <ToastComponent content={message} type={errorType} />}
    </>
  );
}

export default NewLeaveType;
