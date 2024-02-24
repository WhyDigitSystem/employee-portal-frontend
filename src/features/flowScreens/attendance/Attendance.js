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
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [branchId, setBranchId] = React.useState(
    localStorage.getItem("branchId")
  );

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
    // const fetchEmployeeTime = async () => {
    //   try {
    //     const response = await Axios.get(
    //       `${process.env.REACT_APP_API_URL}/api/basicMaster/employee/daily/time/${empcode}`
    //     );

    //     if (response.data.statusFlag === "Ok") {
    //       // Update the checkedStatus state based on the fetched status
    //       setCheckinTime(
    //         response.data.paramObjectsMap.EmployeeStatusVO.entrytime
    //       );
    //     }
    //   } catch (error) {
    //     console.error("Error fetching employee status:", error);
    //   }
    // };

    fetchEmployeeStatus();
    // fetchEmployeeTime();
    getAllAttendanceById();

    const intervalId = setInterval(() => {
      const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
      setFormattedDate(currentDate);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
            { userid }
          );
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
            { userid }
          );
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
                className={`inline-block rounded h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white
                  ${
                    disableCheckIn
                      ? "opacity-50 cursor-not-allowed bg-gray-400"
                      : "bg-green-500"
                  }
                  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out
                  hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                  focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                  focus:outline-none focus:ring-0 active:bg-primary-700
                  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                  dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)]
                  dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
                  dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
                  dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
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
                className={`inline-block rounded h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white
                  ${
                    disableCheckOut
                      ? "opacity-50 cursor-not-allowed bg-gray-400"
                      : "bg-red-500"
                  }
                  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out
                  hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                  focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                  focus:outline-none focus:ring-0 active:bg-primary-700
                  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                  dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)]
                  dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
                  dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
                  dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
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

export default Attendance;
