import axios from "axios";
import moment from "moment";
import { default as React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleCard from "../../../components/Cards/TitleCard";

function TodayAttendance() {
  const [todayAttendanceList, settodayAttendanceList] = useState([]);

  useEffect(() => {
    getTodayAttendance();
  }, []);

  const getTodayAttendance = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/employee/daily/status`
      );

      if (response.status === 200) {
        settodayAttendanceList(response.data.paramObjectsMap.EmployeeStatusVO);
        console.log("sts", response.data.paramObjectsMap.EmployeeStatusVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <TitleCard title={"Today Attendance"}>
      {/** Table Data */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {/* <th></th> */}
              <th className="normal-case">Emp Name</th>
              <th className="normal-case">Emp ID</th>
              <th className="normal-case">In Time</th>
              {/* <th className="normal-case">Out Time</th> */}
              <th className="normal-case">Status</th>
            </tr>
          </thead>
          <tbody>
            {todayAttendanceList.map((value, key) => {
              // Parse entrytime to get hours and minutes
              const formattedEntryTime = value.entrytime
                ? moment(value.entrytime, "HH:mm:ss.SSSSSS").format("hh:mm A")
                : "-";
              // Check if status is null or empty
              const formattedStatus = value.status ? value.status : "-";

              return (
                <tr key={key}>
                  {/* <th>{key + 1}</th> */}

                  <td>{value.empname}</td>
                  <td className="text-center">{value.empcode}</td>
                  <td className="text-center">{formattedEntryTime}</td>
                  <td className="text-center">{formattedStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {todayAttendanceList.length <= 6 && (
          <p
            className="text-end"
            sx={{
              color: "green",
            }}
          >
            <Link to="/app/todayfullattendance">More...</Link>
          </p>
        )}
      </div>
    </TitleCard>
  );
}

export default TodayAttendance;
