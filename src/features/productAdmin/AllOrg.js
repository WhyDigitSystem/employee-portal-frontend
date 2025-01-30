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
import dayjs from "dayjs";
import { MaterialReactTable } from "material-react-table";
import {
  default as React,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AiOutlineSearch, AiOutlineWallet } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
// import { data } from "./makeData";
import Axios from "axios";
import OrgCreation from "./OrgCreation";
import Checkbox from "@mui/material/Checkbox";

export const AllOrg = () => {
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
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [getState, setGetState] = React.useState();

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
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

  // const exportDataAsCSV = () => {
  //   // Format your data to be exported as CSV (tableData in this case)
  //   // For example, transform your data into an array of arrays or objects
  //   // that represents rows and columns in the CSV file format

  //   // In this example, we'll use the tableData directly assuming it's in the right format for CSV export
  //   // You might need to modify the data structure to fit CSVLink requirements

  //   const csvData = tableData.map((row) => ({
  //     "Employee Code": row.employeeCode,
  //     Name: row.name,
  //     Gender: row.gender,
  //     "Date of Birth": row.dateofBirth,
  //     "Blood Group": row.bloodGroup,
  //     Department: row.department,
  //     Designation: row.designation,
  //     Role: row.role,
  //     "Email Id": row.emailId,
  //     "Joining Date": row.joiningDate,
  //     PAN: row.pan,
  //     Aadhar: row.aadhar,
  //     Mobile: row.mobile,
  //     "Alternate Mobile": row.alternateMobile,
  //     "Resigning Date": row.resigningDate,
  //     "Bank Name": row.bankName,
  //     "Account Number": row.accountNumber,
  //     "IFSC Code": row.ifscCode,
  //     "Reporting Person": row.reportingPerson,
  //   }));

  //   // Define CSV headers
  //   const headers = [
  //     { label: "S No", key: "id" },
  //     { label: "Employee Code", key: "empcode" },
  //     { label: "Name", key: "empname" },
  //     { label: "Gender", key: "gender" },
  //     { label: "Date of Birth", key: "date_of_birth" },
  //     { label: "Blood Group", key: "blood" },
  //     { label: "Department", key: "department" },
  //     { label: "Designation", key: "designation" },
  //     { label: "Role", key: "role" },
  //     { label: "Email Id", key: "email" },
  //     { label: "Joining Date", key: "joining_date" },
  //     { label: "PAN", key: "pan" },
  //     { label: "Aadhar", key: "aadhar" },
  //     { label: "Mobile", key: "mobile_no" },
  //     { label: "Alternate Mobile", key: "alternate_mobile_no" },
  //     { label: "Resigning Date", key: "resigning_date" },
  //     { label: "Bank Name", key: "bank_name" },
  //     { label: "Account Number", key: "account_no" },
  //     { label: "IFSC Code", key: "ifsc_code" },
  //     { label: "Reporting Person", key: "reporting_person" },
  //   ];

  //   return (
  //     <CSVLink data={csvData} headers={headers} filename={"table_data.csv"}>
  //       <p>
  //         <img
  //           src={process.env.REACT_APP_EXPORT_ICON}
  //           style={{ width: "30px" }}
  //         />
  //       </p>
  //     </CSVLink>
  //   );
  // };

  useEffect(() => {
    // 👆 daisy UI themes initialization
    getAllOrganizationList();
  }, []);

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
        header: "Org ID",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "name",
        header: "Organization",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      // {
      //   accessorKey: "active",
      //   header: "Active",
      //   size: 140,
      //   Cell: ({ cell }) => (cell.getValue() === true ? "Active" : "In-active"),
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //   }),
      // },
      // {
      //   accessorKey: "active",
      //   header: "Active",
      //   size: 140,
      //   Cell: ({ cell }) => (
      //     <span
      //       style={{
      //         color: cell.getValue() === true ? "white" : "white",
      //         backgroundColor: cell.getValue() === true ? "#5e8351" : "#f0836d",
      //         padding: "5px 10px",
      //         borderRadius: "25px",
      //         display: "inline-block",
      //         textAlign: "center",
      //         width: "80px",
      //       }}
      //     >
      //       {cell.getValue() === true ? "Active" : "In-Active"}
      //     </span>
      //   ),
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //     sx: {
      //       backgroundColor: cell.getValue() === true ? "5e8351" : "f0836d",
      //       color: "white",
      //       borderRadius: "5px",
      //       padding: "5px",
      //     },
      //   }),
      // },
      {
        accessorKey: "active",
        header: "Active",
        size: 140,
        Cell: ({ cell }) => (
          <span
            style={{
              color: "white",
              backgroundColor: cell.getValue() ? "#5e8351" : "#f0836d",
              padding: "5px 10px",
              borderRadius: "25px",
              display: "inline-block",
              textAlign: "center",
              width: "80px",
            }}
          >
            {cell.getValue() ? "Active" : "In-Active"}
          </span>
        ),
        muiTableBodyCellEditTextFieldProps: ({ cell, row }) => ({
          type: "checkbox",
          component: Checkbox,
          checked: cell.getValue() || false,
          onChange: (event) => {
            const updatedTableData = [...tableData];
            updatedTableData[row.index] = {
              ...updatedTableData[row.index],
              active: event.target.checked,
            };
            setTableData(updatedTableData);
          },
        }),
      }      
    ],
    [getCommonEditTextFieldProps]
  );

  const getAllOrganizationList = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/getAllOrganization`, {
        headers,
      })
        .then((response) => {
          console.log("Data saved successfully:", response.data);
          setTableData(response.data.paramObjectsMap.organizationVO);
          // handleView();
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error saving data:", error);
        });
    }
  };

  const handleEditEmployee = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      try {
        // Make a PUT request to update the user role data
        values.id = parseInt(values.id);
        const token = localStorage.getItem("token");

        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
          const response = await Axios.put(
            `${process.env.REACT_APP_API_URL}/api/basicMaster/employee`,
            values,
            { headers }
          );

          if (response.status === 200) {
            // If successful response, update the local tableData with the edited values
            tableData[row.index] = values;
            setTableData([...tableData]);

            exitEditingMode(); // Exit editing mode and close the modal
          }
        } else {
          console.error("User is not authenticated. Please log in.");
          // Handle authentication failure
        }
      } catch (error) {
        console.error("Error updating row:", error);
        // Handle errors (e.g., display an error message to the user)
      }
    }
  };

  return (
    <>
      {add ? (
        <OrgCreation newOrg={handleBack} />
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
              data={tableData}
              editingMode="modal"
              enableColumnOrdering
              enableEditing
              onEditingRowSave={handleEditEmployee}
              onEditingRowCancel={handleCancelRowEdits}
              renderRowActions={({ row, table }) => (
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
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
                    {/* <span>{exportDataAsCSV()}</span> */}
                  </Tooltip>
                </Stack>
              )}
            />
            <CreateNewOrgModal
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

export const CreateNewOrgModal = ({ open, columns, onClose, onSubmit }) => {
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

export default AllOrg;
