import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Axios from "axios";

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

  const [selectedDate, setSelectedDate] = useState(null);
  const [fromTime, setFromTime] = useState(dayjs(""));
  const [toTime, setToTime] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [notes, setNotes] = useState("");
  const [searchValue, setSearchValue] = useState(null);

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
  };

  const handleClosePermission = () => {
    newPermissionRequest(false);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // const handleSelectedDate = (event) => {
  //   setSelectedDate(event.target.value);
  // };

  // const handleFromTime = (event) => {
  //   setFromTime(event.target.value);
  // };

  // const handleToTime = (event) => {
  //   setToTime(event.target.value);
  // };

  // const handleTotalHours = (event) => {
  //   setTotalHours(event.target.value);
  // };

  // const handleNotes = (event) => {
  //   setNotes(event.target.value);
  // };

  // const handleSearchValue = (event) => {
  //   setSearchValue(event.target.value);
  // };

  const handleNew = () => {
    setSelectedDate("");
    setFromTime("");
    setToTime("");
    setTotalHours("");
    setNotes("");
    setSearchValue("");
  };

  const handleSave = () => {
    // Create an object with the form data
    const dataToSave = {
      permissiondate: selectedDate,
      fromhour: fromTime,
      tohour: toTime,
      totalhours: totalHours,
      notes: notes,
      remarks: searchValue,
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
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error saving data:", error);
        });
    }
  };

  return (
    <div className="card w-full p-6 bg-base-100 shadow-xl">
      <div className="d-flex justify-content-between">
        <h1 className="text-xl font-semibold mb-3">New Permission Request</h1>
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
              />
            </LocalizationProvider>
          </FormControl>
        </div>

        {/* From Time Picker */}
        <div className="col-md-4 mb-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker", "TimePicker"]}>
              <TimePicker
                label="From"
                defaultValue={fromTime}
                slotProps={{ textField: { size: "small" } }}
                onChange={(newValue) => setFromTime(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        {/* To Time Picker */}
        <div className="col-md-4 mb-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker", "TimePicker"]}>
              <TimePicker
                label="To"
                value={toTime}
                onChange={(newValue) => setToTime(newValue)}
                slotProps={{ textField: { size: "small" } }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        {/* Total Hours TextField */}
        <div className="col-md-4 mb-3">
          <FormControl fullWidth variant="filled">
            <TextField
              id="tothrs"
              label="Total Hours"
              size="small"
              value={totalHours}
              onChange={(e) => setTotalHours(e.target.value)}
            />
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
          </FormControl>
        </div>

        {/* Autocomplete */}
        <div className="col-md-4 mb-3">
          <Autocomplete
            style={{ marginRight: 13, marginLeft: -10 }}
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
