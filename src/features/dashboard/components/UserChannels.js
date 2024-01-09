import { Link } from "react-router-dom";
import axios from "axios";
import {
  default as React,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import TitleCard from "../../../components/Cards/TitleCard";

const userSourceData = [
  { source: "New Year", Date: "01/01/2024", Day: "Monday" },
  { source: "Pongal", Date: "15/01/2024", Day: "Mnday" },
  //{ source: "Mattu Pongal", Date: "16/01/2024", Day: 12.4 },
  { source: "Republic Day", Date: "26/01/2024", Day: "Wednesday" },
  { source: "Labour Day", Date: "01/05/2024", Day: "Saturday" },
  { source: "Indepandance", Date: "15/08/2024", Day: "Saturday" },
];

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
    <TitleCard title={"Goverment Holidays"}>
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
                  <td>{`${u.day}`}</td>
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
