import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import {
  default as React,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useDispatch } from "react-redux";

// import { Edit } from "@mui/icons-material";
import Axios from "axios";
import moment from "moment";
import { CSVLink } from "react-csv";
import { data } from "./makeData";

export const Attendance = () => {
  const buttonStyle = {
    fontSize: "20px",
  };
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [userid, setUserId] = React.useState(localStorage.getItem("empcode"));
  const [empcode, setEmpCode] = React.useState(localStorage.getItem("empcode"));
  const [checkedStatus, setCheckedStatus] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});
  const [formattedDate, setFormattedDate] = useState("");
  const [errors, setErrors] = useState({});
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    // Function to fetch employee status and update checkedStatus state
    const fetchEmployeeStatus = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/chkStatus/${empcode}`
        );

        if (response.data.statusFlag === "Ok") {
          const status = response.data.paramObjectsMap.EmployeeStatus.status;
          // Update the checkedStatus state based on the fetched status
          setCheckedStatus(status === "In");
        }
      } catch (error) {
        console.error("Error fetching employee status:", error);
      }
    };

    // Call the function to fetch employee status when the component mounts
    fetchEmployeeStatus();
    getAllAttendanceById();
    // Run the code when the component mounts
    const intervalId = setInterval(() => {
      const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
      setFormattedDate(currentDate);
    }, 1000); // Update every second

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
  };

  const handleCheck = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/chkStatus/${empcode}`
      );

      if (response.data.statusFlag === "Ok") {
        const status = response.data.paramObjectsMap.EmployeeStatus.status;

        if (status === "In" || status === "null") {
          // Employee is already checked in, perform checkout
          await Axios.post(
            `${process.env.REACT_APP_API_URL}/api/basicMaster/checkout`,
            { userid } // Replace with your request body if needed
          );
          // Update any UI or state to reflect the checkout action
        } else {
          // Employee is checked out, perform checkin
          await Axios.post(
            `${process.env.REACT_APP_API_URL}/api/basicMaster/checkin`,
            { userid } // Replace with your request body if needed
          );
          // Update any UI or state to reflect the checkin action
        }

        // Update checkedStatus state or UI as needed after action
        setCheckedStatus(!checkedStatus);
      }
    } catch (error) {
      console.error("Error during check:", error);
    }
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

  const getAllAttendanceById = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/attendance/${empcode}`
      );

      if (response.status === 200) {
        setAttendanceList(response.data.paramObjectsMap.Attendance);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const exportDataAsCSV = () => {
    // Format your data to be exported as CSV (tableData in this case)
    // For example, transform your data into an array of arrays or objects
    // that represents rows and columns in the CSV file format

    // In this example, we'll use the tableData directly assuming it's in the right format for CSV export
    // You might need to modify the data structure to fit CSVLink requirements

    const csvData = tableData.map((row) => ({
      "S No": row.id,
      EmpCode: row.empcode,
      Date: row.entry_date,
      InTime: row.checkintime,
      OutTime: row.checkouttime,
      //TotalHrs: row.tothrs,
    }));

    // Define CSV headers
    const headers = [
      { label: "S No", key: "SNo" },
      { label: "Date", key: "Date" },
      { label: "InTime", key: "InTime" },
      { label: "OutTime", key: "OutTime" },
      { label: "TotalHrs", key: "TotalHrs" },
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
      {
        accessorKey: "id",
        header: "S No",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "empcode",
        header: "Emp Code",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "entry_date",
        header: "Date",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "checkintime",
        header: "IN Time",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "checkouttime",
        header: "OUT Time",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      // {
      //   accessorKey: "tothrs",
      //   header: "Total Hrs",
      //   size: 140,
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //   }),
      // },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-between mt-3">
          <p className="font-semibold text-xl">{formattedDate}</p>
          <button
            type="button"
            onClick={handleCheck}
            className={
              checkedStatus
                ? "bg-blue inline-block rounded bg-red-500 h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                : "bg-blue inline-block rounded bg-green-500 h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            }
          >
            {checkedStatus ? "CheckOut" : "CheckIN"}
          </button>
          {/* <span>{empcode}</span> */}
        </div>
      </div>

      {/* <>
        <div className="card w-full p-6 bg-base-100 shadow-xl mt-3">
          <div className="d-flex justify-content-between">
            <h1 className="text-xl font-semibold mb-4">Attendance Report</h1>
          </div>

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
            data={attendanceList}
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
              ></Box>
            )}
            renderTopToolbarCustomActions={() => (
              <Stack direction="row" spacing={2} className="ml-5 ">
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
      </> */}
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

export default Attendance;
