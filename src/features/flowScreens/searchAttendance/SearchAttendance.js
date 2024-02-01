import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";

//test
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";

const BILLS = [
  {
    date: "01-01-2024",
    empcode: "WDS010",
    employee: "Ram Babu",
    inTime: "9:15 AM",
    outTime: "8:00 PM",
    workedHrs: "10.45 Mins",
  },
  {
    date: "01-01-2024",
    empcode: "WDS012",
    employee: "Karuppaiah",
    inTime: "9:15 AM",
    outTime: "8:00 PM",
    workedHrs: "10.45 Mins",
  },
  {
    date: "01-01-2024",
    empcode: "WDS016",
    employee: "Deena Dhalayan",
    inTime: "9:15 AM",
    outTime: "8:00 PM",
    workedHrs: "null",
  },
  {
    date: "01-01-2024",
    empcode: "WDS017",
    employee: "Richard Jhonson",
    inTime: "9:15 AM",
    outTime: "8:00 PM",
    workedHrs: "",
  },
  {
    date: "01-01-2024",
    empcode: "WDS010",
    employee: "Ram Babu",
    inTime: "9:15 AM",
    outTime: "8:00 PM",
    workedHrs: "10.45 Mins",
  },
  {
    date: "01-01-2024",
    empcode: "WDS012",
    employee: "Karuppaiah",
    inTime: "9:15 AM",
    outTime: "8:00 PM",
    workedHrs: "10.45 Mins",
  },
  {
    date: "01-01-2024",
    empcode: "WDS016",
    employee: "Deena Dhalayan",
    inTime: "9:15 AM",
    outTime: "8:00 PM",
    workedHrs: "null",
  },
  {
    date: "01-01-2024",
    empcode: "WDS017",
    employee: "Richard Jhonson",
    inTime: "9:15 AM",
    outTime: "8:00 PM",
    workedHrs: "",
  },
  {
    date: "02-01-2024",
    empcode: "WDS016",
    employee: "Deena Dhalayan",
    inTime: "9:15 AM",
    outTime: "8:00 PM",
    workedHrs: "null",
  },
  {
    date: "02-01-2024",
    empcode: "WDS017",
    employee: "Richard Jhonson",
    inTime: "9:15 AM",
    outTime: "8:00 PM",
    workedHrs: "",
  },
];

const ITEMS_PER_PAGE = 5;

function SearchAttendance() {
  const [bills, setBills] = useState(BILLS);
  const fdate = "01-01-2024";
  const tdate = "31-01-2024";
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedBills = bills.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPaymentStatus = (status) => {
    if (status === "null")
      return <div className="badge badge-danger">Absent</div>;
    if (status) return <div className="badge badge-success">{status}</div>;
    if (status === "") return <div className="badge badge-danger">Absent</div>;
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="row d-flex mt-3">
          <div className="col-md-4 mb-3">
            <FormControl fullWidth variant="filled">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From"
                  slotProps={{
                    textField: { size: "small", clearable: true },
                  }}
                  //   value={from}
                  //   onChange={handleFrom}
                />

                {/* {errors.from && (
                  <span className="text-red-500">{errors.from}</span>
                )} */}
              </LocalizationProvider>
            </FormControl>
          </div>
          <div className="col-md-4 mb-3">
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="To"
                  slotProps={{
                    textField: { size: "small", clearable: true },
                  }}
                  //   value={to}
                  //   onChange={handleTo}
                />
                {/* {errors.to && <span className="text-red-500">{errors.to}</span>} */}
              </LocalizationProvider>
            </FormControl>
          </div>
        </div>

        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            //onClick={handleSave}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            //onClick={handleCloseNewLeave}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
        <TitleCard
          title={`Attendance between ${fdate} - ${tdate}`}
          topMargin="mt-5"
        >
          <div className="flex justify-between items-center">
            <button className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              Next
            </button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Emp Code</th>
                  <th>Employee</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>Worked Hrs</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBills.map((l, k) => (
                  <tr key={k}>
                    <td>{l.date}</td>
                    <td>{l.empcode}</td>
                    <td>{l.employee}</td>
                    <td>{l.inTime}</td>
                    <td>{l.outTime}</td>
                    <td>{getPaymentStatus(l.workedHrs)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-3">
            <ul className="pagination">
              {Array.from(
                { length: Math.ceil(bills.length / ITEMS_PER_PAGE) },
                (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </TitleCard>
      </div>
    </>
  );
}

export default SearchAttendance;
