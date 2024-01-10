import { Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import Axios from "axios";
import dayjs from "dayjs";
import { MaterialReactTable } from "material-react-table";
import {
  default as React,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CSVLink } from "react-csv";
import { AiOutlineSearch, AiOutlineWallet } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
import NewLeaveRequest from "./NewLeaveRequest";
import { data } from "./makeData";

export const LeaveRequest = () => {
  const buttonStyle = {
    fontSize: "20px",
  };

  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState([
    "Karupu",
    "Cesil",
    "Karthi",
    "Guhan",
    "Vasanth",
  ]);

  const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));
  const [add, setAdd] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});
  const [leaveRequestList, setLeaveRequestList] = useState([]);

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
  };

  const handleAddOpen = () => {
    setAdd(true);
  };

  const handleBack = () => {
    setAdd(false);
    getAllLeaveRequestById();
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

  const exportDataAsCSV = () => {
    // Format your data to be exported as CSV (tableData in this case)
    // For example, transform your data into an array of arrays or objects
    // that represents rows and columns in the CSV file format

    // In this example, we'll use the tableData directly assuming it's in the right format for CSV export
    // You might need to modify the data structure to fit CSVLink requirements

    const csvData = tableData.map((row) => ({
      "S No": row.id,
      Date: row.fromdate,
      FromTime: row.todate,
      //ToTime: row.ttime,
      TotalHrs: row.totaldays,
      Notes: row.notes,
      Status: row.status,
    }));

    // Define CSV headers
    const headers = [
      { label: "S No", key: "SNo" },
      { label: "Date", key: "Date" },
      { label: "FromTime", key: "FromTime" },
      { label: "ToTime", key: "ToTime" },
      { label: "TotalHrs", key: "TotalHrs" },
      { label: "Notes", key: "Notes" },
      { label: "Notify", key: "Notify" },
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

  useEffect(() => {
    getAllLeaveRequestById();
  }, []);

  const getAllLeaveRequestById = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/leaverequest`
      );

      if (response.status === 200) {
        setLeaveRequestList(response.data.paramObjectsMap.leaveRequestVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
        accessorKey: "fromdate",
        header: "From",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "todate",
        header: "To",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },

      {
        accessorKey: "totaldays",
        header: "Total Days",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },

      {
        accessorKey: "notes",
        header: "Notes",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <>
      {add ? (
        <NewLeaveRequest newLeaveRequest={handleBack} />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          {/* <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-3">Group / Ledger</h1>
        </div> */}
          <div className="d-flex flex-wrap justify-content-start mb-2">
            <button
              className="btn btn-ghost btn-sm normal-case col-xs-2"
              onClick={handleAddOpen}
            >
              <AiOutlineWallet style={buttonStyle} />
              <span className="ml-1">New</span>
            </button>
            <button className="btn btn-ghost btn-sm normal-case col-xs-2">
              <AiOutlineSearch style={buttonStyle} />
              <span className="ml-1">Search</span>
            </button>
            {/* <button
          className="btn btn-ghost btn-sm normal-case col-xs-2"
          onClick={handleSave}
        >
          <AiFillSave style={buttonStyle} />
          <span className="ml-1">Save</span>
        </button> */}
            <button
              className="btn btn-ghost btn-sm normal-case col-xs-2"
              //onClick={getAllCompanyFields}
            >
              <BsListTask style={buttonStyle} />
              <span className="ml-1">List View</span>
            </button>
          </div>
          {/* <div className="row d-flex mt-3">
            <div className="col-md-4 mb-3">
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="From"
                    slotProps={{
                      textField: { size: "small", clearable: true },
                    }}
                    //value={boDate}
                    //onChange={(newValue) => setBoDate(newValue)}
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
                    //value={boDate}
                    //onChange={(newValue) => setBoDate(newValue)}
                  />
                </LocalizationProvider>
              </FormControl>
            </div>

            
            <div className="col-md-4 mb-3">
              <FormControl fullWidth variant="filled">
                <TextField
                  id="totdays"
                  label="Total Days"
                  size="small"
                  disabled
                  //placeholder="40003600104"
                  //inputProps={{ maxLength: 30 }}
                />
              </FormControl>
            </div>
            <div className="col-md-4 mb-3">
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Leave Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Leave Type"
                  // onChange={handleChange}
                >
                  <MenuItem value={"CL"}>CL</MenuItem>
                  <MenuItem value={"PL"}>PL</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="col-md-4 mb-3">
              <FormControl fullWidth variant="filled">
                <TextField
                  id="notes"
                  label="Notes"
                  size="small"
                  multiline
                  //minRows={2}
                  //maxRows={4}
                  //placeholder="accountcode"
                  //inputProps={{ maxLength: 100 }}
                />
              </FormControl>
            </div>
            <div className="col-md-4 mb-3">
              <FormControl fullWidth variant="filled">
                <Autocomplete
                  //size="small"
                  value={searchValue}
                  onChange={handleSearchChange}
                  options={options}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      size="small"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <AiOutlineSearch style={{ marginRight: 8 }} />
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>
            </div>
          </div>
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              //onClick={handleCustomer}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Save
            </button>
            <button
              type="button"
              //onClick={handleCustomerClose}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Cancel
            </button>
          </div> */}

          <>
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
              data={leaveRequestList}
              editingMode="modal"
              enableColumnOrdering
              enableEditing
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
                  <Tooltip arrow placement="right" title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
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
          </>
        </div>
      )}
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

export default LeaveRequest;
