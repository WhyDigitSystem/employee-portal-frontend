import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
//import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

function NewPermissionRequest({ newPermissionRequest }) {
  // const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState([
    "Karupu",
    "Cesil",
    "Karthi",
    "Guhan",
    "Vasanth",
  ]);

  const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));
  const [add, setAdd] = React.useState(false);
  const [stateCode, setStateCode] = React.useState("");
  const [savedData, setSavedData] = React.useState();
  const [errors, setErrors] = React.useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [totalHours, setTotalHours] = useState("");
  const [notes, setNotes] = useState("");
  const [searchValue, setSearchValue] = useState(null);
  const [empcode, setEmpCode] = React.useState(localStorage.getItem("empcode"));
  const [empname, setEmpName] = React.useState(localStorage.getItem("empname"));

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
  };

  const handleClosePermission = () => {
    newPermissionRequest(false);
  };

  const handleDateChange = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
  };

  const handleFromTime = (selectedDate) => {
    // Parse the selected date using dayjs
    const originalDate = dayjs(selectedDate);

    // Get hours and minutes
    const hours = originalDate.hour();
    const minutes = originalDate.minute();

    // Check if the selected time is within the allowed range (9:00 AM to 7:00 PM)
    if (hours < 9 || (hours === 9 && minutes < 0) || hours >= 19) {
      // If the selected time is outside the allowed range, display an error message
      setErrors({
        ...errors,
        fromTime: "Only Allow 9AM to 7PM",
      });
      // Clear the fromTime state to prevent setting an invalid time
      setFromTime(null);
    } else {
      // If the selected time is within the allowed range, update the state
      const formattedTime = originalDate.format("HH:mm:ss");
      setFromTime(formattedTime);
      // Clear the error message for fromTime if it was previously set
      setErrors({
        ...errors,
        fromTime: null,
      });
    }
  };

  const handleToTime = (selectedDate) => {
    const originalDate = dayjs(selectedDate);

    // Get hours, minutes, and seconds
    const hours = originalDate.format("HH");
    const minutes = originalDate.format("mm");
    const seconds = originalDate.format("ss");

    // Formatted time string
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    console.log("Selected to time:", formattedTime);

    // Update state
    setToTime(formattedTime);

    // Calculate time difference
    const fromDateTime = dayjs(fromTime, "HH:mm:ss");
    const toDateTime = dayjs(formattedTime, "HH:mm:ss");
    const duration = toDateTime.diff(fromDateTime, "minute"); // Difference in minutes

    // Extract hours and minutes
    const durationHours = Math.floor(duration / 60);
    const durationMinutes = duration % 60;

    // Update totalHours state
    setTotalHours(`${durationHours}:${durationMinutes}`);
  };

  const handleNew = () => {
    setSelectedDate("");
    setFromTime("");
    setToTime("");
    setTotalHours("");
    setNotes("");
    setSearchValue("");
  };

  const handleValidation = () => {
    const newErrors = {};

    if (!selectedDate) {
      newErrors.selectedDate = "Date is Required";
    }
    if (!fromTime) {
      newErrors.fromTime = "From Time is Required";
    }
    if (!toTime) {
      newErrors.toTime = "To Time is Required";
    }
    if (!notes) {
      newErrors.notes = "Notes is Required";
    }
    if (totalHours) {
      const [hours, minutes] = totalHours.split(":").map(Number);
      const totalMinutes = hours * 60 + minutes;
      if (totalMinutes > 120) {
        // 120 minutes = 2 hours
        newErrors.totalHours = "Total Hours cannot exceed 2 hours";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (handleValidation()) {
      const dataToSave = {
        permissiondate: selectedDate,
        fromhour: fromTime,
        tohour: toTime,
        totalhours: totalHours,
        notes: notes,
        remarks: searchValue,
        totalhours: totalHours,
        createdby: empcode,
        updatedby: empcode,
        empcode: empcode,
        empname: empname,
        status: "Pending",
      };
      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        // Make a POST request to your API endpoint to save the data
        Axios.post(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/permissionRequest`,
          dataToSave,
          { headers }
        )
          .then((response) => {
            console.log("Data saved successfully:", response.data);
            setSavedData(response.data);
            handleNew();
            handleClosePermission();
          })
          .catch((error) => {
            // Handle errors here
            console.error("Error saving data:", error);
          });
      } else {
        console.error("User is not authenticated. Please log in.");
      }
    }
  };

  return (
    <div className="card w-full p-6 bg-base-100 shadow-xl">
      <div className="d-flex justify-content-between">
        <h1 className="text-xl font-semibold mb-3">Permission Request</h1>
        <IoMdClose
          onClick={handleClosePermission}
          type="button"
          className="cursor-pointer w-8 h-8 mb-3"
        />
      </div>

      <div className="row d-flex mt-3">
        {/* Date Picker */}
        <div className="col-md-4 mb-3">
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                slotProps={{
                  textField: { size: "small", clearable: true },
                }}
                value={selectedDate}
                onChange={handleDateChange}
                format="DD/MM/YYYY"
                //error={Boolean(errors.selectedDate)}
              />
              {errors.selectedDate && (
                <span className="text-red-500">{errors.selectedDate}</span>
              )}
            </LocalizationProvider>
          </FormControl>
        </div>

        {/* From Time Picker */}
        <div className="col-md-4 mb-3">
          <FormControl fullWidth variant="filled">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DemoContainer components={["TimePicker", "TimePicker"]}> */}
              <TimePicker
                label="From"
                defaultValue={fromTime}
                slotProps={{ textField: { size: "small" } }}
                onChange={handleFromTime}
              />
              {/* </DemoContainer> */}
              {errors.fromTime && (
                <span className="text-red-500">{errors.fromTime}</span>
              )}
            </LocalizationProvider>
          </FormControl>
        </div>

        {/* To Time Picker */}
        <div className="col-md-4 mb-3">
          <FormControl fullWidth variant="filled">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DemoContainer components={["TimePicker", "TimePicker"]}> */}
              <TimePicker
                label="To"
                value={toTime}
                onChange={handleToTime}
                slotProps={{ textField: { size: "small" } }}
              />
              {/* </DemoContainer> */}
              {errors.toTime && (
                <span className="text-red-500">{errors.toTime}</span>
              )}
            </LocalizationProvider>
          </FormControl>
        </div>

        {/* Total Hours TextField */}
        <div className="col-md-4 mb-3">
          <FormControl fullWidth variant="filled">
            <TextField
              id="tothrs"
              label="Total Hours"
              size="small"
              value={totalHours}
              disabled
            />
            {errors.totalHours && (
              <span className="text-red-500">{errors.totalHours}</span>
            )}
          </FormControl>
        </div>

        {/* Notes TextField */}
        <div className="col-md-4 mb-3">
          <FormControl fullWidth variant="filled">
            <TextField
              id="notes"
              label="Notes"
              size="small"
              multiline
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              inputProps={{ maxLength: 100 }}
            />
            {errors.notes && (
              <span className="text-red-500">{errors.notes}</span>
            )}
          </FormControl>
        </div>

        {/* Autocomplete */}
        <div className="col-md-4 mb-3">
          <FormControl fullWidth variant="filled">
            <Autocomplete
              // style={{ marginRight: 13, marginLeft: 0 }}
              value={searchValue}
              onChange={handleSearchChange}
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Notify"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <AiOutlineSearch style={{ marginLeft: 8 }} />
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
          onClick={handleClosePermission}
          className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default NewPermissionRequest;
