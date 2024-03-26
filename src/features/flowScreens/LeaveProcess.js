import axios from "axios";
import { default as React, useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";

export const LeaveProcess = () => {
  const [empList, setEmpList] = useState([]);
  //const [crLeave, setCrLeave] = useState([]);
  const [errors, setErrors] = React.useState({});
  const [empLeave, setEmpLeave] = useState({});
  const [selectedLeaveType, setSelectedLeaveType] = useState({});
  const [savedData, setSavedData] = React.useState();

  const handleLeaveTypeDropdown = (event, empIndex) => {
    const selectedValue = event.target.value;
    setSelectedLeaveType({
      ...selectedLeaveType,
      [empIndex]: selectedValue,
    });
  };

  const handleCrLeave = (event, empIndex) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setEmpLeave({
      ...empLeave,
      [empIndex]: numericValue,
    });
  };

  useEffect(() => {
    getAllEmp();
  }, []);

  const getAllEmp = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/leave/balance`
      );

      if (response.status === 200) {
        setEmpList(response.data.paramObjectsMap.leaveBalanceVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNew = () => {
    setEmpLeave("");
    setSelectedLeaveType("");
  };

  // const handleValidation = () => {
  //   const newErrors = {};

  //   if (!from) {
  //     newErrors.from = "From Date is required";
  //   }
  //   if (!to) {
  //     newErrors.to = "To Date is required";
  //   }
  //   if (leaveType === "") {
  //     newErrors.leaveType = "Leave Type is required";
  //   }
  //   if (!notes) {
  //     newErrors.notes = "Notes is required";
  //   }

  //   setErrors(newErrors);

  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSave = () => {
    const dataToSave = Object.keys(empLeave).map((empIndex) => ({
      empcode: empList[empIndex].empcode,
      leavecount: empLeave[empIndex],
      leavetype: selectedLeaveType[empIndex] || "CL", // Default to "CL" if not selected
    }));
    console.log("test", dataToSave);

    const token = localStorage.getItem("token");

    // if (token) {
    //   const headers = {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/leavecredit`,
        dataToSave
        //{ headers }
      )
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        setSavedData(response.data);
        handleNew();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
    // } else {
    //   console.error("User is not authenticated. Please log in.");
    // }
  };

  return (
    <TitleCard title={""}>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="normal-case">SNo</th>
              <th className="normal-case">Emp Code</th>
              <th className="normal-case">Name</th>
              <th className="normal-case">Leave Type</th>
              <th className="normal-case">Avail Leave</th>
              <th className="normal-case">Credit Leave</th>
              <th className="normal-case">Leave Type</th>
            </tr>
          </thead>
          <tbody>
            {empList.map((u, k) => {
              return (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <td>{u.empcode}</td>
                  <td>{u.empname}</td>
                  <td>{u.leavetype}</td>
                  {/* <td>{"CL"}</td> */}
                  <td>{u.availableleave}</td>
                  <td>
                    <input
                      type="text"
                      id={`crleave_${k}`}
                      value={empLeave[k] || ""}
                      onChange={(event) => handleCrLeave(event, k)}
                      maxLength={2}
                      error={Boolean(errors[k])}
                    />

                    {errors.avlLeave && (
                      <p className="error-text">{errors.avlLeave}</p>
                    )}
                  </td>
                  <td>
                    <select
                      id={`leaveTypeDropdown_${k}`}
                      value={selectedLeaveType[k] || ""}
                      onChange={(event) => handleLeaveTypeDropdown(event, k)}
                    >
                      <option value="CL">CL</option>
                      <option value="PL">PL</option>
                      {/* Add more options as needed */}
                    </select>
                    {errors.leaveTypeDropdown && (
                      <span className="text-red-500">
                        {errors.leaveTypeDropdown}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="d-flex flex-wrap">
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
            Clear
          </button>
        </div>
      </div>
    </TitleCard>
  );
};
