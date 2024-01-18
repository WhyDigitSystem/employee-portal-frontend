import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import React, { useState } from "react";
import "react-tabs/style/react-tabs.css";
import { encryptPassword } from "../../user/components/utils";

// function ChangePwd({ newLeaveType }) {
export const ChangePwd = () => {
  //const [tabIndex, setTabIndex] = useState(0);
  const [curPwd, setcurPwd] = useState();
  const [newPwd, setNewPwd] = useState();
  const [cPwd, setCPwd] = useState();
  const [errors, setErrors] = React.useState({});
  const [savedData, setSavedData] = React.useState("");
  const [empMail, setEmpMail] = React.useState(
    localStorage.getItem("userName")
  );

  // const handleTabSelect = (index) => {
  //   setTabIndex(index);
  //};
  const handleCurPwd = (event) => {
    setcurPwd(event.target.value);
  };
  const handleNewPwd = (event) => {
    setNewPwd(event.target.value);
  };
  const handleCPwd = (event) => {
    setCPwd(event.target.value);
  };

  const buttonStyle = {
    fontSize: "20px", // Adjust the font size as needed save
  };

  //   const handleCloseNewLeaveType = () => {
  //     newLeaveType(false);
  //   };

  const handleNew = () => {
    setcurPwd("");
    setNewPwd("");
    setCPwd("");
  };

  const handleValidation = () => {
    const newErrors = {};

    if (curPwd === "") {
      newErrors.curPwd = "Date is required";
    }

    if (newPwd === "") {
      newErrors.newPwd = "Day is required";
    }

    if (cPwd === "") {
      newErrors.cPwd = "Festival is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    const trimmedCurPwd = curPwd.trim();
    const trimmedNewPwd = newPwd.trim();
    if (handleValidation()) {
      console.log("test");
      const dataToSave = {
        email: empMail,
        newPassword: encryptPassword(trimmedNewPwd),
        oldPassword: encryptPassword(trimmedCurPwd),
      };

      console.log("test", dataToSave);

      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        Axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/changepassword`,
          dataToSave,
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
      } else {
        console.error("User is not authenticated. Please log in.");
      }
    }
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-between"></div>
          <center>
            <div className="justify-content-center mt-3">
              <div className="col-md-4 mb-3">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="currentpwd"
                    label="Current Password"
                    size="small"
                    value={curPwd}
                    onChange={handleCurPwd}
                    error={Boolean(errors.curPwd)}
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div>
              <div className="col-md-4 mt-3">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="newpwd"
                    label="New Password"
                    size="small"
                    value={newPwd}
                    onChange={handleNewPwd}
                    error={Boolean(errors.newPwd)}
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div>
              <div className="col-md-4 mt-3">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="repwd"
                    label="Re-Enter Password"
                    size="small"
                    value={cPwd}
                    onChange={handleCPwd}
                    error={Boolean(errors.cPwd)}
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div>
            </div>
          </center>

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
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePwd;
