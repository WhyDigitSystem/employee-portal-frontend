import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { MaterialReactTable } from "material-react-table";
import { default as React, useCallback, useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import DashBoardComponent from "../../masters/DashBoardComponent";
import { data } from "./makeData";
//import dayjs from "dayjs";
import FormControl from "@mui/material/FormControl";

export const AttendanceReport = () => {
  const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));
  const [add, setAdd] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [monAttendanceReport, setMonAttendanceReport] = useState([]);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [branchId, setBranchId] = React.useState(localStorage.getItem("branchId"));

  const statsData = [
    {
      title: "Total Working Days",
      value: "0",
      //icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
      description: "",
    },
    {
      title: "Total WeekOff",
      value: "0",
      //icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
      description: "",
    },
    {
      title: "Total Holidays",
      value: "0",
      //icon: <TbWeight className="w-7 h-7 text-white dashicon" />,
      description: "",
    },
    // {
    //   title: "Average Transaction",
    //   value: "0",
    //   //icon: <FaBoxOpen className="w-7 h-7 text-white dashicon" />,
    //   description: "",
    // },
  ];

  const buttonStyle = {
    fontSize: "20px",
  };

  const handleAddOpen = () => {
    setAdd(true);
  };

  const handleBack = () => {
    setAdd(false);
  };

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleNew = () => {
    setFromDate(null);
    setToDate(null);
    window.location.reload();
  }



  // const getAllEmpAttendanceReport = async () => {
  //   const dataToSave = {
  //     fromDate: fromDate,
  //     toDate: toDate,
  //     orgId: "1",
  //   }

  //   console.log("Data To Save Payload:", dataToSave)

  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/employee/getEmployeeAttendanceActivity?endDate=${toDate}&orgId=${orgId}&startDate=${fromDate}`
  //     );

  //     if (response.status === 200) {
  //       setMonAttendanceReport(
  //         response.data.paramObjectsMap.employeeAttendanceActivity
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };


  const getAllEmpAttendanceReport = async () => {
    const dataToSave = {
      fromDate: fromDate,
      toDate: toDate,
      branch: "Bangalore",

    }

    console.log("Data To Save Payload:", dataToSave)

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/employee/monthlyReport?branch=bangalore&fromdt=${fromDate}&todt=${toDate}`,
      );

      if (response.status === 200) {
        setMonAttendanceReport(response.data.paramObjectsMap.MonthlyReports);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const exportDataAsCSV = () => {
    const csvData = tableData.map((row) => ({
      "S No": row.SNo,
      EmpCode: row.empCode,
      EmpName: row.empName,
      // PresentDays: row.presentDays,
      // UnPaidLeaves: row.upl,
      // CasualLeaves: row.cl,
      // TotSunday: row.totsunday,
      // TotHoliday: row.totalHolidays,
      // EffectiveDays: row.effDays,
    }));

    // Define CSV headers
    const headers = [
      { label: "S No", key: "SNo" },
      { label: "EmpCode", key: "Date" },
      { label: "EmpName", key: "FestName" },
      { label: "PresentDays", key: "PresentDays" },
      { label: "UnPaidLeaves", key: "UnPaidLeaves" },
      { label: "CasualLeaves", key: "CasualLeaves" },
      { label: "TotSunday", key: "TotSunday" },
      { label: "TotHoliday", key: "TotHoliday" },
      { label: "EffectiveDays", key: "EffectiveDays" },
    ];

    return (
      <CSVLink data={csvData} headers={headers} filename={"table_data.csv"}>
        <p>
          <img
            src={process.env.REACT_APP_EXPORT_ICON}
            style={{ width: "30px" }}
          />
        </p>
      </CSVLink>
    );
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        // eslint-disable-next-line no-restricted-globals
        !confirm(`Are you sure you want to delete ${row.getValue("firstName")}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
                ? validateAge(+event.target.value)
                : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const columns = useMemo(
    () => [
      // {
      //   accessorKey: "SNo",
      //   header: "S No",
      //   size: 140,
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //   }),
      // },
      {
        accessorKey: "EmployeeCode",
        header: "Emp Code",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "EmployeeName",
        header: "Employee",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "OfficeWorkingDays",
        header: "Office Working Days",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "PresentDays",
        header: "Present Days",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "TotalLeaveCount",
        header: "Total Leave",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "CLLeave",
        header: "CL",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "PLLeave",
        header: "PL",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "MLLeave",
        header: "ML",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "PTLLeave",
        header: "PTL",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      // {
      //   accessorKey: "presentDays",
      //   header: "LOP",
      //   size: 140,
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //   }),
      // },
      {
        accessorKey: "SalaryDays",
        header: "Salary Days",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  const handleFromDateChange = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setFromDate(formattedDate);
  };

  const handleToDateChange = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setToDate(formattedDate);
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6 ">
          {statsData.map((d, k) => {
            return <DashBoardComponent key={k} {...d} colorIndex={k} />;
          })}
        </div>
        {/* <div className="d-flex justify-content-between mt-3"></div> */}
        <div className="row d-flex mt-5">
          <div className="col-md-4 mb-3">
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From"
                  slotProps={{
                    textField: { size: "small", clearable: true },
                  }}
                  value={fromDate}
                  onChange={handleFromDateChange}
                />
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
                  value={toDate}
                  onChange={handleToDateChange}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
        </div>
        <div className="d-flex flex-row mt-3 ml-5">
          <button
            type="button"
            onClick={getAllEmpAttendanceReport}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleNew}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Clear
          </button>
        </div>
        <>
          <div className="abc mt-5">
            <MaterialReactTable
              displayColumnDefOptions={{
                "mrt-row-actions": {
                  muiTableHeadCellProps: {
                    align: "center",
                  },
                  size: 120,
                },
              }}
              columns={columns}
              data={monAttendanceReport}
              editingMode="modal"
              enableColumnOrdering
              //enableEditing
              onEditingRowSave={handleSaveRowEdits}
              onEditingRowCancel={handleCancelRowEdits}
              renderRowActions={({ row, table }) => (
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* <Tooltip arrow placement="left" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip> */}
                  {/* <Tooltip arrow placement="right" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip> */}
                </Box>
              )}
              renderTopToolbarCustomActions={() => (
                <Stack direction="row" spacing={2} className="ml-5 ">
                  {/* <Tooltip title="Add">
                    <div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setCreateModalOpen(true)}
                      >
                        Add
                      </button>
                    </div>
                  </Tooltip> */}
                  <Tooltip title="Export Data as CSV">
                    <span>{exportDataAsCSV()}</span>
                  </Tooltip>
                </Stack>
              )}
            />
            <CreateNewAccountModal
              columns={columns}
              open={createModalOpen}
              onClose={() => setCreateModalOpen(false)}
              onSubmit={handleCreateNewRow}
            />
          </div>
        </>
      </div>
    </>
  );
};

export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Add</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default AttendanceReport;
