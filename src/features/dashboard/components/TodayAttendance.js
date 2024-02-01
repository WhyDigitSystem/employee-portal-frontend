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

  const changeStatusColor = (status) => {
    if (status === null || status === "") {
      return (
        <div
          className="badge badge-danger"
          style={{ backgroundColor: "#ff0000" }}
        >
          Absent
        </div>
      );
    } else {
      return <div className="badge badge-success center">{status}</div>;
    }
  };

  const changeIntimeColor = (intime) => {
    if (intime > "10:00 AM")
      return (
        <div
          className="badge badge-danger"
          style={{ backgroundColor: "#4d4dff" }}
        >
          {intime}
        </div>
      );
    if (intime <= "10:00 AM")
      return <div className="badge badge-success center">{intime}</div>;
    else return <div className="badge badge-danger">N/A</div>;
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
              <th className="normal-case">Status</th>
            </tr>
          </thead>
          <tbody>
            {todayAttendanceList.map((value, key) => {
              // Parse entrytime to get hours and minutes

              const formattedEntryTime = value.entrytime
                ? moment(value.entrytime, "HH:mm:ss.SSSSSS").format("hh:mm A")
                : "-";

              return (
                <tr key={key}>
                  {/* <th>{key + 1}</th> */}

                  <td>{value.empname}</td>
                  <td className="text-center">{value.empcode}</td>
                  <td className="text-center">
                    {changeIntimeColor(formattedEntryTime)}
                  </td>
                  <td className="text-center">
                    {changeStatusColor(value.status)}
                  </td>
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
