import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { default as React, useEffect, useState } from "react";

import Axios from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import { data } from "./makeData";

export const Attendance = () => {
  const buttonStyle = {
    fontSize: "20px",
  };
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [userid, setUserId] = React.useState(localStorage.getItem("empcode"));
  const [empcode, setEmpCode] = React.useState(localStorage.getItem("empcode"));
  const [checkedStatus, setCheckedStatus] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});
  const [formattedDate, setFormattedDate] = useState("");
  const [errors, setErrors] = useState({});
  const [attendanceList, setAttendanceList] = useState([]);
  const [checkinTime, setCheckinTime] = React.useState("");
  const [disableCheckIn, setDisableCheckIn] = useState("");
  const [disableCheckOut, setDisableCheckOut] = useState("");

  useEffect(() => {
    const fetchEmployeeStatus = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/chkStatus/${empcode}`
        );

        if (response.data.statusFlag === "Ok") {
          const status = response.data.paramObjectsMap.EmployeeStatus.status;
          setCheckedStatus(status === "In");

          {
            status === "In" && setDisableCheckIn(true);
            status === "Out" && setDisableCheckOut(true);
          }
        }
      } catch (error) {
        console.error("Error fetching employee status:", error);
      }
    };
    const fetchEmployeeTime = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/employee/daily/time/${empcode}`
        );

        if (response.data.statusFlag === "Ok") {
          // Update the checkedStatus state based on the fetched status
          setCheckinTime(
            response.data.paramObjectsMap.EmployeeStatusVO.entrytime
          );
        }
      } catch (error) {
        console.error("Error fetching employee status:", error);
      }
    };

    fetchEmployeeStatus();
    fetchEmployeeTime();
    getAllAttendanceById();
    // Run the code when the component mounts
    const intervalId = setInterval(() => {
      const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
      setFormattedDate(currentDate);
    }, 1000); // Update every second

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleCheckIn = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/chkStatus/${empcode}`
      );

      if (response.data.statusFlag === "Ok") {
        const status = response.data.paramObjectsMap.EmployeeStatus.status;

        if (status === "Out" || status === "null") {
          // Employee is already checked in, perform checkout
          await Axios.post(
            `${process.env.REACT_APP_API_URL}/api/basicMaster/checkin`,
            { userid } // Replace with your request body if needed
          );
          // Update any UI or state to reflect the checkout action
        }
        // else {
        //   // Employee is checked out, perform checkin
        //   await Axios.post(
        //     `${process.env.REACT_APP_API_URL}/api/basicMaster/checkin`,
        //     { userid } // Replace with your request body if needed
        //   );
        //   // Update any UI or state to reflect the checkin action
        // }

        // // Update checkedStatus state or UI as needed after action
        // setCheckedStatus(!checkedStatus);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during check:", error);
    }
  };
  const handleCheckOut = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/chkStatus/${empcode}`
      );

      if (response.data.statusFlag === "Ok") {
        const status = response.data.paramObjectsMap.EmployeeStatus.status;

        if (status === "In" || status === "null") {
          // Employee is already checked in, perform checkout
          await Axios.post(
            `${process.env.REACT_APP_API_URL}/api/basicMaster/checkout`,
            { userid } // Replace with your request body if needed
          );
          // Update any UI or state to reflect the checkout action
        }
        // else {
        //   // Employee is checked out, perform checkin
        //   await Axios.post(
        //     `${process.env.REACT_APP_API_URL}/api/basicMaster/checkin`,
        //     { userid } // Replace with your request body if needed
        //   );
        //   // Update any UI or state to reflect the checkin action
        // }

        // // Update checkedStatus state or UI as needed after action
        // setCheckedStatus(!checkedStatus);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during check:", error);
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const getAllAttendanceById = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/attendance/${empcode}`
      );

      if (response.status === 200) {
        setAttendanceList(response.data.paramObjectsMap.Attendance);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
                {checkinTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Add</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default Attendance;
