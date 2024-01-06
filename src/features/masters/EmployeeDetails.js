import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineWallet } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
export const EmployeeDetails = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabSelect = (index) => {
    setTabIndex(index);
  };
  const buttonStyle = {
    fontSize: "20px", // Adjust the font size as needed save
  };

  return (
    <>
      <div>
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="d-flex flex-wrap justify-content-start">
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
            </div>
            <div className="row d-flex mt-3">
              <div className="col-md-4">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="employee"
                    label="Employee Code"
                    size="small"
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
                    // value={age}
                    label="Gender"
                    // onChange={handleChange}
                  >
                    <MenuItem value={30}>Male</MenuItem>
                    <MenuItem value={20}>Female</MenuItem>
                    <MenuItem value={10}>Others</MenuItem>
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
                      //value={boDate}
                      //onChange={(newValue) => setBoDate(newValue)}
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
                    id="designation"
                    label="Designation"
                    size="small"
                    required
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div>
              {/* <div className="col-md-4">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="role"
                    label="Role"
                    size="small"
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div> */}
              <div className="col-md-4">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Role"
                    // onChange={handleChange}
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
                      //value={boDate}
                      //onChange={(newValue) => setBoDate(newValue)}
                    />
                  </LocalizationProvider>
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
                      //value={boDate}
                      //onChange={(newValue) => setBoDate(newValue)}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
              <div className="col-md-4">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    User Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="User Type"
                    // onChange={handleChange}
                  >
                    <MenuItem value={30}>Admin</MenuItem>
                    <MenuItem value={20}>Super Admin</MenuItem>
                    <MenuItem value={10}>User</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row d-flex mt-3">
              <div className="col-md-4">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="mobileNumber"
                    label="Mobile Number"
                    size="small"
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
                    label="Alternate Mobile Number"
                    size="small"
                    required
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
              </div>
              <div className="col-md-4">
                <FormControl fullWidth variant="filled">
                  <TextField
                    id="pan"
                    label="PAN"
                    size="small"
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
                    id="aadharNo"
                    label="Aadhar Number"
                    size="small"
                    //placeholder="accountcode"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
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
                        // value={age}
                        label="Reporting Person"
                        // onChange={handleChange}
                      >
                        <MenuItem value={30}>Manager</MenuItem>
                        <MenuItem value={20}>Team Lead</MenuItem>
                        <MenuItem value={10}>HR</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
