import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Axios from "axios";
//import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
//import { IoMdClose } from "react-icons/io";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import "react-tabs/style/react-tabs.css";
import ToastComponent from "../../../utils/ToastComponent";

const OrganizationSetup = () => {
  //ORGANIZATION
  const [orgName, setOrgName] = useState("");
  const [orgCode, setOrgCode] = useState("");
  const [founder, setFounder] = useState("");
  const [ceo, setCeo] = useState("");
  const [phNo, setPhNo] = useState("");
  const [address, setAddress] = useState("");
  const [pan, setPan] = useState("");
  const [gst, setGst] = useState("");
  const [errors, setErrors] = useState("");
  const [savedData, setSavedData] = useState("");
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  const [tabValue, setTabValue] = useState(0);
  //BRANCH
  //const [orgId, setOrgId] = useState("1");
  // const [branchOrgCode, setBranchOrgCode] = useState("4");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [branchOrgCode, setBranchOrgCode] =  useState(""); 
  const [branchName, setBranchName] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [branchManager, setBranchManager] = useState("");
  const [branchPhNo, setBranchPhNo] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [branchPan, setBranchPan] = useState("");
  const [branchGst, setBranchGst] = useState("");
//BRANCH ADMIN CREDINCIAL STATES
//const [brName, setBrName] = useState("");
const [branches, setBranches] = useState([]);
const [brCode, setBrCode] = useState("");
const [brAdminName, setBrAdminName] = useState("");
const [brAdminEmail, setBrAdminEmail] = useState("");
const [brAdminPwd, setBrAdminPwd] = useState("");
//USE EFFECT STATES
const [branchId, setBranchId] = useState("");
const [orgData, setOrgData] = useState([]);


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  //ORGANIZATION TAB

  // const handleOrgName = (event) => {
  //   setOrgName(event.target.value);
  // };

  const handleFounder = (event) => {
    const alphaValue = event.target.value.replace(/[^A-Za-z ]/g, "");
    setFounder(alphaValue);
  };
  const handleCeo = (event) => {
    setCeo(event.target.value);
  };
  const handlePhNo = (event) => {
    setPhNo(event.target.value);
  };
  const handlePan = (event) => {
    setPan(event.target.value);
  };
  const handleGst = (event) => {
    setGst(event.target.value);
  };
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleOrgCode = (event) => {
    setOrgCode(event.target.value);
  };

  //BRANCH TAB
  const handleBranchName = (event) => {
    const alphaValue = event.target.value.replace(/[^A-Za-z ]/g, "");
    setBranchName(alphaValue);
  };
  const handleBranchCode = (event) => {
    setBranchCode(event.target.value);
  };
  const handleBranchManager = (event) => {
    const alphaValue = event.target.value.replace(/[^A-Za-z ]/g, "");
    setBranchManager(alphaValue);
  };
  const handleBranchAddress = (event) => {
    setBranchAddress(event.target.value);
  };
  const handleBranchPhNo = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setBranchPhNo(numericValue);
  };
  const handleBranchGst = (event) => {
    setBranchGst(event.target.value);
  };
  const handleBranchPan = (event) => {
    const sanitizedValue = event.target.value.replace(/[^A-Za-z0-9]/g, '');
    setBranchPan(sanitizedValue);
  };

  //BRANCH ADMIN CREDINCIALS TAB
  const handleBrName = (event) => {
    setBranches(event.target.value);
  };
  const handleBrCode = (event) => {
    setBrCode(event.target.value);
  };
  const handleBrAdminName = (event) => {
    setBrAdminName(event.target.value);
  };
  const handleBrAdminEmail = (event) => {
    setBrAdminEmail(event.target.value);
  };
  const handleBrAdminPwd = (event) => {
    setBrAdminPwd(event.target.value);
  };
  

  useEffect(()=> {
    getOrgById()
    getBranchByOrgId()
  },[]);

  const getBranchByOrgId = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/getbranch/{orgId}?orgId=${orgId}`
      );

      if (response.status === 200) {
      //   const branchData = response.data.paramObjectsMap.branchVO[0]; // Accessing the first element of branchVO
      // console.log("BranchName:", branchData.branchName);
        
      //   //console.log("BranchName:",response.data.paramObjectsMap.branchVO.branchName[0])  
      
      const branchData = response.data.paramObjectsMap.branchVO;
      setBranches(branchData);

      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getOrgById = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/orginization/${orgId}`
      );

      if (response.status === 200) {
        setOrgData(response.data.paramObjectsMap.organizationVO);
        setOrgName(response.data.paramObjectsMap.organizationVO.name); 
        setBranchOrgCode(response.data.paramObjectsMap.organizationVO.orgCode); 
        console.log("OrganizationName:",response.data.paramObjectsMap.organizationVO.name)       
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  // ORGANIZATION API
  const handleNew = () => {
    setOrgCode("");
    setFounder("");
    setCeo("");
    setPhNo("");
    setAddress("");
    setPan("");
    setGst("");
  };

  const handleValidation = () => {
    const newErrors = {};

    if (!orgCode) {
      newErrors.orgCode = "Org Code is required";
    }

    if (!founder) {
      newErrors.founder = "Founder is required";
    }

    if (!ceo) {
      newErrors.ceo = "CEO is required";
    }

    if (!phNo) {
      newErrors.phNo = "Phone No is required";
    }
    if (!address) {
      newErrors.address = "Address is required";
    }

    if (!pan) {
      newErrors.pan = "PAN is required";
    }

    if (!gst) {
      newErrors.gst = "GST No is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (handleValidation()) {
      const dataToSaveOrg = {
        name: orgName,
        id: orgId,
        orgCode: orgCode,
        founder: founder,
        ceo: ceo,
        phoneNumber: phNo,
        address: address,
        pan: pan,
        gst: gst,
      };

      console.log("Org Setup Data:",dataToSaveOrg)

      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        Axios.post(
          `${process.env.REACT_APP_API_URL}/api/admin/updateOrginization`,
          dataToSaveOrg,
          { headers }
        )
          .then((response) => {
            console.log("Data saved successfully:", response.data);
            setSavedData(response.data);
            handleNew();
            setErrorType("success");
            setMessage("Data saved successfully!");
            setNotification(true);
          })
          .catch((error) => {
            console.error("Error saving data:", error);
            setErrorType("error");
            setMessage("Data Not Saved!");
            setNotification(true);
          });
      }
    }
  };

  // BRACH API
  const handleNewBranch = () => {
    //setOrgCode("");
    setBranchCode("");
    setBranchName("");
    setBranchManager("");
    setBranchPhNo("");
    setBranchAddress("");
    setBranchPan("");
    setBranchGst("");
  };

  const handleBranchValidation = () => {
    const newErrors = {};

    if (!branchCode) {
      newErrors.branchCode = "Branch Code is required";
    }

    if (!branchName) {
      newErrors.branchName = "Branch Name is required";
    }

    if (!branchManager) {
      newErrors.branchManager = "Branch Manager is required";
    }

    if (!branchPhNo) {
      newErrors.branchPhNo = "Phone No is required";
    }
    if (!branchAddress) {
      newErrors.branchAddress = "Address is required";
    }

    if (!branchPan) {
      newErrors.branchPan = "PAN is required";
    }

    if (!branchGst) {
      newErrors.branchGst = "GST No is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveBranch = () => {
    if (handleBranchValidation()) {
      const dataToSaveBranch = {
        orgId: orgId,
        //id: orgId,
        branchCode: branchCode,
        branchName: branchName,
        address: branchAddress,
        branchManager: branchManager,
        phoneNumber: branchPhNo,
        address: branchAddress,
        pan: branchPan,
        gst: branchGst,
      };

      console.log("Branch Data:",dataToSaveBranch)

      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        Axios.post(
          `${process.env.REACT_APP_API_URL}/api/admin/craeteBranch`,
          dataToSaveBranch,
          { headers }
        )
          .then((response) => {
            console.log("Data saved successfully:", response.data);
            setSavedData(response.data);
            handleNewBranch();
            setErrorType("success");
            setMessage("Data saved successfully!");
            setNotification(true);
          })
          .catch((error) => {
            console.error("Error saving data:", error);
            setErrorType("error");
            setMessage("Data Not Saved!");
            setNotification(true);
          });
      }
    }
  };



  return (
    <>
      <div>
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="row d-flex justify-content-center align-items-center">
            {/* <div className="d-flex justify-content-between">
              <h1 className="text-xl font-semibold mb-3">Organization Setup</h1>
              <IoMdClose
                type="button"
                className="cursor-pointer w-8 h-8 mb-3"
                onClick={handleNewOrgClose}
              />
            </div> */}
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Organization Info" />
              <Tab label="Branch" />
              <Tab label="Branch Admin Credincials" />
            </Tabs>

{/* ORGANIZATION TAB */}
            <Box hidden={tabValue !== 0}>
              <div className="row d-flex mt-3">
                {/* <div className="col-md-4 mb-3">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Organization
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Organization"
                      value={orgName}
                      onChange={handleOrgName}
                      error={Boolean(errors.orgName)}
                    >
                      <MenuItem value={"MindsKart"}>MindsKart</MenuItem>
                      <MenuItem value={"AI Packs"}>AI Packs</MenuItem>
                    </Select>
                  </FormControl>
                </div> */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="orgname"
                      label="Organization Name"
                      size="small"
                      value={orgName}
                      // onChange={handleOrgName}
                      // error={Boolean(errors.orgName)}
                      // required
                      disabled
                      //placeholder="accountcode"
                      inputProps={{ maxLength: 30 }}
                    />
                  </FormControl>
                </div>

                {/* ORG CODE FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="orgcode"
                      label="Org Code"
                      size="small"
                      value={orgCode}
                      onChange={handleOrgCode}
                      error={Boolean(errors.orgCode)}
                      //placeholder="accountcode"
                      inputProps={{ maxLength: 10 }}
                      required
                    />
                    {errors.orgCode && (
                      <span className="text-red-500">{errors.orgCode}</span>
                    )}
                  </FormControl>
                </div>

                {/* FOUNDER FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="founder"
                      label="Founder"
                      size="small"
                      value={founder}
                      onChange={handleFounder}
                      error={Boolean(errors.founder)}
                      inputProps={{ maxLength: 30 }}
                      required
                    />
                    {errors.founder && (
                      <span className="text-red-500">{errors.founder}</span>
                    )}
                  </FormControl>
                </div>

                {/* CEO FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="CEO"
                      label="CEO"
                      size="small"
                      value={ceo}
                      onChange={handleCeo}
                      error={Boolean(errors.ceo)}
                      required
                      //placeholder="accountcode"
                      inputProps={{ maxLength: 30 }}
                    />
                    {errors.ceo && (
                      <span className="text-red-500">{errors.ceo}</span>
                    )}
                  </FormControl>
                </div>

                {/* PHONE FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="phone"
                      label="Phone No"
                      size="small"
                      value={phNo}
                      onChange={handlePhNo}
                      error={Boolean(errors.phNo)}
                      required
                      //placeholder="accountcode"
                      inputProps={{ maxLength: 10 }}
                    />
                    {errors.phNo && (
                      <span className="text-red-500">{errors.phNo}</span>
                    )}
                  </FormControl>
                </div>

                {/* ADDRESS FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="address"
                      label="Address"
                      size="small"
                      value={address}
                      onChange={handleAddress}
                      error={Boolean(errors.address)}
                      //placeholder="accountcode"
                      inputProps={{ maxLength: 100 }}
                    />
                    {errors.address && (
                      <span className="text-red-500">{errors.address}</span>
                    )}
                  </FormControl>
                </div>

                {/* PAN FIELD */}
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
                      required
                    />
                    {errors.pan && (
                      <span className="text-red-500">{errors.pan}</span>
                    )}
                  </FormControl>
                </div>
                {/* GST FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="gst"
                      label="GST"
                      size="small"
                      value={gst}
                      onChange={handleGst}
                      error={Boolean(errors.gst)}
                      required
                      //placeholder="accountcode"
                      inputProps={{ maxLength: 20 }}
                    />
                    {errors.gst && (
                      <span className="text-red-500">{errors.gst}</span>
                    )}
                  </FormControl>
                </div>

                <div className="col-md-4 mb-3 mb-3">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Active"
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
                  onClick={handleNew}
                  className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Clear
                </button>
              </div>
            </Box>

            {/* Branch Tab */}
            <Box hidden={tabValue !== 1 }>
              <div className="row d-flex mt-3">
                {/* ORG NAME FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="orgname"
                      label="Organization Name"
                      size="small"
                      value={orgName}
                      // onChange={handleOrgName}
                      // error={Boolean(errors.orgName)}
                      // required
                      disabled
                      //placeholder="accountcode"
                      inputProps={{ maxLength: 30 }}
                    />
                  </FormControl>
                </div>

                {/* ORG CODE FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="orgcode"
                      label="Org Code"
                      size="small"
                      value={branchOrgCode}
                      //onChange={handleOrgCode}
                      disabled
                      // error={Boolean(errors.orgCode)}
                      //placeholder="accountcode"
                      // inputProps={{ maxLength: 10 }}
                    />
                  </FormControl>
                </div>

                {/* BRANCH CODE FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="branch_code"
                      label="Branch Code"
                      size="small"
                      value={branchCode}
                      onChange={handleBranchCode}
                      error={Boolean(errors.branchCode)}
                      inputProps={{ maxLength: 10 }}
                      required
                    />
                    {errors.branchCode && (
                      <span className="text-red-500">{errors.branchCode}</span>
                    )}
                  </FormControl>
                </div>
                {/* BRANCH CODE FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="branch_name"
                      label="Branch Name"
                      size="small"
                      value={branchName}
                      onChange={handleBranchName}
                      error={Boolean(errors.branchName)}
                      inputProps={{ maxLength: 50 }}
                      required
                    />
                    {errors.branchName && (
                      <span className="text-red-500">{errors.branchName}</span>
                    )}
                  </FormControl>
                </div>

                {/* BRANCH MANAGER FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="branch_manager"
                      label="Branch Manager"
                      size="small"
                      value={branchManager}
                      onChange={handleBranchManager}
                      error={Boolean(errors.branchManager)}
                      required
                      //placeholder="accountcode"
                      inputProps={{ maxLength: 30 }}
                    />
                    {errors.branchManager && (
                      <span className="text-red-500">
                        {errors.branchManager}
                      </span>
                    )}
                  </FormControl>
                </div>

                {/* BRANCH PHONE FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="branch_phone"
                      label="Phone"
                      size="small"
                      value={branchPhNo}
                      onChange={handleBranchPhNo}
                      error={Boolean(errors.branchPhNo)}
                      required
                      //placeholder="accountcode"
                      inputProps={{ maxLength: 10 }}
                    />
                    {errors.branchPhNo && (
                      <span className="text-red-500">{errors.branchPhNo}</span>
                    )}
                  </FormControl>
                </div>

                {/* BRANCH ADDRESS FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="branch_address"
                      label="Address"
                      size="small"
                      value={branchAddress}
                      onChange={handleBranchAddress}
                      error={Boolean(errors.branchAddress)}
                      required
                      //placeholder="accountcode"
                      inputProps={{ maxLength: 100 }}
                    />
                    {errors.branchAddress && (
                      <span className="text-red-500">
                        {errors.branchAddress}
                      </span>
                    )}
                  </FormControl>
                </div>

                {/* BRANCH PAN FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="branch_pan"
                      label="PAN"
                      size="small"
                      value={branchPan}
                      onChange={handleBranchPan}
                      error={Boolean(errors.branchPan)}
                      inputProps={{ maxLength: 10 }}
                      required
                    />
                    {errors.branchPan && (
                      <span className="text-red-500">{errors.branchPan}</span>
                    )}
                  </FormControl>
                </div>

                {/* BRANCH GST FIELD */}
                <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="branch_gst"
                      label="GST"
                      size="small"
                      value={branchGst}
                      onChange={handleBranchGst}
                      error={Boolean(errors.branchCode)}
                      required
                      //placeholder="accountcode"
                      inputProps={{ maxLength: 20 }}
                    />
                    {errors.branchGst && (
                      <span className="text-red-500">{errors.branchGst}</span>
                    )}
                  </FormControl>
                </div>

                <div className="col-md-4 mb-3 mb-3">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Active"
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="d-flex flex-row mt-3">
                <button
                  type="button"
                  onClick={handleSaveBranch}
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleNewBranch}
                  className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Clear
                </button>
              </div>
            </Box>

            {/* Branch Admin Credincials Tab */}
            <Box hidden={tabValue !== 2}>
              <div className="row d-flex mt-3">
                {/* BRANCH NAME FIELD */}
                {/* <div className="col-md-4 mb-3">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Branch
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Organization"
                      value={branches}
                      onChange={handleBrName}
                      // error={Boolean(errors.branchs)}
                    >
                      

                    {branches.map((branch) => (
                        <MenuItem key={branch.branchId} value={branch.branchName}>
                          {branch.branchName}
                        </MenuItem>
                      ))}

                    </Select>
                  </FormControl>
                </div> */}

                {/* BRANCH CODE FIELD */}
                {/* <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="branch_code"
                      label="Branch Code"
                      size="small"
                      value={brCode}
                      onChange={handleBrCode}
                      error={Boolean(errors.brCode)}
                      inputProps={{ maxLength: 10 }}
                      required
                      disabled
                    />
                    {errors.brCode && (
                      <span className="text-red-500">{errors.brCode}</span>
                    )}
                  </FormControl>
                </div> */}

                {/* BRANCH ADMIN NAME FIELD */}
                {/* <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="br_admin_name"
                      label="Admin Name"
                      size="small"
                      value={brAdminName}
                      onChange={handleBrAdminName}
                      error={Boolean(errors.brAdminName)}
                      required
                      //placeholder="accountcode"
                      inputProps={{ maxLength: 30 }}
                    />
                    {errors.brAdminName && (
                      <span className="text-red-500">
                        {errors.brAdminName}
                      </span>
                    )}
                  </FormControl>
                </div> */}

                {/* BRANCH ADMIN EMAIL FIELD */}
                {/* <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="admin_email"
                      label="Email ID"
                      size="small"
                      value={brAdminEmail}
                      onChange={handleBrAdminEmail}
                      error={Boolean(errors.brAdminEmail)}
                      required
                      //placeholder="accountcode"
                      inputProps={{ maxLength: 10 }}
                    />
                    {errors.brAdminEmail && (
                      <span className="text-red-500">{errors.brAdminEmail}</span>
                    )}
                  </FormControl>
                </div> */}

                {/* BRANCH ADMIN PASSWORD FIELD */}
                {/* <div className="col-md-4 mb-3">
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="br_admin_pwd"
                      label="Password"
                      size="small"
                      value={brAdminPwd}
                      onChange={handleBrAdminPwd}
                      error={Boolean(errors.brAdminPwd)}
                      required
                      //placeholder="accountcode"
                      inputProps={{ maxLength: 100 }}
                    />
                    {errors.brAdminPwd && (
                      <span className="text-red-500">
                        {errors.brAdminPwd}
                      </span>
                    )}
                  </FormControl>
                </div> */}

               

                <div className="col-md-4 mb-3 mb-3">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Active"
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="d-flex flex-row mt-3">
                <button
                  type="button"
                  //onClick={handleSaveBranch}
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Save
                </button>
                <button
                  type="button"
                  //onClick={handleNewBanch}
                  className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Clear
                </button>
              </div>
            </Box>
          </div>
        </div>
      </div>

      {notification && <ToastComponent content={message} type={errorType} />}
    </>
  );
};

export default OrganizationSetup;
