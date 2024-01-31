import { default as React, useEffect, useState } from "react";

import Axios from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";

export const JpCheckinCheckout = () => {
  const buttonStyle = {
    fontSize: "20px",
  };
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [userid, setUserId] = React.useState(localStorage.getItem("empcode"));
  const [empcode, setEmpCode] = React.useState(localStorage.getItem("empcode"));
  const [checkedStatus, setCheckedStatus] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [formattedDate, setFormattedDate] = useState("");
  const [errors, setErrors] = useState({});
  const [attendanceList, setAttendanceList] = useState([]);
  const [checkinTime, setCheckinTime] = React.useState("");
  const [disableCheckIn, setDisableCheckIn] = useState("");
  const [disableCheckOut, setDisableCheckOut] = useState("");

  useEffect(() => {
    // Run the code when the component mounts
    const intervalId = setInterval(() => {
      const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
      setFormattedDate(currentDate);
    }, 1000); // Update every second

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once on mount

  //CheckIn POST API
  const handleCheckIn = async () => {
    const dataToSave = {
      checkin: true,
      empid: 12,
      orgId: 1,
    };
    console.log(dataToSave);
    try {
      await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/employee/employeeInOutAction`,
        dataToSave
      );
    } catch (error) {
      console.error("Error during check:", error);
    }
  };

  //CheckOut POST API
  const handleCheckOut = async () => {
    const dataToSave = {
      checkin: false,
      empid: 12,
      orgId: 1,
    };
    console.log(dataToSave);
    try {
      await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/employee/employeeInOutAction`,
        dataToSave
      );
    } catch (error) {
      console.error("Error during check:", error);
    }
  };

  //Today Attendance Status API

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="row ">
          <div className="col-lg-8 col-sm-8">
            <p className="font-semibold text-xl">{formattedDate}</p>
          </div>
          <div className="col-lg-2 col-sm-2 col-md-2">
            <div className="d-flex flex-column">
              <button
                type="button"
                onClick={handleCheckIn}
                disabled={disableCheckIn}
                className={
                  "bg-blue inline-block rounded bg-green-500 h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                }
              >
                CheckIN
              </button>
              <p className="font-bold text-lg text-center me-3 mt-2">
                {checkinTime}
              </p>
            </div>
          </div>
          <div className="col-lg-2 col-sm-2 col-md-2">
            <div className="d-flex flex-column">
              <button
                type="button"
                onClick={handleCheckOut}
                disabled={disableCheckOut}
                className={
                  "bg-blue inline-block rounded bg-red-500 h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                }
              >
                CheckOut
              </button>
              <p className="font-bold text-lg text-right me-3 mt-2">
                {/* <span className="font-normal text-md">CheckIn time: </span> */}
                {/* {checkinTime} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JpCheckinCheckout;
