import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const errorInputStyle = {
  border: "1px solid red",
};
function NewLeaveRequest({ newLeaveRequest }) {
  const [searchValue, setSearchValue] = useState("");
  const [savedData, setSavedData] = React.useState();

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

  const [notes, setNotes] = React.useState("");

  const handleFrom = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setFrom(formattedDate);
  };
  const handleNotes = (event) => {
    setNotes(event.target.value);
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
    setNotes("");
    setSearchValue("");
  };

  const handleValidation = () => {
    const newErrors = {};

    if (!from) {
      newErrors.from = "Start date is required";
    }

    if (!to) {
      newErrors.to = "End date is required";
    }

    if (!notes) {
      newErrors.notes = "Address is required";
    }

    if (!searchValue) {
      newErrors.searchValue = "City is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    console.log("test");
    if (handleValidation()) {
      // Replace this with your logic to save the data to a backend or database
      const dataToSave = {
        fromdate: from,
        todate: to,
        totaldays: tot,
        notes: notes,
        notifyto: searchValue,
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
          })
          .catch((error) => {
            console.error("Error saving data:", error);
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
          <h1 className="text-xl font-semibold mb-3">New Leave Request</h1>
          <IoMdClose
            onClick={handleCloseNewLeave}
            type="button"
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>

        <div className="row d-flex mt-3">
          <div className="col-md-4 mb-3">
            <FormControl
              fullWidth
              variant="filled"
              error={Boolean(errors.from)}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From"
                  slotProps={{
                    textField: { size: "small", clearable: true },
                  }}
                  //disablePast
                  value={from}
                  onChange={handleFrom}
                  error={Boolean(errors.from)}
                  InputProps={{
                    style: Boolean(errors.from) ? errorInputStyle : {}, // Apply error style if there's an error
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
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
                  error={Boolean(errors.to)}
                  InputProps={{
                    style: Boolean(errors.to) ? errorInputStyle : {}, // Apply error style if there's an error
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </div>

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

          <div className="col-md-4 mb-3">
            <FormControl fullWidth variant="filled">
              <TextField
                id="notes"
                label="Notes"
                size="small"
                multiline
                value={notes}
                onChange={handleNotes}
                error={Boolean(errors.notes)}
              />
            </FormControl>
          </div>
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
    </>
  );
}
export default NewLeaveRequest;
