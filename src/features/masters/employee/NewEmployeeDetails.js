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
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { encryptPassword } from "../../user/components/utils";

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
  const [accNo, setAccNo] = React.useState("");
  const [ifsc, setIfsc] = React.useState("");
  const [reportPerson, setReportPerson] = React.useState("");
  const [savedData, setSavedData] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [team, setTeam] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [loginEmpName, setLoginEmpName] = React.useState(localStorage.getItem("empname"));
  const [reportingPersonRole, setReportingPersonRole] = React.useState("");
  const [reportPersonOptions, setReportPersonOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  // LEAVE PROCESS FIELDS
  const [casual, setCasual] = useState("");
  const [sick, setSick] = useState("");
  const [annual, setAnnual] = useState("");
  const [maternity, setMaternity] = useState("");
  const [paternity, setPaternity] = useState("");
  const [parental, setParental] = useState("");
  const [bereavement, setBereavement] = useState("");
  const [compensatory, setCompensatory] = useState("");
  const [orgLeaveTypeList, setOrgLeaveTypeList] = useState([]);
  // const orgLeaveTypeList = [
  //   { "name": "Casual Leave" },
  //   { "name": "Sick Leave" },
  //   { "name": "Annual Leave" },
  //   { "name": "Maternity Leave" },
  //   { "name": "Paternity Leave" },
  //   { "name": "Parental Leave" },
  //   { "name": "Compensatory Leave" },
  // ];

  const pwd = empCode + dob;
  const trimmedpwd = pwd.trim();

  useEffect(() => {
    fetchBranchName();
    getLeaveTypeName();
    const fetchReportingPersons = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/employee/role?orgId=1&role=${reportingPersonRole}`
        );
        if (response.data.statusFlag === "Ok") {
          setReportPersonOptions(response.data.paramObjectsMap.Employee);
        }
      } catch (error) {
        console.error("Error fetching reporting persons:", error);
      }
    };

    if (reportingPersonRole) {
      fetchReportingPersons();
    }
  }, [reportingPersonRole, gender]);

  const fetchBranchName = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/getbranch/{orgId}?orgId=${orgId}`
      );
      if (response.data.statusFlag === "Ok") {
        setBranchOptions(response.data.paramObjectsMap.branchVO);
      }
    } catch (error) {
      console.error("Error fetching reporting persons:", error);
    }
  };

  const getLeaveTypeName = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/getLeaveTypeNameByOrgId?orgId=${orgId}`
      );
      if (response.data.statusFlag === "Ok") {
        setOrgLeaveTypeList(response.data.paramObjectsMap.leaveType);
        console.log(response.data.paramObjectsMap.leaveType);
      }
    } catch (error) {
      console.error("Error fetching Leave Types:", error);
    }
  };

  const handleTabSelect = (index) => {
    setTabIndex(index);
  };
  const buttonStyle = {
    fontSize: "20px",
  };

  const handleEmpCode = (event) => {
    setEmpCode(event.target.value);
  };
  const handleEmpName = (event) => {
    const alphaValue = event.target.value.replace(/[^A-Za-z ]/g, "");
    setEmpName(alphaValue);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  const handleGrade = (event) => {
    setGrade(event.target.value);
  };
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
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setAadharNo(numericValue);
  };
  const handleResigningDate = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setResigningDate(formattedDate);
  };
  const handleMobNo = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setMobNo(numericValue);
  };
  const handleAltMobNo = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setAltMobNo(numericValue);
  };
  const handleBank = (event) => {
    const alphaValue = event.target.value.replace(/[^A-Za-z]/g, "");
    setBank(alphaValue);
  };
  const handleAccNo = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setAccNo(numericValue);
  };
  const handleIfsc = (event) => {
    setIfsc(event.target.value);
  };
  const handleReportPersonChange = (event) => {
    setReportPerson(event.target.value);
  };
  const handleTeam = (event) => {
    setTeam(event.target.value);
  };
  const handleBranch = (event) => {
    setBranch(event.target.value);
  };

  const handleReportingPersonRoleChange = (event) => {
    setReportingPersonRole(event.target.value);
  };

  const handleCasual = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setCasual(numericValue);
  };
  const handleSick = (event) => {

    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setSick(numericValue);
  };
  const handleAnnual = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setAnnual(numericValue);
  };
  const handleMaternity = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setMaternity(numericValue);
  };
  const handlePaternity = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setPaternity(numericValue);
  };
  const handleParental = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setParental(numericValue);
  };
  const handleBereavement = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setBereavement(numericValue);
  };
  const handleCompensatory = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setCompensatory(numericValue);
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
    setGrade("");
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
    setCasual("");
    setSick("")
    setAnnual("")
    setMaternity("")
    setPaternity("")
    setParental("")
    setBereavement("")
    setCompensatory("")
  };

  const handleValidation = () => {
    const newErrors = {};
    if (empCode.trim() === "") {
      newErrors.empCode = "Branch is required";
    }
    if (empName.trim() === "") {
      newErrors.empName = "BranchCode is required";
    }
    if (gender.trim() === "") {
      newErrors.gender = "Company is required";
    }
    if (grade.trim() === "") {
      newErrors.grade = "Company is required";
    }
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
    if (role.trim() === "") {
      newErrors.role = "Zipcode is required";
    }
    if (email.trim() === "") {
      newErrors.email = "Phone Number is required";
    }
    // if (joinDate.trim() === "") {
    //   newErrors.joinDate = "Email is required";
    // }
    if (mobNo.trim() === "") {
      newErrors.mobNo = "Address is required";
    }
    // if (altMobNo === "") {
    //   newErrors.altMobNo = "City is required";
    // }
    // if (pan === "") {
    //   newErrors.pan = "State is required";
    // }
    // if (aadharNo === "") {
    //   newErrors.aadharNo = "Please select a valid country";
    // }
    if (bank.trim() === "") {
      newErrors.bank = "Zipcode is required";
    }
    // if (accNo.trim() === "") {
    //   newErrors.accNo = "Phone Number is required";
    // }
    // if (ifsc.trim() === "") {
    //   newErrors.ifsc = "Email is required";
    // }
    if (reportPerson.trim() === "") {
      newErrors.reportPerson = "Gst is required";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (handleValidation()) {
      const dataToSave = {
        orgId: orgId,
        branchId: branch,
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
        updatedby: loginEmpName,
        createdby: loginEmpName,
      };
      const dataToSaveUser = {
        //orgId: orgId,
        branchId: branch,
        empcode: empCode,
        empname: empName,
        role: role,
        email: email,
        updatedby: loginEmpName,
        createdby: loginEmpName,
        password: encryptPassword(trimmedpwd),
      };

      console.log("DataToSave:", dataToSave);
      console.log("DataToSaveUser:", dataToSaveUser);
      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        Axios.post(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/employee`,
          dataToSave,
          { headers }
        );
        Axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/signup`,
          dataToSaveUser,
          { headers }
        )
          .then((response) => {
            console.log("Data saved successfully:", response.data);
            setSavedData(response.data);
            // handleNew();
            handleLeaveAllocationSave();
          })
          .catch((error) => {
            console.error("Error saving data:", error);
          });
      }
    }
  };

  const handleLeaveAllocationSave = () => {
    // if (handleValidation()) {
    const dataToSaveLeaveAllocation = {
      orgId: orgId,
      // branchId: branch,
      empcode: empCode,
      empname: empName,
      casual: casual,
      sick: sick,
      annual: annual,
      maternity: maternity,
      paternity: paternity,
      parental: parental,
      bereavement: bereavement,
      compensatory: compensatory,
      updatedby: loginEmpName,
      createdby: loginEmpName,
    };

    console.log("DataToSaveLeaveAllocation:", dataToSaveLeaveAllocation);
    const token = localStorage.getItem("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      Axios.post(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/leaveEligible`,
        dataToSaveLeaveAllocation,
        { headers }
      )
        .then((response) => {
          console.log("Data saved successfully:", response.data);
          setSavedData(response.data);
          handleNew();
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    }
    // }
  };

  const handleClosePermission = () => {
    newEmployee(false);
  };

  return (
    <>
      <div>
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="row d-flex justify-content-center align-items-center">
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
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Branch
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //multiple

                    label="Branch"
                    value={branch}
                    onChange={handleBranch}
                    error={Boolean(errors.branch)}
                  >
                    {branchOptions.map((branchData) => (
                      <MenuItem key={branchData.id} value={branchData.id}>
                        {branchData.branchName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4 mb-3">
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
              <div className="col-md-4 mb-3">
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
                    inputProps={{ maxLength: 50 }}
                  />
                </FormControl>
              </div>
              <div className="col-md-4 mb-3">
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

              <div className="col-md-4 mb-3">
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

              <div className="col-md-4 mb-3">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Blood Group"
                    value={bloodGroup}
                    onChange={handleBloodGroup}
                    error={Boolean(errors.bloodGroup)}
                  >
                    <MenuItem value={"A+"}>A+</MenuItem>
                    <MenuItem value={"A-"}>A-</MenuItem>
                    <MenuItem value={"B+"}>B+</MenuItem>
                    <MenuItem value={"B-"}>B-</MenuItem>
                    <MenuItem value={"AB+"}>AB+</MenuItem>
                    <MenuItem value={"AB-"}>AB-</MenuItem>
                    <MenuItem value={"O+"}>O+</MenuItem>
                    <MenuItem value={"O-"}>O-</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="col-md-4 mb-3">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Department"
                    value={dept}
                    onChange={handleDept}
                    error={Boolean(errors.dept)}
                  >
                    <MenuItem value={"IT"}>IT</MenuItem>
                    <MenuItem value={"Support"}>Support</MenuItem>
                    <MenuItem value={"Sales"}>Sales</MenuItem>
                    <MenuItem value={"Accounts"}>Accounts</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="col-md-4 mb-3">
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
                    <MenuItem value={"Desktop App Developer"}>
                      Software Developer
                    </MenuItem>
                    <MenuItem value={"Desktop App Developer"}>
                      SQL Developer
                    </MenuItem>
                    <MenuItem value={"Frontend Developer"}>
                      Frontend Developer
                    </MenuItem>
                    <MenuItem value={"Backend Developer"}>
                      Backend Developer
                    </MenuItem>
                    <MenuItem value={"Full Stack Developer"}>
                      Full Stack Developer
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="col-md-4 mb-3">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Role"
                    value={role}
                    onChange={handleRole}
                    error={Boolean(errors.role)}
                  >
                    <MenuItem value={"USER"}>User</MenuItem>
                    <MenuItem value={"TEAM_LEAD"}>Team Lead</MenuItem>
                    <MenuItem value={"PROJECT MANAGER"}>Project Manager</MenuItem>
                    <MenuItem value={"MANAGEMENT"}>Management</MenuItem>
                    <MenuItem value={"HR"}>HR</MenuItem>
                    <MenuItem value={"ADMIN"}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4 mb-3">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Grade"
                    value={grade}
                    onChange={handleGrade}
                    error={Boolean(errors.grade)}
                  >
                    <MenuItem value={"A"}>A</MenuItem>
                    <MenuItem value={"B"}>B</MenuItem>
                    <MenuItem value={"C"}>C</MenuItem>
                    <MenuItem value={"D"}>D</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4 mb-3">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Team</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Team"
                    value={team}
                    onChange={handleTeam}
                  //error={Boolean(errors.team)}
                  >
                    <MenuItem value={"Core"}>Core</MenuItem>
                    <MenuItem value={"Product"}>Product</MenuItem>
                    <MenuItem value={"Accounts"}>Accounts</MenuItem>
                    <MenuItem value={"Office"}>Office</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4 mb-3">
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

              <div className="col-md-4 mb-3">
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
              <div className="col-md-4 mb-3">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="pan"
                    label="PAN"
                    size="small"
                    value={pan}
                    onChange={handlePan}
                    error={Boolean(errors.pan)}
                    inputProps={{ maxLength: 10 }}
                  />
                </FormControl>
              </div>
              <div className="col-md-4 mb-3">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="aadharNo"
                    label="Aadhar"
                    size="small"
                    value={aadharNo}
                    onChange={handleAadharNo}
                    error={Boolean(errors.aadharNo)}
                    inputProps={{ maxLength: 12 }}
                  />
                </FormControl>
              </div>

              {/* MOBILE NO FIELD */}
              <div className="col-md-4 mb-3">
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
                    inputProps={{ maxLength: 10 }}
                  />
                </FormControl>
              </div>

              {/* ALTERNATIVE MOBILE NO FIELD */}
              <div className="col-md-4 mb-3">
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
                    inputProps={{ maxLength: 10 }}
                  />
                </FormControl>
              </div>

              {/* RESIGNATION FIELD */}
              <div className="col-md-4 mb-3">
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

              {/* ACTIVE FIELD */}
              <div className="col-md-4 mb-3 mb-3">
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
                <Tab>Leave Allocation</Tab>
              </TabList>

              {/* BANK DETAILS TAB */}
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
                        //type="number"
                        onChange={handleAccNo}
                        error={Boolean(errors.accNo)}
                        inputProps={{ maxLength: 20 }}
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

              {/* REPORTING PERSON TAB */}
              <TabPanel>
                <div className="row d-flex mt-3">
                  <div className="col-md-4">
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        Reporting Person Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //multiple

                        label="Reporting Person Role"
                        value={reportingPersonRole}
                        onChange={handleReportingPersonRoleChange}
                        error={Boolean(errors.reportingPersonRole)}
                      >
                        <MenuItem value={"TEAM_LEAD"}>Team Lead</MenuItem>
                        <MenuItem value={"MANAGER"}>Manager</MenuItem>
                        <MenuItem value={"MANAGEMENT"}>Management</MenuItem>
                        <MenuItem value={"HR"}>HR</MenuItem>
                        {/* <MenuItem value={"ADMIN"}>Admin</MenuItem> */}
                      </Select>
                    </FormControl>
                  </div>

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
                        onChange={handleReportPersonChange}
                        error={Boolean(errors.reportPerson)}
                      >
                        {reportPersonOptions.map((person) => (
                          <MenuItem key={person.Id} value={person.Id}>
                            {person.Empname}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </TabPanel>

              {/* LEAVE PROCESS TAB */}
              <TabPanel>
                <div className="row d-flex mt-3">
                  {/* CASUAL LEAVE FIELD */}
                  {orgLeaveTypeList.some(item => item.LeaveType === "Casual Leave") && (
                    <div className="col-md-4 mb-3 ">
                      <FormControl fullWidth variant="filled">
                        <TextField
                          id="casual"
                          label="Casual"
                          size="small"
                          value={casual}
                          onChange={handleCasual}
                          error={Boolean(errors.casual)}
                          inputProps={{ maxLength: 2 }}
                        />
                      </FormControl>
                    </div>
                  )}

                  {/* SICK LEAVE FIELD */}
                  {orgLeaveTypeList.some(item => item.LeaveType === "Sick Leave") && (
                    <div className="col-md-4 mb-3">
                      <FormControl fullWidth variant="filled">
                        <TextField
                          id="sick"
                          label="Sick"
                          size="small"
                          value={sick}
                          onChange={handleSick}
                          error={Boolean(errors.sick)}
                          inputProps={{ maxLength: 2 }}
                        />
                      </FormControl>
                    </div>
                  )}

                  {/* ANNUAL LEAVE FIELD */}
                  {orgLeaveTypeList.some(item => item.LeaveType === "Annual Leave") && (
                    <div className="col-md-4 mb-3">
                      <FormControl fullWidth variant="filled">
                        <TextField
                          id="annual"
                          label="Annual"
                          size="small"
                          value={annual}
                          onChange={handleAnnual}
                          error={Boolean(errors.annual)}
                          inputProps={{ maxLength: 2 }}
                        />
                      </FormControl>
                    </div>
                  )}

                  {/* MATERNITY LEAVE FIELD */}
                  {orgLeaveTypeList.some(item => item.LeaveType === "Maternity Leave" && gender === 'Female') && (
                    <div className="col-md-4 mb-3">
                      <FormControl fullWidth variant="filled">
                        <TextField
                          id="maternity"
                          label="Maternity"
                          size="small"
                          value={maternity}
                          onChange={handleMaternity}
                          error={Boolean(errors.maternity)}
                          inputProps={{ maxLength: 2 }}
                        />
                      </FormControl>
                    </div>
                  )}

                  {/* PATERNITY LEAVE FIELD */}
                  {orgLeaveTypeList.some(item => item.LeaveType === "Paternity Leave") && (
                    <div className="col-md-4 mb-3">
                      <FormControl fullWidth variant="filled">
                        <TextField
                          id="paternity"
                          label="Paternity"
                          size="small"
                          value={paternity}
                          onChange={handlePaternity}
                          error={Boolean(errors.paternity)}
                          inputProps={{ maxLength: 2 }}
                        />
                      </FormControl>
                    </div>
                  )}

                  {/* PARENTAL LEAVE FIELD */}
                  {orgLeaveTypeList.some(item => item.LeaveType === "Parental Leave") && (
                    <div className="col-md-4 mb-3">
                      <FormControl fullWidth variant="filled">
                        <TextField
                          id="parental"
                          label="Parental"
                          size="small"
                          value={parental}
                          onChange={handleParental}
                          error={Boolean(errors.parental)}
                          inputProps={{ maxLength: 2 }}
                        />
                      </FormControl>
                    </div>
                  )}

                  {/* BEREAVEMENT LEAVE FIELD */}
                  {orgLeaveTypeList.some(item => item.LeaveType === "Bereavement Leave") && (
                    <div className="col-md-4 mb-3">
                      <FormControl fullWidth variant="filled">
                        <TextField
                          id="bereavement"
                          label="Bereavement"
                          size="small"
                          value={bereavement}
                          onChange={handleBereavement}
                          error={Boolean(errors.bereavement)}
                          inputProps={{ maxLength: 2 }}
                        />
                      </FormControl>
                    </div>
                  )}

                  {/* COMPENSATORY LEAVE FIELD */}
                  {orgLeaveTypeList.some(item => item.LeaveType === "Compensatory Leave") && (
                    <div className="col-md-4 mb-3">
                      <FormControl fullWidth variant="filled">
                        <TextField
                          id="compensatory"
                          label="compensatory"
                          size="small"
                          value={compensatory}
                          onChange={handleCompensatory}
                          error={Boolean(errors.compensatory)}
                          inputProps={{ maxLength: 2 }}
                        />
                      </FormControl>
                    </div>
                  )}

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
