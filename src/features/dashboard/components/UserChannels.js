import axios from "axios";
import { default as React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleCard from "../../../components/Cards/TitleCard";

function UserChannels() {
  const [holidayList, setHolidayList] = useState([]);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
    const [branchId, setBranchId] = React.useState(localStorage.getItem("branchId"));

  useEffect(() => {
    getAllHolidays();
  }, []);

  
  const getAllHolidays = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/holiday`
      );

      if (response.status === 200) {
        const allHolidays = response.data.paramObjectsMap.holidayVO;

        // Sort holidays by date
        const sortedHolidays = allHolidays.sort((a, b) => {
          return new Date(a.holiday_date) - new Date(b.holiday_date);
        });

        // Find the next holiday from the current date
        const currentDate = new Date();
        const nextHoliday = sortedHolidays.find(
          (holiday) => new Date(holiday.holiday_date) > currentDate
        );

        setHolidayList(nextHoliday ? [nextHoliday] : []);
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
