import axios from "axios";
import { default as React, useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";

export const LeaveProcess = () => {
  const [empList, setEmpList] = useState([]);
  //const [crLeave, setCrLeave] = useState([]);
  const [errors, setErrors] = React.useState({});
  const [empLeave, setEmpLeave] = useState({});

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

  return (
    <TitleCard title={""}>
      {/** Table Data */}
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
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* {leaveBalanceList.length <= 6 && (
          <p
            className="text-end"
            sx={{
              color: "green",
            }}
          >
            <Link to="/app/holidayreport">More...</Link>
          </p>
        )} */}
      </div>
    </TitleCard>
  );
};
