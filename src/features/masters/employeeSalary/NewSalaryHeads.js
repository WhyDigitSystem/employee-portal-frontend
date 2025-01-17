import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import "react-tabs/style/react-tabs.css";
import {FormHelperText } from '@mui/material';

const NewSalaryHeads = ({newSalary}) => {
    const [branch, setBranch] = React.useState("");
    const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
    const [loginEmpName, setLoginEmpName] = React.useState(
       localStorage.getItem("empname")
    );
    const [errors, setErrors] = React.useState({});
    const [savedData, setSavedData] = React.useState("");
    const [salaryHeadsTable, setSalaryHeadsTable] = useState([
        {
          id: 1,
          headings:'',
          code:'',
          category:'',
          type:'',
          amount:'',
          active: true
        }
    ]);
    const [salaryHeadsTableErrors, setSalaryHeadsTableErrors] = useState([
        {
            id: 1,
            headings:'',
            code:'',
            category:'',
            type:'',
            amount:'',
            active: true
        }
    ]);
  
    const handleInputChange = (e) => {
      const { name, value, checked, selectionStart, selectionEnd, type } = e.target;
      const nameRegex = /^[A-Za-z ]*$/;
      const numericRegex = /^[0-9]*$/;
      let errorMessage = '';

      // switch (name) {
      //   case 'headings':
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
        console.log("Test",errorMessage);
        setSalaryHeadsTableErrors({ ...salaryHeadsTableErrors, [name]: errorMessage });
      }
      else if (type === 'checkbox') { 
        setSalaryHeadsTable((prevData) => ({ ...prevData, [name]: checked }));
      }
      else {
        // Clear error message for valid input
        setSalaryHeadsTableErrors({ ...salaryHeadsTableErrors, [name]: '' });
        setSalaryHeadsTable({ ...salaryHeadsTable, [name]: value });
        // setSalaryHeadsTable((prevData) => ({ ...prevData, [name]: checked }));
  
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
    const handleValidation = () => {
      const newErrors = {};
      // if (empCode.trim() === "") {
      //   newErrors.empCode = "Branch is required";
      // }
      // if (empName.trim() === "") {
      //   newErrors.empName = "BranchCode is required";
      // }
      // if (gender.trim() === "") {
      //   newErrors.gender = "Company is required";
      // }
      // if (grade.trim() === "") {
      //   newErrors.grade = "Company is required";
      // }
      // if (bloodGroup === "") {
      //   newErrors.bloodGroup = "City is required";
      // }
      setErrors(newErrors);
  
      return Object.keys(newErrors).length === 0;
    };
    const handleSave = () => {
      console.log("handlesave is working");
  
      if (handleValidation()) {
        console.log("handle validation is working");
  
        const dataToSave = {
          orgid: orgId,
          amount: parseInt(salaryHeadsTable.amount),
          category: salaryHeadsTable.category,
          code: salaryHeadsTable.code,
          headings: salaryHeadsTable.headings,
          type: salaryHeadsTable.type,
          active: salaryHeadsTable.active === true ? true : false,
          updatedby: loginEmpName,
          createdby: loginEmpName,
        };
         
        console.log("DataToSave:", dataToSave);
        // console.log("DataToSaveUser:", dataToSaveUser);
        const token = localStorage.getItem("token");
  
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
          Axios.post(
            `${process.env.REACT_APP_API_URL}/api/salaryMaster/createSalaryMaster`,
            dataToSave,
            { headers }
          )
          // Axios.post(
          //   `${process.env.REACT_APP_API_URL}/api/user/signup`,
          //   dataToSaveUser,
          //   { headers }
          // )
            .then((response) => {
              console.log("Data saved successfully:", response.data);
              setSavedData(response.data);
              // handleNew();
              // handleLeaveAllocationSave();
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
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="headings"
                    name="headings"
                    label="Headings"
                    size="small"
                    value={salaryHeadsTable.headings}
                    onChange={handleInputChange}
                    error={Boolean(salaryHeadsTableErrors.headings)}
                    required
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
            </div>
            <div className="col-md-4 mb-3">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="code"
                    name="code"
                    label="Code"
                    size="small"
                    value={salaryHeadsTable.code}
                    onChange={handleInputChange}
                    error={Boolean(salaryHeadsTableErrors.code)}
                    required
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
            </div>
            <div className="col-md-4 mb-3">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="category"
                    name="category"
                    label="Category"
                    size="small"
                    value={salaryHeadsTable.category}
                    onChange={handleInputChange}
                    error={Boolean(salaryHeadsTableErrors.category)}
                    required
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
            </div>
            <div className="col-md-4 mb-3">
                  <FormControl size="small" variant="outlined" fullWidth error={!!salaryHeadsTableErrors.type}>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                      labelId="type-label"
                      label="type"
                      value={salaryHeadsTable.type}
                      onChange={handleInputChange}
                      name="type"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="D">DEDUCTION</MenuItem>
                      <MenuItem value="E">EARNING</MenuItem>
                    </Select>
                    {salaryHeadsTableErrors.type && <FormHelperText>{salaryHeadsTableErrors.type}</FormHelperText>}
                  </FormControl>
                </div>
            <div className="col-md-4 mb-3">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="amount"
                    name="amount"
                    label="Amount"
                    size="small"
                    value={salaryHeadsTable.amount}
                    onChange={handleInputChange}
                    error={Boolean(salaryHeadsTableErrors.amount)}
                    required
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
            </div>
            <div className="col-md-4 mb-3 mb-3">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Active"
                    name="active"
                    typeof="checkbox"
                  />
                </FormGroup>
              </div>
          </div>
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
export default NewSalaryHeads
