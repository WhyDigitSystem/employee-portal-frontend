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

function NewHoliday({ newHoliday }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [day, setDay] = useState("");
  const [festival, setFestival] = useState("");
  const [errors, setErrors] = React.useState({});
  const [savedData, setSavedData] = React.useState("");

  const handleFestival = (event) => {
    setFestival(event.target.value);
  };
  const handleTabSelect = (index) => {
    setTabIndex(index);
  };
  const handleDay = (event) => {
    setDay(event.target.value);
  };
  const handleDateChange = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    //setSelectedDate(date);
    setSelectedDate(formattedDate);

    // Calculate the day of the week and update the "Day" input
    if (formattedDate) {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayOfWeek = daysOfWeek[new Date(formattedDate).getDay()];
      setDay(dayOfWeek);
    }
    else {
      // If date is cleared, reset the day field
      setSelectedDate(null);
      setDay("");
    }
  };

  const handleClearDate = () => {
    console.log("testing ok")
    setSelectedDate(null);
    setDay("");
    // setFestival("");
  };


  const buttonStyle = {
    fontSize: "20px", // Adjust the font size as needed save
  };

  const handleCloseNewHoliday = () => {
    newHoliday(false);
  };

  const handleNew = () => {
    setSelectedDate(null);
    setDay("");
    setFestival("");
  };

  const handleValidation = () => {
    const newErrors = {};

    if (selectedDate === "") {
      newErrors.selectedDate = "Date is required";
    }

    if (day.trim() === "") {
      newErrors.day = "Day is required";
    }

    if (festival.trim() === "") {
      newErrors.day = "Festival is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (handleValidation()) {
      const dataToSave = {
        holiday_date: selectedDate,
        day: day,
        festival: festival,
      };

      console.log("test", dataToSave);

      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        Axios.post(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/holiday`,
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
        <div className="row d-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-between">
            {/* <h1 className="text-xl font-semibold mb-3">New Holiday</h1> */}
            <IoMdClose
              onClick={handleCloseNewHoliday}
              type="button"
              className="cursor-pointer w-8 h-8 ml-auto"
            />
          </div>
          <div className="row d-flex mt-3">
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
                    onClear={handleClearDate}
                    error={Boolean(errors.selectedDate)}
                    format="DD-MM-YYYY"
                  />
                </LocalizationProvider>
              </FormControl>
            </div>


            <div className="col-md-4 mb-3">
              <FormControl fullWidth variant="filled">
                <TextField
                  id="day"
                  label="Day"
                  size="small"
                  disabled
                  value={day}
                  onChange={handleDay}
                  error={Boolean(errors.day)}
                  inputProps={{ maxLength: 30 }}
                />
              </FormControl>
            </div>
            <div className="col-md-4 mb-3">
              <FormControl fullWidth variant="filled">
                <TextField
                  id="festival"
                  label="Festival"
                  size="small"
                  value={festival}
                  onChange={handleFestival}
                  error={Boolean(errors.festival)}
                  inputProps={{ maxLength: 30 }}
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
              onClick={handleCloseNewHoliday}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewHoliday;
