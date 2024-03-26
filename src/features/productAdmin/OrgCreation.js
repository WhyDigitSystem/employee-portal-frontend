import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Axios from "axios";
//import dayjs from "dayjs";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import "react-tabs/style/react-tabs.css";
import { encryptPassword } from "../user/components/utils";
import ToastComponent from "../../utils/ToastComponent";

const OrgCreation = ({ newOrg }) => {
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [licCount, setLicCount] = useState("");
  const [errors, setErrors] = useState("");
  const [savedData, setSavedData] = useState("");
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  //const encPwd = encryptPassword(encPwd);
    //encPwd = encryptPassword(encPwd);
    //setPwd(encPwd);

  const handleOrgName = (event) => {
    setOrgName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePwd = (event) => {
    setPwd(event.target.value);
    // const encPwd = event.target.value.trim();
    // encPwd = encryptPassword(encPwd);
    // setPwd(encPwd);
  };
  const handleLicCount = (event) => {
    const formatedLicCount = event.target.value.replace(/[^0-9]/g, "");
    setLicCount(formatedLicCount);
  };

  const handleNewOrgClose = () => {
    newOrg(false);
  };

  const handleNew = () => {
    setOrgName("");
    setEmail("");
    setPwd("");
    setLicCount("");
    setErrors("");
  };

  const handleValidation = () => {
    const newErrors = {};

    if (!orgName) {
      newErrors.orgName = "Organization is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!pwd) {
      newErrors.pwd = "Password is required";
    }

    if (!licCount) {
      newErrors.licCount = "Licence Count is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    console.log("hai");
    if (handleValidation()) {
      const dataToSaveOrg = {
        orgName: orgName,
        email: email,
        password: encryptPassword(pwd),
        noOfLicence: licCount
      };
      console.log("Data to Save Org:", dataToSaveOrg);
      // const dataToSaveUser = {
      //   orgName: orgName,
      //   email: email,
      //   password: pwd,
      //   noOfLicence: licCount
      // };

      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        // Employee_details Table Post
        Axios.post(
          `${process.env.REACT_APP_API_URL}/api/admin/createOrginization`,
          dataToSaveOrg,
          { headers }
        )

        //user Table post
        // Axios.post(
        //   `${process.env.REACT_APP_API_URL}/api/user/signup`,
        //   dataToSaveUser,
        //   { headers }
        // )
          .then((response) => {
            console.log("Data saved successfully:", response.data);
            setSavedData(response.data);
            handleNew();
            setErrorType("success");
            setMessage("Data saved successfully!");
            setNotification(true);
          })
          .catch((error) => {
            // Handle errors here
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
            <div className="d-flex justify-content-between">
              <h1 className="text-xl font-semibold mb-3">New Organization</h1>
              <IoMdClose
                type="button"
                className="cursor-pointer w-8 h-8 mb-3"
                onClick={handleNewOrgClose}
              />
            </div>
            <div className="row d-flex mt-3">
              <div className="col-md-4 mb-3">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="orgname"
                    label="Organization Name"
                    size="small"
                    value={orgName}
                    onChange={handleOrgName}
                    error={Boolean(errors.orgName)}
                    required
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                  {errors.orgName && (
                    <span className="text-red-500">{errors.orgName}</span>
                  )}
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
                  {errors.email && (
                    <span className="text-red-500">{errors.email}</span>
                  )}
                </FormControl>
              </div>

              <div className="col-md-4 mb-3">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="pwd"
                    label="Password"
                    size="small"
                    value={pwd}
                    onChange={handlePwd}
                    error={Boolean(errors.pwd)}
                    inputProps={{ maxLength: 10 }}
                  />
                  {errors.pwd && (
                    <span className="text-red-500">{errors.pwd}</span>
                  )}
                </FormControl>
              </div>

              <div className="col-md-4 mb-3">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="no_of_licence"
                    label="No of Licence"
                    size="small"
                    value={licCount}
                    onChange={handleLicCount}
                    error={Boolean(errors.licCount)}
                    required
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 3 }}
                  />
                  {errors.licCount && (
                    <span className="text-red-500">{errors.licCount}</span>
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
          </div>
        </div>
      </div>

      {notification && <ToastComponent content={message} type={errorType} />}
    </>
  );
};

export default OrgCreation;
