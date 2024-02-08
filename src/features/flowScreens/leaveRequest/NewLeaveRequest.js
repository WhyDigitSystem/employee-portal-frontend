import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import ToastComponent from "../../../utils/ToastComponent";

const errorInputStyle = {
  border: "1px solid red",
};
function NewLeaveRequest({ newLeaveRequest }) {
  const [searchValue, setSearchValue] = useState("");
  const [savedData, setSavedData] = React.useState();
  const [empName, setEmpName] = React.useState(localStorage.getItem("empname"));
  const [empCode, setEmpCode] = React.useState(localStorage.getItem("empcode"));

  const [options, setOptions] = useState([
    "Karupu",
    "Cesil",
    "Karthi",
    "Guhan",
    "Vasanth",
  ]);
  const [errors, setErrors] = React.useState({});

  const [from, setFrom] = React.useState(null);
  const [to, setTo] = React.useState(null);
  const [tot, setTot] = React.useState("");
  const [leaveType, setLeaveType] = React.useState("");
  const [selectLeave, setSelectLeave] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [showLeaveTypeField, setShowLeaveTypeField] = useState(false);
  const [notification, setNotification] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [errorType, setErrorType] = React.useState("");

  useEffect(() => {
    if (from && to && from === to) {
      setShowLeaveTypeField(true);
    } else {
      setShowLeaveTypeField(false);
    }
  }, [from, to]);

  const handleFrom = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setFrom(formattedDate);
  };

  const handleNotes = (event) => {
    setNotes(event.target.value);
  };
  const handleLeaveType = (event) => {
    setLeaveType(event.target.value);
  };

  const handleSelectLeave = (event) => {
    const selectedLeave = event.target.value;
    setSelectLeave(selectedLeave);

    // Update tot based on selected leave type
    if (selectedLeave === "1st Half") {
      setTot("0.5");
    }
    if (selectedLeave === "2nd Half") {
      setTot("0.5");
    }
    if (selectedLeave === "Full Day") {
      setTot("1");
    }
  };

  const handleTo = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setTo(formattedDate);

    const daysDifference = dayjs(formattedDate).diff(dayjs(from), "day") + 1;
    setTot(String(daysDifference));
  };

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
  };

  const handleCloseNewLeave = () => {
    newLeaveRequest(false);
  };

  const handleNew = () => {
    setFrom(null);
    setTo(null);
    setTot("");
    setLeaveType("");
    setNotes("");
    setSearchValue("");
  };

  const handleValidation = () => {
    const newErrors = {};

    if (!from) {
      newErrors.from = "From Date is required";
    }
    if (!to) {
      newErrors.to = "To Date is required";
    }
    if (leaveType === "") {
      newErrors.leaveType = "Leave Type is required";
    }
    if (!notes) {
      newErrors.notes = "Notes is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    handleValidation();
    if (handleValidation()) {
      const dataToSave = {
        empcode: empCode,
        empname: empName,
        fromdate: from,
        todate: to,
        totaldays: tot,
        leavetype: leaveType,
        notes: notes,
        notifyto: searchValue,
        status: "Pending",
      };

      console.log("test", dataToSave);

      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        Axios.post(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/leaverequest`,
          dataToSave,
          { headers }
        )
          .then((response) => {
            console.log("Data saved successfully:", response.data);
            setSavedData(response.data);
            handleNew();
            //handleCloseNewLeave();
            setMessage(response.data.paramObjectsMap.message);
            setErrorType("success");
            setNotification(true);
          })
          .catch((error) => {
            console.error("Error saving data:", error);
            setMessage("Error: Leave Request not Raise");
            setErrorType("error");
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
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-3">Leave Request</h1>
          <IoMdClose
            onClick={handleCloseNewLeave}
            type="button"
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>

        <div className="row d-flex mt-3">
          {/* FROM DATE FIELD */}
          <div className="col-md-4 mb-3">
            <FormControl fullWidth variant="filled">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From"
                  slotProps={{
                    textField: { size: "small", clearable: true },
                  }}
                  value={from}
                  onChange={handleFrom}
                  format="DD/MM/YYYY"
                />

                {errors.from && (
                  <span className="text-red-500">{errors.from}</span>
                )}
              </LocalizationProvider>
            </FormControl>
          </div>
          {/* TO DATE FIELD */}
          <div className="col-md-4 mb-3">
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="To"
                  slotProps={{
                    textField: { size: "small", clearable: true },
                  }}
                  value={to}
                  onChange={handleTo}
                  format="DD/MM/YYYY"
                />
                {errors.to && <span className="text-red-500">{errors.to}</span>}
              </LocalizationProvider>
            </FormControl>
          </div>
          {/* HALF OR FULL DAY FIELD */}

          {/* <div className="col-md-4 mb-3">
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Leave Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Leave"
                value={selectLeave}
                onChange={handleSelectLeave}
                //error={Boolean(errors.leaveType)}
              >
                <MenuItem value={"1st Half"}>1st Half</MenuItem>
                <MenuItem value={"2nd Half"}>2nd Half</MenuItem>
                <MenuItem value={"Full Day"}>Full Day</MenuItem>
              </Select>
              {errors.selectLeave && (
                <span className="text-red-500">{errors.selectLeave}</span>
              )}
            </FormControl>
          </div> */}
          {showLeaveTypeField && from && to && (
            <div className="col-md-4 mb-3">
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Select Leave
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Leave"
                  value={selectLeave}
                  onChange={handleSelectLeave}
                  //error={Boolean(errors.leaveType)}
                >
                  <MenuItem value={"1st Half"}>1st Half</MenuItem>
                  <MenuItem value={"2nd Half"}>2nd Half</MenuItem>
                  <MenuItem value={"Full Day"}>Full Day</MenuItem>
                </Select>
                {errors.selectLeave && (
                  <span className="text-red-500">{errors.selectLeave}</span>
                )}
              </FormControl>
            </div>
          )}

          {/* TOTAL DAYS FIELD */}
          <div className="col-md-4 mb-3">
            <FormControl fullWidth variant="filled">
              <TextField
                id="totdays"
                label="Total Days"
                size="small"
                disabled
                value={tot}
              />
            </FormControl>
          </div>
          {/* LEAVE TYPE FIELD */}
          <div className="col-md-4 mb-3">
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Leave Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Leave Type"
                value={leaveType}
                onChange={handleLeaveType}
                //error={Boolean(errors.leaveType)}
              >
                <MenuItem value={"CL"}>CL</MenuItem>
                <MenuItem value={"PL"}>PL</MenuItem>
                {/* <MenuItem value={"Others"}>Others</MenuItem> */}
              </Select>
              {errors.leaveType && (
                <span className="text-red-500">{errors.leaveType}</span>
              )}
            </FormControl>
          </div>

          {/* NOTES FIELD */}
          <div className="col-md-4 mb-3">
            <FormControl fullWidth variant="filled">
              <TextField
                id="notes"
                label="Notes"
                size="small"
                multiline
                value={notes}
                onChange={handleNotes}
                //error={Boolean(errors.notes)}
              />
              {errors.notes && (
                <span className="text-red-500">{errors.notes}</span>
              )}
            </FormControl>
          </div>
          {/* NOTIFY FIELD */}
          <div className="col-md-4 mb-3">
            <FormControl fullWidth variant="filled">
              <Autocomplete
                //size="small"
                value={searchValue}
                onChange={handleSearchChange}
                error={Boolean(errors.searchValue)}
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nofity"
                    size="small"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <AiOutlineSearch style={{ marginRight: 8 }} />
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </FormControl>
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
            onClick={handleCloseNewLeave}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>

      {notification && <ToastComponent content={message} type={errorType} />}
    </>
  );
}
export default NewLeaveRequest;
