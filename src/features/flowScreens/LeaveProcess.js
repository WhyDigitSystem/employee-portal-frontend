import axios from "axios";
import { default as React, useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";

export const LeaveProcess = () => {
  const [leaveBalanceList, setLeaveBalanceList] = useState([]);

  useEffect(() => {
    getAllHolidays();
  }, []);

  const getAllHolidays = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/leave/balance`
      );

      if (response.status === 200) {
        setLeaveBalanceList(
          response.data.paramObjectsMap.leaveBalanceVO.slice(0, 5)
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <TitleCard title={"ABC"}>
      {/** Table Data */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Emp Code</th>
              <th className="normal-case">Name</th>
              <th className="normal-case">Leave Type</th>
              <th className="normal-case">Avail Leave</th>
              <th className="normal-case">Credit Leave</th>
            </tr>
          </thead>
          <tbody>
            {leaveBalanceList.map((u, k) => {
              return (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <td>{u.empcode}</td>
                  <td>{u.empname}</td>
                  {/* <td>{u.leavetype}</td> */}
                  <td>{"CL"}</td>
                  <td>{u.availableleave}</td>
                  <td>{"testing"}</td>
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

//export default UserChannels;
