import axios from "axios";
import { default as React, useEffect, useState } from "react";

export const HolidayCard = () => {
  const [nextHoliday, setNextHoliday] = useState([]);

  useEffect(() => {
    getNextHolidays();
  }, []);

  const getNextHolidays = async () => {
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

        setNextHoliday(nextHoliday ? [nextHoliday] : []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      {/* <div className="card w-full p-6 bg-base-100 shadow-xl"> */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Next Holiday</h2>
        {nextHoliday.map((holiday, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="text-lg">{holiday.festival}</p>
            <p className="text-sm text-gray-500">
              Date: {formatDate(holiday.holiday_date)} | Day: {holiday.day}
            </p>
            <a
              href="/app/holidayreport"
              className="absolute bottom-4 right-4 text-blue-500"
            >
              View All
            </a>
          </div>
        ))}
      </div>
      {/* </div> */}
    </>
  );
};
