
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
import { CSVLink } from "react-csv";
import { AiOutlineSearch, AiOutlineWallet } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
// import { data } from "./makeData";
import Axios from "axios";
import NewSalaryStructure from "./NewSalaryStructure";
const SalaryStructure = () => {
    const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
    const [add, setAdd] = React.useState(false);
    const [tableData, setTableData] = useState([]);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
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
    const exportDataAsCSV = () => {
        // Format your data to be exported as CSV (tableData in this case)
        // For example, transform your data into an array of arrays or objects
        // that represents rows and columns in the CSV file format

        // In this example, we'll use the tableData directly assuming it's in the right format for CSV export
        // You might need to modify the data structure to fit CSVLink requirements

        const csvData = tableData.map((row) => ({
        //   "Employee Code": row.employeeCode,
        //   Name: row.name,
        //   Gender: row.gender,
        //   "Date of Birth": row.dateofBirth,
        //   "Blood Group": row.bloodGroup,
        //   Department: row.department,
        //   Designation: row.designation,
        //   Role: row.role,
        //   "Email Id": row.emailId,
        //   "Joining Date": row.joiningDate,
        //   PAN: row.pan,
        //   Aadhar: row.aadhar,
        //   Mobile: row.mobile,
        //   "Alternate Mobile": row.alternateMobile,
        //   "Resigning Date": row.resigningDate,
        //   "Bank Name": row.bankName,
        //   "Account Number": row.accountNumber,
        //   "IFSC Code": row.ifscCode,
        //   "Reporting Person": row.reportingPerson,
        // "Reporting Person Role": row.rreporting_person_role
        }));

        // Define CSV headers
        const headers = [
        { label: "S No", key: "id" },
        //   { label: "Employee Code", key: "empcode" },
        //   { label: "Name", key: "empname" },
        //   { label: "Gender", key: "gender" },
        //   { label: "Date of Birth", key: "date_of_birth" },
        //   { label: "Blood Group", key: "blood" },
        //   { label: "Department", key: "department" },
        //   { label: "Designation", key: "designation" },
        //   { label: "Role", key: "role" },
        //   { label: "Email Id", key: "email" },
        //   { label: "Joining Date", key: "joining_date" },
        //   { label: "PAN", key: "pan" },
        //   { label: "Aadhar", key: "aadhar" },
        //   { label: "Mobile", key: "mobile_no" },
        //   { label: "Alternate Mobile", key: "alternate_mobile_no" },
        //   { label: "Resigning Date", key: "resigning_date" },
        //   { label: "Bank Name", key: "bank_name" },
        //   { label: "Account Number", key: "account_no" },
        //   { label: "IFSC Code", key: "ifsc_code" },
        //   { label: "Reporting Person", key: "reporting_person" },
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
  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        // onBlur: (event) => {
        //   const isValid =
        //     cell.column.id === "email"
        //       ? validateEmail(event.target.value)
        //       : cell.column.id === "age"
        //         ? validateAge(+event.target.value)
        //         : validateRequired(event.target.value);
        //   if (!isValid) {
        //     //set validation error for cell if invalid
        //     setValidationErrors({
        //       ...validationErrors,
        //       [cell.id]: `${cell.column.columnDef.header} is required`,
        //     });
        //   } else {
        //     //remove validation error for cell if valid
        //     delete validationErrors[cell.id];
        //     setValidationErrors({
        //       ...validationErrors,
        //     });
        //   }
        // },
      };
    },
    [validationErrors]
  );
    const columns = useMemo( () => [
          {
            accessorKey: "id",
            header: "S No",
            size: 140,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: "employeeName",
            header: "EmployeeName",
            size: 140,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: "employeeCode",
            header: "Employee Code",
            size: 140,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: "dateOfBirth",
            header: "DOB",
            size: 140,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: "department",
            header: "Department",
            size: 140,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: "bankAccountNo",
            header: "Bank Account",
            size: 140,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
        ],
        [getCommonEditTextFieldProps]
      );
      useEffect(() => {
        getAllSalaryStructure();
      }, []);
      const getAllSalaryStructure = () => {
        const token = localStorage.getItem("token");
    
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          Axios.get(`${process.env.REACT_APP_API_URL}/api/SalaryStructure/getAllSalaryStructure?orgId=${orgId}`, {
            headers,
          })
            .then((response) => {
              console.log("Data saved successfully:", response.data);
              setTableData(response.data.paramObjectsMap.salaryStructureVO);
              // handleView();
            })
            .catch((error) => {
              // Handle errors here
              console.error("Error saving data:", error);
            });
        }
      };
      const handleEditSalaryStructure = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
          try {
            values.orgid = orgId;
            values.id = parseInt(values.id);
            const token = localStorage.getItem("token");
    
            if (token) {
              const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              };
              const response = await Axios.put(
                `${process.env.REACT_APP_API_URL}/api/SalaryStructure/createSalaryStructure?id=${values.id}`,
                values,
                { headers }
              );
              if (response.status === 200) {
                tableData[row.index] = values;
                setTableData([...tableData]);
                exitEditingMode();
              }
            } else {
              console.error("User is not authenticated. Please log in.");
            }
          } catch (error) {
            console.error("Error updating row:", error);
          }
        }
      };
  return (
    <>
      {add ? (
        <NewSalaryStructure newSalary={handleBack} />
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
              onEditingRowSave={handleEditSalaryStructure}
            //   onEditingRowCancel={handleCancelRowEdits}
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
  )
}
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
export default SalaryStructure
