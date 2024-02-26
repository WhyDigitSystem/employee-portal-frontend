import { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";

//test
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import Axios from "axios";







function SwipeINSwipeOUT() {
  const [loginEmpCode, setLoginEmpCode] = React.useState(localStorage.getItem("empcode"));

  const [attendacnceData, setAttendacnceData] = React.useState([]);

  useEffect(() => {
    getAllAttendanceTimeByEmp();
  }, []);

  const getAllAttendanceTimeByEmp = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      Axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/attendance/${loginEmpCode}`,
        {
          headers,
        }
      )
        .then((response) => {
          console.log("Data saved successfully:", response.data);
          setAttendacnceData(
            response.data.paramObjectsMap.Attendance
          );
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    }
  };







  const formatTime = (timeString) => {
    // Assuming timeString is in the format "09:09:44.760000"
    const date = new Date(`2000-01-01T${timeString}`);
    return date.toLocaleTimeString('en-US', { hour12: true });
  };

  const calculateWorkingHours = (checkinTime, checkoutTime) => {
    // Parse checkinTime and checkoutTime strings
    const checkin = new Date(`2000-01-01T${checkinTime}`);
    const checkout = new Date(`2000-01-01T${checkoutTime}`);

    // Calculate the difference in milliseconds
    const timeDiff = checkout - checkin;

    // Convert milliseconds to hours and minutes
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    //return `${formattedHours} Hrs ${formattedMinutes} Mins`;
    return hours < 8 ? <div className="badge badge-danger">{hours} Hrs {minutes} Mins</div> : `${hours} Hrs ${minutes} Mins`;
  };


  const formatDate = (dateString) => {
    // Assuming dateString is in the format "2024-02-23"
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };




  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">

        <TitleCard>

          <div className="overflow-x-auto w-full">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>Worked Hrs</th>
                </tr>
              </thead>
              <tbody>
                {attendacnceData.map((l, k) => (
                  <tr key={k}>
                    <td>{formatDate(l.entry_date)}</td>
                    <td>{formatTime(l.checkintime)}</td>
                    <td>{formatTime(l.checkouttime)}</td>
                    <td>{calculateWorkingHours(l.checkintime, l.checkouttime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        </TitleCard>
      </div>
    </>
  );
}

export default SwipeINSwipeOUT;
