import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const NewEmployeeDetails = ({ newEmployee }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [errors, setErrors] = React.useState({});
  const [empCode, setEmpCode] = React.useState("");
  const [empName, setEmpName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [dob, setDob] = React.useState(null);
  const [bloodGroup, setBloodGroup] = React.useState("");
  const [dept, setDept] = React.useState("");
  const [designation, setDesignation] = React.useState("");
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [joinDate, setJoinDate] = React.useState(null);
  const [pan, setPan] = React.useState("");
  const [aadharNo, setAadharNo] = React.useState("");
  const [mobNo, setMobNo] = React.useState("");
  const [altMobNo, setAltMobNo] = React.useState("");
  const [resigningDate, setResigningDate] = React.useState(null);
  const [bank, setBank] = React.useState("");
  const [accNo, setAccNo] = React.useState(1);
  const [ifsc, setIfsc] = React.useState("");
  const [reportPerson, setReportPerson] = React.useState("");
  const [savedData, setSavedData] = React.useState("");

  const handleTabSelect = (index) => {
    setTabIndex(index);
  };
  const buttonStyle = {
    fontSize: "20px", // Adjust the font size as needed save
  };

  const handleEmpCode = (event) => {
    setEmpCode(event.target.value);
  };
  const handleEmpName = (event) => {
    setEmpName(event.target.value);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  //   const handleDob = (event) => {
  //     setDob(event.target.value);
  //   };
  const handleDob = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setDob(formattedDate);
  };
  const handleBloodGroup = (event) => {
    setBloodGroup(event.target.value);
  };
  const handleDept = (event) => {
    setDept(event.target.value);
  };
  const handleDesignation = (event) => {
    setDesignation(event.target.value);
  };
  const handleRole = (event) => {
    setRole(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleJoinDate = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setJoinDate(formattedDate);
  };
  const handlePan = (event) => {
    setPan(event.target.value);
  };
  const handleAadharNo = (event) => {
    setAadharNo(event.target.value);
  };
  //   const handleUserType = (event) => {
  //     setUserType(event.target.value);
  //   };
  const handleResigningDate = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setResigningDate(formattedDate);
  };
  const handleMobNo = (event) => {
    setMobNo(event.target.value);
  };
  const handleAltMobNo = (event) => {
    setAltMobNo(event.target.value);
  };
  const handleBank = (event) => {
    setBank(event.target.value);
  };
  const handleAccNo = (event) => {
    setAccNo(event.target.value);
  };
  const handleIfsc = (event) => {
    setIfsc(event.target.value);
  };
  const handleReportPerson = (event) => {
    setReportPerson(event.target.value);
  };

  const handleNew = () => {
    setEmpCode("");
    setEmpName("");
    setGender("");
    setDob("");
    setBloodGroup("");
    setDept("");
    setDesignation("");
    setRole("");
    setEmail("");
    setJoinDate("");
    setPan("");
    setAadharNo("");
    // setUserType("");
    setMobNo("");
    setAltMobNo("");
    setResigningDate("");
    setBank("");
    setAccNo("");
    setIfsc("");
    setReportPerson("");
  };

  const handleValidation = () => {
    const newErrors = {};

    if (empCode.trim() === "") {
      newErrors.empCode = "Branch is required";
    }

    if (empName.trim() === "") {
      newErrors.empName = "BranchCode is required";
    }

    // if (gender.trim() === "") {
    //   newErrors.gender = "Company is required";
    // }

    // if (dob.trim() === "") {
    //   newErrors.dob = "Address is required";
    // }

    if (bloodGroup === "") {
      newErrors.bloodGroup = "City is required";
    }

    if (dept === "") {
      newErrors.dept = "State is required";
    }

    if (designation === "") {
      newErrors.designation = "Please select a valid country";
    }

    // if (role.trim() === "") {
    //   newErrors.role = "Zipcode is required";
    // }

    if (email.trim() === "") {
      newErrors.email = "Phone Number is required";
    }

    // if (joinDate.trim() === "") {
    //   newErrors.joinDate = "Email is required";
    // }

    // if (userType.trim() === "") {
    //   newErrors.userType = "Gst is required";
    // }

    if (mobNo.trim() === "") {
      newErrors.mobNo = "Address is required";
    }

    if (altMobNo === "") {
      newErrors.altMobNo = "City is required";
    }

    if (pan === "") {
      newErrors.pan = "State is required";
    }

    if (aadharNo === "") {
      newErrors.aadharNo = "Please select a valid country";
    }

    if (bank.trim() === "") {
      newErrors.bank = "Zipcode is required";
    }

    // if (accNo.trim() === "") {
    //   newErrors.accNo = "Phone Number is required";
    // }

    if (ifsc.trim() === "") {
      newErrors.ifsc = "Email is required";
    }

    // if (reportPerson.trim() === "") {
    //   newErrors.reportPerson = "Gst is required";
    // }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    // Create an object with the form data
    if (handleValidation()) {
      // Replace this with your logic to save the data to a backend or database
      const dataToSave = {
        empcode: empCode,
        empname: empName,
        gender: gender,
        date_of_birth: dob,
        blood: bloodGroup,
        department: dept,
        designation: designation,
        role: role,
        email: email,
        joining_date: joinDate,
        pan: pan,
        aadhar: aadharNo,
        mobile_no: mobNo,
        alternate_mobile_no: altMobNo,
        resigning_date: resigningDate,
        bank_name: bank,
        account_no: accNo,
        ifsc_code: ifsc,
        reporting_person: reportPerson,
      };
      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        // Make a POST request to your API endpoint to save the data
        Axios.post(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/employee`,
          dataToSave,
          { headers }
        )
          .then((response) => {
            console.log("Data saved successfully:", response.data);
            setSavedData(response.data);
            handleNew();
          })
          .catch((error) => {
            // Handle errors here
            console.error("Error saving data:", error);
          });
      }
    }
  };

  //   const handleSave = () => {
  //     if (handleValidation()) {
  //       // Replace this with your logic to save the data to a backend or database
  //       const dataToSave = {
  //         empcode: empCode,
  //         empname: empName,
  //         gender: gender,
  //         date_of_birth: dob,
  //         blood: bloodGroup,
  //         department: dept,
  //         designation: designation,
  //         role: role,
  //         email: email,
  //         joining_date: joinDate,
  //         pan: pan,
  //         aadhar: aadharNo,
  //         mobile_no: mobNo,
  //         alternate_mobile_no: altMobNo,
  //         resigning_date: resigningDate,
  //         bank_name: bank,
  //         account_no: accNo,
  //         ifsc_code: ifsc,
  //         reporting_person: reportPerson,
  //       };

  //       console.log("test", dataToSave);

  //       // handleEmail();

  //       const token = localStorage.getItem("token");

  //       if (token) {
  //         const headers = {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         };

  //         Axios.post(
  //           `${process.env.REACT_APP_API_URL}/api/basicMaster/employee`,
  //           dataToSave,
  //           { headers }
  //         )
  //           .then((response) => {
  //             console.log("Data saved successfully:", response.data);
  //             setSavedData(response.data);
  //             handleNew();
  //           })
  //           .catch((error) => {
  //             console.error("Error saving data:", error);
  //           });
  //       } else {
  //         console.error("User is not authenticated. Please log in.");
  //       }
  //     }
  //   };

  const handleClosePermission = () => {
    newEmployee(false);
  };

  return (
    <>
      <div>
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="row d-flex justify-content-center align-items-center">
            {/* <div className="d-flex flex-wrap justify-content-start">
              <button className="btn btn-ghost btn-sm normal-case col-xs-2">
                <AiOutlineWallet style={buttonStyle} />
                <span className="ml-1">New</span>
              </button>
              <button className="btn btn-ghost btn-sm normal-case col-xs-2">
                <AiOutlineSearch style={buttonStyle} />
                <span className="ml-1">Search</span>
              </button>
              <button className="btn btn-ghost btn-sm normal-case col-xs-2">
                <BsListTask style={buttonStyle} />
                <span className="ml-1">List View</span>
              </button>
            </div> */}
            <div className="d-flex justify-content-between">
              <h1 className="text-xl font-semibold mb-3">New Employee</h1>
              <IoMdClose
                type="button"
                className="cursor-pointer w-8 h-8 mb-3"
                onClick={handleClosePermission}
              />
            </div>
            <div className="row d-flex mt-3">
              <div className="col-md-4">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="employee"
                    label="Employee Code"
                    size="small"
                    value={empCode}
                    onChange={handleEmpCode}
                    error={Boolean(errors.empCode)}
                    required
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div>
              <div className="col-md-4">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="name"
                    label="Name"
                    size="small"
                    value={empName}
                    onChange={handleEmpName}
                    error={Boolean(errors.empName)}
                    required
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div>
              <div className="col-md-4">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    value={gender}
                    onChange={handleGender}
                    error={Boolean(errors.gender)}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Others"}>Others</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row d-flex mt-3">
              <div className="col-md-4">
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Birth"
                      slotProps={{
                        textField: { size: "small", clearable: true },
                      }}
                      value={dob}
                      onChange={handleDob}
                      // error={Boolean(errors.dob)}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
              <div className="col-md-4">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="bloodGroup"
                    label="Blood Group"
                    size="small"
                    value={bloodGroup}
                    onChange={handleBloodGroup}
                    error={Boolean(errors.bloodGroup)}
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div>
              <div className="col-md-4">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="department"
                    label="Department"
                    size="small"
                    value={dept}
                    onChange={handleDept}
                    error={Boolean(errors.dept)}
                    placeholder="Informaton Technology"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div>
            </div>
            <div className="row d-flex mt-3">
              <div className="col-md-4">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Designation
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Designation"
                    value={designation}
                    onChange={handleDesignation}
                    error={Boolean(errors.designation)}
                  >
                    <MenuItem value={"dev"}>Software Developer</MenuItem>
                    <MenuItem value={"eng"}>Software Engineer</MenuItem>
                    <MenuItem value={"infra"}>Infra</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Role"
                    value={role}
                    onChange={handleRole}
                    error={Boolean(errors.role)}
                  >
                    <MenuItem value={"User"}>User</MenuItem>
                    <MenuItem value={"Team Lead"}>Team Lead</MenuItem>
                    <MenuItem value={"Management"}>Management</MenuItem>
                    <MenuItem value={"HR"}>HR</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="email"
                    label="Email Id"
                    size="small"
                    value={email}
                    onChange={handleEmail}
                    error={Boolean(errors.email)}
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div>
            </div>
            <div className="row d-flex mt-3">
              <div className="col-md-4">
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Joining Date"
                      slotProps={{
                        textField: { size: "small", clearable: true },
                      }}
                      value={joinDate}
                      onChange={handleJoinDate}

                      // error={Boolean(errors.joinDate)}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
              <div className="col-md-4">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="pan"
                    label="PAN"
                    size="small"
                    value={pan}
                    onChange={handlePan}
                    error={Boolean(errors.pan)}
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div>
              <div className="col-md-4">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="aadharNo"
                    label="Aadhar"
                    size="small"
                    value={aadharNo}
                    onChange={handleAadharNo}
                    error={Boolean(errors.aadharNo)}
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div>
            </div>
            <div className="row d-flex mt-3">
              <div className="col-md-4">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="mobileNumber"
                    label="Mobile"
                    size="small"
                    value={mobNo}
                    onChange={handleMobNo}
                    error={Boolean(errors.mobNo)}
                    required
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div>
              <div className="col-md-4">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="alternateMobile"
                    label="Alternate Mobile"
                    size="small"
                    value={altMobNo}
                    onChange={handleAltMobNo}
                    error={Boolean(errors.altMobNo)}
                    required
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div>
              <div className="col-md-4">
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Resigning Date"
                      slotProps={{
                        textField: { size: "small", clearable: true },
                      }}
                      value={resigningDate}
                      onChange={handleResigningDate}
                      error={Boolean(errors.joinDate)}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
            </div>
            <div className="row d-flex mt-3">
              <div className="col-md-4 mb-3">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Active"
                  />
                </FormGroup>
              </div>
            </div>
            <Tabs
              className="mt-4   "
              selectedIndex={tabIndex}
              onSelect={handleTabSelect}
            >
              <TabList>
                <Tab>Bank Account Details</Tab>
                <Tab>Reporting Person / Approval Person</Tab>
              </TabList>

              <TabPanel>
                <div className="row d-flex mt-3">
                  <div className="col-md-4">
                    <FormControl fullWidth variant="filled">
                      <TextField
                        id="bankName"
                        label="Bank Name"
                        size="small"
                        value={bank}
                        onChange={handleBank}
                        error={Boolean(errors.bank)}
                        //placeholder="accountcode"
                        inputProps={{ maxLength: 30 }}
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-4">
                    <FormControl fullWidth variant="filled">
                      <TextField
                        id="accountNo"
                        label="Account Number"
                        size="small"
                        value={accNo}
                        type="number"
                        onChange={handleAccNo}
                        error={Boolean(errors.accNo)}
                        //placeholder="accountcode"
                        inputProps={{ maxLength: 30 }}
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-4">
                    <FormControl fullWidth variant="filled">
                      <TextField
                        id="ifscCode"
                        label="IFSC Code"
                        size="small"
                        value={ifsc}
                        onChange={handleIfsc}
                        error={Boolean(errors.ifsc)}
                        //placeholder="accountcode"
                        inputProps={{ maxLength: 30 }}
                      />
                    </FormControl>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="row d-flex mt-3">
                  <div className="col-md-4">
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        Reporting Person
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //multiple

                        label="Reporting Person"
                        value={reportPerson}
                        onChange={handleReportPerson}
                        error={Boolean(errors.reportPerson)}
                      >
                        <MenuItem value={"Manager"}>Manager</MenuItem>
                        <MenuItem value={"Team Lead"}>Team Lead</MenuItem>
                        <MenuItem value={"HR"}>HR</MenuItem>
                      </Select>
                    </FormControl>
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
  );
};
export default NewEmployeeDetails;
