// import Autocomplete from "@mui/material/Autocomplete";
// import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineWallet } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
import NewPermissionRequest from "./NewPermissionRequest";

export const PermissionRequest = () => {
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

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
  };

  const handleAddOpen = () => {
    setAdd(true);
  };

  const handleBack = () => {
    setAdd(false);
  };

  return (
    <>
      {add ? (
        <NewPermissionRequest newPermissionRequest={handleBack} />
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
          {/* <div className="row d-flex mt-3">
            <div className="col-md-4 mb-3">
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    slotProps={{
                      textField: { size: "small", clearable: true },
                    }}
                    //value={boDate}
                    //onChange={(newValue) => setBoDate(newValue)}
                  />
                </LocalizationProvider>
              </FormControl>
            </div>

            <div className="col-md-8">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker", "TimePicker"]}>
                  <TimePicker
                    label="From"
                    defaultValue={dayjs("2022-04-17T15:30")}
                    slotProps={{ textField: { size: "small" } }}
                  />
                  <TimePicker
                    label="To"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="col-md-4 mb-3">
              <FormControl fullWidth variant="filled">
                <TextField
                  id="tothrs"
                  label="Total Hours"
                  size="small"
                  disabled
                  //placeholder="40003600104"
                  inputProps={{ maxLength: 30 }}
                />
              </FormControl>
            </div>

            <div className="col-md-4 mb-3">
              <FormControl fullWidth variant="filled">
                <TextField
                  id="notes"
                  label="Notes"
                  size="small"
                  multiline
                  // minRows={2}
                  //maxRows={4}
                  //placeholder="accountcode"
                  inputProps={{ maxLength: 100 }}
                />
              </FormControl>
            </div>
            <div className="col-md-4 mb-3">
              <Autocomplete
                style={{ marginRight: 13, marginLeft: -10 }}
                value={searchValue}
                onChange={handleSearchChange}
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Notify"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <AiOutlineSearch style={{ marginLeft: 8 }} />
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </div>
          </div>
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
          </div> */}
        </div>
      )}
    </>
  );
};
