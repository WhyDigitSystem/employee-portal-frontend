import axios from "axios";
import { default as React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleCard from "../../../components/Cards/TitleCard";

function UserChannels() {
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
    <TitleCard title={"Holidays"}>
      {/** Table Data */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Holiday</th>
              <th className="normal-case">Date</th>
              <th className="normal-case">Day</th>
            </tr>
          </thead>
          <tbody>
            {holidayList.map((u, k) => {
              return (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <td>{u.festival}</td>
                  <td>{u.holiday_date}</td>
                  <td>{u.day}</td>
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

export default UserChannels;
