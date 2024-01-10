import axios from "axios";
import { default as React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleCard from "../../../components/Cards/TitleCard";

function TodayAttendance() {
  const [holidayList, setHolidayList] = useState([]);

  useEffect(() => {
    getAllHolidays();
  }, []);

  const getAllHolidays = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/holiday`
      );

      if (response.status === 200) {
        setHolidayList(response.data.paramObjectsMap.holidayVO.slice(0, 5));
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
              <th></th>
              <th className="normal-case">Date</th>
              <th className="normal-case">Emp ID</th>
              <th className="normal-case">In Time</th>
              <th className="normal-case">Out Time</th>
            </tr>
          </thead>
          <tbody>
            {holidayList.map((value, key) => {
              return (
                <tr key={key}>
                  <th>{key + 1}</th>
                  <td>{value.festival}</td>
                  <td>{value.holiday_date}</td>
                  <td>{`${value.day}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {holidayList.length <= 6 && (
          <p
            className="text-end"
            sx={{
              color: "green",
            }}
          >
            <Link to="/app/holidayreport">More...</Link>
          </p>
        )}
      </div>
    </TitleCard>
  );
}

export default TodayAttendance;
