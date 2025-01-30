import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import "react-tabs/style/react-tabs.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import ToastComponent from "../../../utils/ToastComponent";

function NewDesignation({ newDesignation }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [designation, setDesignation] = useState("");
  const [designationCode, setDesignationCode] = useState("");
  const [errors, setErrors] = React.useState({});
  const [active, setActive] = useState(true);
  const [savedData, setSavedData] = React.useState("");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [createdBy, setCreatedBy] = React.useState(
    localStorage.getItem("userDetails")
  );
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [errorType, setErrorType] = useState("");

  const handleDesignation = (event) => {
    setDesignation(event.target.value);
  };
  const handleDesignationCode = (event) => {
    setDesignationCode(event.target.value);
  };
  const handleActive = (event) => {
    setActive(event.target.checked);
  };

  const handleCloseDesignation = () => {
    newDesignation(false);
  };

  const handleNew = () => {
    setDesignation("");
    setDesignationCode("");
  };

  const handleValidation = () => {
    const newErrors = {};

    if (designation.trim() === "") {
      newErrors.designation = "designation is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (handleValidation()) {
      const dataToSave = {
        designation: designation,
        designationCode: designationCode,
        active: active,
        orgId: orgId,
        createdBy: createdBy,
      };

      console.log("test", dataToSave);

      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        Axios.put(
          `${process.env.REACT_APP_API_URL}/api/masterController/createUpdateLeaveDeatils`,
          dataToSave,
          { headers }
        )
          .then((response) => {
            console.log("designation Created successfully:", response.data);
            setSavedData(response.data);
            handleNew();
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
      } else {
        console.error("User is not authenticated. Please log in.");
      }
    }
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-between">
            <h1 className="text-xl font-semibold mb-3">New Designation</h1>
            <IoMdClose
              onClick={handleCloseDesignation}
              type="button"
              className="cursor-pointer w-8 h-8 ml-auto"
            />
          </div>
          <div className="row d-flex mt-3">
            <div className="col-md-4 mb-3">
              <FormControl fullWidth variant="filled">
                <TextField
                  id="designation"
                  label="Designation"
                  size="small"
                  value={designation}
                  onChange={handleDesignation}
                  error={Boolean(errors.designation)}
                  inputProps={{ maxLength: 30 }}
                />
              </FormControl>
            </div>

            <div className="col-md-4 mb-3">
              <FormControl fullWidth variant="filled">
                <TextField
                  id="designationCode"
                  label="Designation Code"
                  size="small"
                  value={designationCode}
                  onChange={handleDesignationCode}
                  error={Boolean(errors.designationCode)}
                  inputProps={{ maxLength: 30 }}
                />
              </FormControl>
            </div>
            
            <div className="col-md-4 mb-3">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={active} onChange={handleActive} />
                  }
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
              onClick={handleNew}
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

export default NewDesignation;
