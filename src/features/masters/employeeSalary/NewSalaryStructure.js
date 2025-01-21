import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Axios from "axios";
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ActionButton from '../../../utils/ActionButton';
import { IoMdClose } from "react-icons/io";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FormControl, InputLabel, Autocomplete, MenuItem, Select } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText } from '@mui/material';
import { encryptPassword } from "../../user/components/utils";

const NewSalaryStructure = ({newSalary}) => {
    const [showTable, setShowTable] = useState(true);
    const [allEmployeeName, setAllEmployeeName] = useState([]);
    const [listAllHeadingEarning, setListAllHeadingEarning] = useState([]);
    const [listAllHeadingDeduction, setListAllHeadingDeduction] = useState([]);
    const [value, setValue] = useState(0);
    const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
    const [loginEmpName, setLoginEmpName] = React.useState(
       localStorage.getItem("empname")
    );
    const [errors, setErrors] = React.useState({});
    const [savedData, setSavedData] = React.useState("");
    const [formData, setFormData] = useState([
        {
          id: 1,
          employeeName:'',
          employeeCode:'',
          dob:'',
          grade:'',
          department:'',
          panNo:'',
          bankAccountNo:'',
          position:'',
          doj:''
        }
    ]);
    const [salaryStructureErrors, setSalaryStructureErrors] = useState([
        {
            id: 1,
            employeeName:'',
            employeeCode:'',
            dob:'',
            grade:'',
            department:'',
            pan:'',
            bankAccountNo:'',
            position:'',
            doj:''
        }
    ]);
    const [newSalaryStructureTable, setNewSalaryStructureTable] = useState([
      {
        id: 1,
        heading:'',
        amount:'',
      }
  ]);
  const [salaryStructureTableErrors, setSalaryStructureTableErrors] = useState([
      {
          id: 1,
          heading:'',
          amount:'',
      }
  ]);
  const [newSalaryStructureTableEarnings, setNewSalaryStructureTableEarnings] = useState([
    {
      id: 1,
      heading:'',
      amount:'',
    }
  ]);
  const [salaryStructureTableEarningsErrors, setSalaryStructureTableEarningsErrors] = useState([
      {
          id: 1,
          heading:'',
          amount:'',
      }
  ]);
  const [tabIndex, setTabIndex] = useState(0);
    const handleDateChange = (field, date) => {
      const formattedDate = dayjs(date);
      console.log('formattedDate', formattedDate);
      setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));
    };
    const handleTabSelect = (index) => {
      setTabIndex(index);
    };
    const handleInputChange = (e) => {
      const { name, value, checked, selectionStart, selectionEnd, type } = e.target;
      const nameRegex = /^[A-Za-z ]*$/;
      const numericRegex = /^[0-9]*$/;
      let errorMessage = '';

      // switch (name) {
      //   case 'heading':
      //     if (!nameRegex.test(value)) {
      //       errorMessage = 'Only alphabetic characters are allowed';
      //     }
      //   break;
      //   case 'code':
      //     if (!nameRegex.test(value)) {
      //       errorMessage = 'Only alphabetic characters are allowed';
      //     }
      //   break;
      //   case 'category':
      //     if (!nameRegex.test(value)) {
      //       errorMessage = 'Only alphabetic characters are allowed';
      //     }
      //   break;
      //   case 'type':
      //     if (!nameRegex.test(value)) {
      //       errorMessage = 'Only alphabetic characters are allowed';
      //     }
      //   break;
      //   case 'amount':
      //     if (!numericRegex.test(value)) {
      //       errorMessage = 'Only numbers are allowed';
      //     }
      //   break;
      //   default:
      //     break;
      // }
      if (errorMessage) {
        setSalaryStructureErrors({ ...salaryStructureErrors, [name]: errorMessage });
      }
       else {
        // Clear error message for valid input
        setSalaryStructureErrors({ ...salaryStructureErrors, [name]: '' });
        setFormData({ ...formData, [name]: value.toUpperCase() });
  
        // Preserve the cursor position for text-based inputs
        if (type === 'text' || type === 'textarea') {
          setTimeout(() => {
            const inputElement = document.getElementsByName(name)[0];
            if (inputElement && inputElement.setSelectionRange) {
              inputElement.setSelectionRange(selectionStart, selectionEnd);
            }
          }, 0);
        }
      }
    };
    const handleClosePermission = () => {
        newSalary(false);
    };
    const handleAddRowDetection = () => {
      if (isLastRowEmptyDetection(newSalaryStructureTable)) {
        displayRowErrorDetection(newSalaryStructureTable);
        return;
      }
      const newRow = {
        id: Date.now(),
        heading: '',
        amount: ''
      };
      setNewSalaryStructureTable([...newSalaryStructureTable, newRow]);
      setSalaryStructureTableErrors([
        ...salaryStructureTableErrors,
        {
          heading: '',
          amount: ''
        }
      ]);
    };
    const isLastRowEmptyDetection = (table) => {
      const lastRow = table[table.length - 1];
      if (!lastRow) return false;
  
      if (table === newSalaryStructureTable) {
        return (
          !lastRow.heading ||
          !lastRow.amount
        );
      }
      return false;
    };
    const displayRowErrorDetection = (table) => {
      if (table === newSalaryStructureTable) {
        setSalaryStructureTableErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[table.length - 1] = {
            ...newErrors[table.length - 1],
            heading: !table[table.length - 1].heading ? 'Heading is required' : '',
            amount: !table[table.length - 1].amount ? 'Amount is required' : '',
          };
          return newErrors;
        });
      }
    };
    const handleAddRowEarning = () => {
      if (isLastRowEmptyEarning(newSalaryStructureTableEarnings)) {
        displayRowErrorEarning(newSalaryStructureTableEarnings);
        return;
      }
      const newRow = {
        id: Date.now(),
        heading: '',
        amount: ''
      };
      setNewSalaryStructureTableEarnings([...newSalaryStructureTableEarnings, newRow]);
      setSalaryStructureTableEarningsErrors([
        ...salaryStructureTableErrors,
        {
          heading: '',
          amount: ''
        }
      ]);
    };
    const isLastRowEmptyEarning = (table) => {
      const lastRow = table[table.length - 1];
      if (!lastRow) return false;
  
      if (table === newSalaryStructureTableEarnings) {
        return (
          !lastRow.heading ||
          !lastRow.amount
        );
      }
      return false;
    };
    const validateNumericInput = (value) => {
      const numericRegex = /^[0-9]*$/;
      return numericRegex.test(value);
    };
    
    const displayRowErrorEarning = (table) => {
      if (table === newSalaryStructureTableEarnings) {
        setSalaryStructureTableEarningsErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[table.length - 1] = {
            ...newErrors[table.length - 1],
            heading: !table[table.length - 1].heading ? 'Heading is required' : '',
            amount: !table[table.length - 1].amount ? 'Amount is required' : '',
          };
          return newErrors;
        });
      }
    };
    const handleDeleteRowDetections = (id, table, setTable, errorTable, setErrorTable) => {
        const rowIndex = table.findIndex((row) => row.id === id);
        if (rowIndex !== -1) {
          const updatedData = table.filter((row) => row.id !== id);
          const updatedErrors = errorTable.filter((_, index) => index !== rowIndex);
          setTable(updatedData);
          setErrorTable(updatedErrors);
        }
    };
    const handleDeleteRowEarnings = (id, table, setTable, errorTable, setErrorTable) => {
      const rowIndex = table.findIndex((row) => row.id === id);
      if (rowIndex !== -1) {
        const updatedData = table.filter((row) => row.id !== id);
        const updatedErrors = errorTable.filter((_, index) => index !== rowIndex);
        setTable(updatedData);
        setErrorTable(updatedErrors);
      }
  };
  const handleValidation = () => {
    const newErrors = {};
    if (formData.employeeName.trim() === "") {
      newErrors.employeeName = "Employee Name is required";
    }
    if (formData.employeeCode.trim() === "") {
      newErrors.employeeCode = "Employee Code is required";
    }
    if (formData.dob.trim() === "") {
      newErrors.dob = "DOB is required";
    }
    if (formData.doj.trim() === "") {
      newErrors.doj = "DOJ is required";
    }
    if (formData.grade === "") {
      newErrors.grade = "Grade is required";
    }
    if (formData.department === "") {
      newErrors.department = "Department is required";
    }
    if (formData.panNo === "") {
      newErrors.panNo = "Pan No is required";
    }
    if (formData.bankAccountNo === "") {
      newErrors.bankAccountNo = "Bank Account No is required";
    }
    if (formData.position === "") {
      newErrors.position = "Position is required";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  useEffect(() =>{
    getAllEmployeeNames();
    getAllHeadings();
  },[])
  const getAllEmployeeNames = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      Axios.get(`${process.env.REACT_APP_API_URL}/api/SalaryStructure/empNameDetails?orgId=${orgId}`, {
        headers,  
      })
        .then((response) => {
          console.log("Data fetched successfully:", response.data.paramObjectsMap.empNameDetails);
          setAllEmployeeName(response.data.paramObjectsMap.empNameDetails);
          // handleView();
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error on fetching data:", error);
        });
    }
  };
  const getAllHeadings = () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
      Axios.get(`${process.env.REACT_APP_API_URL}/api/SalaryStructure/salaryMasterDetails?orgId=${orgId}`, {
        headers,
      })
        .then((response) => {
          console.log("Data fetched successfully:", response.data.paramObjectsMap.salaryMasterDetails);
          
          // Destructure salaryMasterDetails from response
          const { salaryMasterDetails } = response.data.paramObjectsMap;
          
          if (Array.isArray(salaryMasterDetails)) {
            // Separate Earnings and Deductions based on `type`
            const earnings = salaryMasterDetails.filter((item) => item.type === 'E');
            const deductions = salaryMasterDetails.filter((item) => item.type === 'D');
            
            // Update the respective states
            setListAllHeadingEarning(earnings);
            setListAllHeadingDeduction(deductions);
          }
        })
        .catch((error) => {
          console.error("Error on fetching data:", error);
        });
    }
  };
  const handleSave = () => {
    console.log("handlesave is working");
  
    if (handleValidation()) {
      console.log("handle validation is working");
      const dataToSave = {
        orgId: parseInt(orgId),
        employeeName: formData.employeeName,
        employeeCode: formData.employeeCode,
        grade: formData.grade,
        department: formData.department,
        pan: formData.panNo,
        bankAccountNo: formData.bankAccountNo.toString(),
        position: formData.position,
        dateOfBirth: dayjs(formData.dob).format("YYYY-MM-DD"),
        dateOfJoining: dayjs(formData.doj).format("YYYY-MM-DD"),
        salaryStructureEarningsDTO: newSalaryStructureTableEarnings.map((earning) => ({
          heading: earning.heading,
          amount: parseInt(earning.amount),
        })),
        salaryStructureDeductionDTO: newSalaryStructureTable.map((deduction) => ({
          heading: deduction.heading,
          amount: parseInt(deduction.amount),
        })),
        updatedBy: loginEmpName,
        createdBy: loginEmpName,
      };
  
      console.log("DataToSave:", dataToSave);
  
      const token = localStorage.getItem("token");
  
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
  
        Axios.put(
          `${process.env.REACT_APP_API_URL}/api/SalaryStructure/createSalaryStructure`,
          dataToSave,
          { headers }
        )
          .then((response) => {
            console.log("Data saved successfully:", response.data);
            setSavedData(response.data);
          })
          .catch((error) => {
            console.error("Error saving data:", error);
          });
      }
    }
  };
  
  return (
    <>
    <div>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-between">
            <h1 className="text-xl font-semibold mb-3">Salary Heads</h1>
            <IoMdClose
              type="button"
              className="cursor-pointer w-8 h-8 mb-3"
              onClick={handleClosePermission}
            />
          </div>
          <div className="row d-flex mt-3">
          <div className="col-md-4 mb-3">
                  <Autocomplete
                    disablePortal
                    options={allEmployeeName}
                    getOptionLabel={(option) => option.empname || ''}
                    sx={{ width: '100%' }}
                    size="small"
                    // disabled={!!editId}
                    value={allEmployeeName.find((c) => c.empname === formData.employeeName) || null}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setFormData({
                          ...formData,
                          employeeName: newValue.empname,
                          employeeCode: newValue.empcode,
                          dob: newValue.date_of_birth,
                          doj: newValue.joining_date,
                          panNo: newValue.pan,
                          position: newValue.role,
                          bankAccountNo: newValue.account_no,
                          department: newValue.department,
                          grade: newValue.designation,
                        });
                      } else {
                        setFormData({
                          ...formData,
                          employeeName: '',
                        });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Employee Name"
                        name="employeeName"
                        error={!!salaryStructureErrors.employeeName}
                        helperText={salaryStructureErrors.employeeName}
                        InputProps={{
                          ...params.InputProps,
                          style: { height: 40 }
                        }}
                        // disabled={!!editId}
                      />
                    )}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <TextField
                    fullWidth
                    size="small"
                    label="Employee Code"
                    value={formData.employeeCode || ""}
                    disabled
                  />
                </div>

                {/* <div className="col-md-4 mb-3">
                  <TextField
                    disabled
                    id="employeeCode"
                    label="Employee Code"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="employeeCode"
                    value={formData.employeeCode}
                    onChange={handleInputChange}
                    helperText={<span style={{ color: 'red' }}>{salaryStructureErrors.employeeCode ? salaryStructureErrors.employeeCode : ''}</span>}
                    inputProps={{ maxLength: 40 }}
                    error={!!salaryStructureErrors.employeeCode}
                  />
                </div> */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date Of Birth"
                        disabled
                        value={formData.dob ? dayjs(formData.dob, 'YYYY-MM-DD') : null}
                        onChange={(date) => handleDateChange('dob', date)}
                        slotProps={{
                          textField: { size: 'small', clearable: true }
                        }}
                        format="DD-MM-YYYY"
                        error={!!salaryStructureErrors.dob}
                        helperText={salaryStructureErrors.dob ? salaryStructureErrors.dob : ''}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </div>
                <div className="col-md-4 mb-3">
                  <TextField
                    fullWidth
                    size="small"
                    label="Grade"
                    value={formData.grade || ""}
                    disabled
                  />
                </div>
                {/* <div className="col-md-4 mb-3">
                  <TextField
                    disabled
                    id="grade"
                    label="Grade"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    helperText={<span style={{ color: 'red' }}>{salaryStructureErrors.grade ? salaryStructureErrors.grade : ''}</span>}
                    inputProps={{ maxLength: 40 }}
                    error={!!salaryStructureErrors.grade}
                  />
                </div> */}
                <div className="col-md-4 mb-3">
                  <TextField
                    fullWidth
                    size="small"
                    label="Department"
                    value={formData.department || ""}
                    disabled
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <TextField
                    fullWidth
                    size="small"
                    label="PAN No"
                    value={formData.panNo || ""}
                    disabled
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <TextField
                    fullWidth
                    size="small"
                    label="Bank Account No"
                    value={formData.bankAccountNo || ""}
                    disabled
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <TextField
                    fullWidth
                    size="small"
                    label="Position"
                    value={formData.position || ""}
                    disabled
                  />
                </div>
                {/* <div className="col-md-4 mb-3">
                  <TextField
                    disabled
                    id="department"
                    label="Department"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    helperText={<span style={{ color: 'red' }}>{salaryStructureErrors.department ? salaryStructureErrors.department : ''}</span>}
                    inputProps={{ maxLength: 40 }}
                    error={!!salaryStructureErrors.department}
                  />
                </div> */}

                {/* <div className="col-md-4 mb-3">
                  <TextField
                    disabled
                    id="panNo"
                    label="Pan No"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="panNo"
                    value={formData.panNo}
                    onChange={handleInputChange}
                    helperText={<span style={{ color: 'red' }}>{salaryStructureErrors.panNo ? salaryStructureErrors.panNo : ''}</span>}
                    inputProps={{ maxLength: 40 }}
                    error={!!salaryStructureErrors.panNo}
                  />
                </div> */}
                {/* <div className="col-md-4 mb-3">
                  <TextField
                    disabled
                    id="bankAccountNo"
                    label="Bank Account No"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="bankAccountNo"
                    value={formData.bankAccountNo}
                    onChange={handleInputChange}
                    helperText={<span style={{ color: 'red' }}>{salaryStructureErrors.bankAccountNo ? salaryStructureErrors.bankAccountNo : ''}</span>}
                    inputProps={{ maxLength: 40 }}
                    error={!!salaryStructureErrors.bankAccountNo}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <TextField
                    disabled
                    id="position"
                    label="Position"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    helperText={<span style={{ color: 'red' }}>{salaryStructureErrors.position ? salaryStructureErrors.position : ''}</span>}
                    inputProps={{ maxLength: 40 }}
                    error={!!salaryStructureErrors.position}
                  />
                </div> */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date Of Joining"
                        disabled
                        value={formData.doj ? dayjs(formData.doj, 'YYYY-MM-DD') : null}
                        onChange={(date) => handleDateChange('doj', date)}
                        slotProps={{
                          textField: { size: 'small', clearable: true }
                        }}
                        format="DD-MM-YYYY"
                        error={!!salaryStructureErrors.doj}
                        helperText={salaryStructureErrors.doj ? salaryStructureErrors.doj : ''}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </div>
          </div>
            <Tabs
              className="mt-4   "
              selectedIndex={tabIndex}
              onSelect={handleTabSelect}
            >
              <TabList>
                <Tab>Earnings Details</Tab>
                <Tab>Detection Details</Tab>
              </TabList>

              {/* Earnings Details TAB */}
              <TabPanel>
              <div className="row d-flex ml">
                <div className="mb-1">
                  <ActionButton title="Add" icon={AddIcon} onClick={handleAddRowEarning} />
                </div>
              <div className="row mt-2">
                <div className="col-lg-12">
                              <div className="table-responsive">
                                <table className="table table-bordered ">
                                  <thead>
                                    <tr>
                                      <th className="table-header px-2 py-2 text-center" style={{ width: '10px' }}>
                                        Action
                                      </th>
                                      <th className="table-header px-2 py-2 text-center" style={{ width: '50px' }}>
                                        S.No
                                      </th>
                                      <th className="table-header px-2 py-2 text-center" style={{width: '400px'}}>Heading</th>
                                      <th className="table-header px-2 py-2 text-center" style={{width: '400px'}}>Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {newSalaryStructureTableEarnings.map((row, index) => (
                                      <tr key={row.id}>
                                        <td className="col-md-1 border px-2 py-2 text-center">
                                          <ActionButton
                                            className=" mb-2"
                                            title="Delete"
                                            icon={DeleteIcon}
                                            onClick={() =>
                                              handleDeleteRowDetections(
                                                row.id,
                                                newSalaryStructureTableEarnings,
                                                setNewSalaryStructureTableEarnings,
                                                salaryStructureTableEarningsErrors,
                                                setSalaryStructureTableEarningsErrors
                                              )
                                            }
                                          />
                                        </td>
                                        <td className="text-center">
                                          <div className="pt-2">{index + 1}</div>
                                        </td>
                                        <td>
                                          <Autocomplete
                                            options={listAllHeadingEarning}
                                            getOptionLabel={(option) => option.headings || ''}
                                            groupBy={(option) => (option.headings ? option.headings[0].toUpperCase() : '')}
                                            value={row.heading ? listAllHeadingEarning.find((a) => a.headings === row.heading) : null}
                                            onChange={(event, newValue) => {
                                              const value = newValue ? newValue.headings : '';
                                              setNewSalaryStructureTableEarnings((prev) =>
                                                prev.map((r) => (r.id === row.id ? { ...r, heading: value } : r))
                                              );

                                              setSalaryStructureErrors((prevErrors) =>
                                                prevErrors.map((err, idx) => (idx === index ? { ...err, heading: '' } : err))
                                              );
                                            }}
                                            size="small"
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                label="Heading"
                                                variant="outlined"
                                                error={!!salaryStructureTableEarningsErrors[index]?.heading}
                                                helperText={salaryStructureTableEarningsErrors[index]?.heading}
                                              />
                                            )}
                                            // sx={{ width: 350 }}
                                          />
                                        </td>
                                        <td className="border px-2 py-2">
                                          <input
                                            value={row.amount}
                                            // onChange={(e) => {
                                            //   const value = e.target.value;
                                            //   setNewSalaryStructureTableEarnings((prev) => prev.map((r) => (r.id === row.id ? { ...r, amount: value } : r)));
                                            //   // setsalaryStructureTableEarningsErrors((prev) => {
                                            //   //   const newErrors = [...prev];
                                            //   //   newErrors[index] = {
                                            //   //     ...newErrors[index],
                                            //   //     amount: !value ? 'Amount is required' : ''
                                            //   //   };
                                            //   //   return newErrors;
                                            //   // });
                                            // }}
                                            onChange={(e) => {
                                              const value = e.target.value;
                                              if (validateNumericInput(value)) {
                                                setNewSalaryStructureTableEarnings((prev) =>
                                                  prev.map((row) =>
                                                    row.id === row.id ? { ...row, amount: value } : row
                                                  )
                                                );
                                                setSalaryStructureTableEarningsErrors((prev) =>
                                                  prev.map((err, idx) =>
                                                    idx === index ? { ...err, amount: "" } : err
                                                  )
                                                );
                                              } else {
                                                setSalaryStructureTableEarningsErrors((prev) =>
                                                  prev.map((err, idx) =>
                                                    idx === index
                                                      ? { ...err, amount: "Only numeric values are allowed." }
                                                      : err
                                                  )
                                                );
                                              }
                                            }}
                                            className={salaryStructureTableEarningsErrors[index]?.amount ? 'error form-control' : 'form-control'}
                                          />
                                          {salaryStructureTableEarningsErrors[index]?.amount && (
                                            <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                              {salaryStructureTableEarningsErrors[index].amount}
                                            </div>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                </div>
              </div>
              </div>
              </TabPanel>

              {/* REPORTING PERSON TAB */}
              <TabPanel>
                <div className="row d-flex ml">
                        <div className="mb-1">
                          <ActionButton title="Add" icon={AddIcon} onClick={handleAddRowDetection} />
                        </div>
                         
                          <div className="row mt-2">
                            <div className="col-lg-12">
                              <div className="table-responsive">
                                <table className="table table-bordered ">
                                  <thead>
                                    <tr>
                                      <th className="table-header px-2 py-2 text-center" style={{ width: '10px' }}>
                                        Action
                                      </th>
                                      <th className="table-header px-2 py-2 text-center" style={{ width: '50px' }}>
                                        S.No
                                      </th>
                                      <th className="table-header px-2 py-2 text-center" style={{width: '400px'}}>Heading</th>
                                      <th className="table-header px-2 py-2 text-center" style={{width: '400px'}}>Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {newSalaryStructureTable.map((row, index) => (
                                      <tr key={row.id}>
                                        <td className="col-md-1 border px-2 py-2 text-center">
                                          <ActionButton
                                            className=" mb-2"
                                            title="Delete"
                                            icon={DeleteIcon}
                                            onClick={() =>
                                              handleDeleteRowEarnings(
                                                row.id,
                                                newSalaryStructureTable,
                                                setNewSalaryStructureTable,
                                                salaryStructureTableErrors,
                                                setSalaryStructureTableErrors
                                              )
                                            }
                                          />
                                        </td>
                                        <td className="text-center">
                                          <div className="pt-2">{index + 1}</div>
                                        </td>
                                        <td>
                                          <Autocomplete
                                            options={listAllHeadingDeduction}
                                            getOptionLabel={(option) => option.headings || ''}
                                            groupBy={(option) => (option.headings ? option.headings[0].toUpperCase() : '')}
                                            value={row.heading ? listAllHeadingDeduction.find((a) => a.headings === row.heading) : null}
                                            onChange={(event, newValue) => {
                                              const value = newValue ? newValue.headings : '';
                                              setNewSalaryStructureTable((prev) =>
                                                prev.map((r) => (r.id === row.id ? { ...r, heading: value } : r))
                                              );

                                              setSalaryStructureErrors((prevErrors) =>
                                                prevErrors.map((err, idx) => (idx === index ? { ...err, heading: '' } : err))
                                              );
                                            }}
                                            size="small"
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                label="Heading"
                                                variant="outlined"
                                                error={!!salaryStructureTableErrors[index]?.heading}
                                                helperText={salaryStructureTableErrors[index]?.heading}
                                              />
                                            )}
                                            // sx={{ width: 350 }}
                                          />
                                        </td>
                                        <td className="border px-2 py-2">
                                          <input
                                            value={row.amount}
                                            // onChange={(e) => {
                                            //   const value = e.target.value;
                                            //   setNewSalaryStructureTable((prev) => prev.map((r) => (r.id === row.id ? { ...r, amount: value } : r)));
                                            //   // setSalaryStructureTableErrors((prev) => {
                                            //   //   const newErrors = [...prev];
                                            //   //   newErrors[index] = {
                                            //   //     ...newErrors[index],
                                            //   //     amount: !value ? 'Amount is required' : ''
                                            //   //   };
                                            //   //   return newErrors;
                                            //   // });
                                            // }}
                                            onChange={(e) => {
                                              const value = e.target.value;
                                              if (validateNumericInput(value)) {
                                                setNewSalaryStructureTable((prev) =>
                                                  prev.map((row) => (row.id === row.id ? { ...row, amount: value } : row))
                                                );
                                                setSalaryStructureTableErrors((prev) =>
                                                  prev.map((err, idx) =>
                                                    idx === index ? { ...err, amount: "" } : err
                                                  )
                                                );
                                              } else {
                                                setSalaryStructureTableErrors((prev) =>
                                                  prev.map((err, idx) =>
                                                    idx === index
                                                      ? { ...err, amount: "Only numeric values are allowed." }
                                                      : err
                                                  )
                                                );
                                              }
                                            }}                                            
                                            className={salaryStructureTableErrors[index]?.amount ? 'error form-control' : 'form-control'}
                                          />
                                          {salaryStructureTableErrors[index]?.amount && (
                                            <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                              {salaryStructureTableErrors[index].amount}
                                            </div>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                </div>
              </TabPanel>
            </Tabs>
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleClosePermission}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
export default NewSalaryStructure
