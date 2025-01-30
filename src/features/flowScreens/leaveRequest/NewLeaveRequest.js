import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import EmailConfig from "../../../utils/SendEmail";
import ToastComponent from "../../../utils/ToastComponent";

const errorInputStyle = {
  border: "1px solid red",
};
function NewLeaveRequest({ newLeaveRequest }) {
  const [searchValue, setSearchValue] = useState("");
  const [savedData, setSavedData] = React.useState();
  const [empName, setEmpName] = React.useState(localStorage.getItem("empname"));
  const [empCode, setEmpCode] = React.useState(localStorage.getItem("empcode"));
  const [empmail, setEmpMail] = React.useState(
    localStorage.getItem("userName")
  );
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [loginEmpId, setLoginEmpId] = React.useState(
    localStorage.getItem("empId")
  );

  const [options, setOptions] = useState([
    "Karupu",
    "Cesil",
    "Karthi",
    "Guhan",
    "Vasanth",
  ]);
  const [errors, setErrors] = React.useState({});

  const [from, setFrom] = React.useState(null);
  const [to, setTo] = React.useState(null);
  const [tot, setTot] = React.useState("");
  const [leaveType, setLeaveType] = React.useState("");
  const [leaveCode, setLeaveCode] = React.useState("");
  const [selectLeave, setSelectLeave] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [notify, setNotify] = React.useState("");
  const [showLeaveTypeField, setShowLeaveTypeField] = useState(false);
  const [notification, setNotification] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [errorType, setErrorType] = React.useState("");
  const [sendMail, setSendMail] = React.useState(false);
  const [mailFrom, setMailFrom] = React.useState("");
  const [mailTo, setMailTo] = React.useState("");
  const [mailNotes, setMailNotes] = React.useState("");
  const [mailMessage, setMailMessage] = React.useState("");
  const [mailMessageTwo, setMailMessageTwo] = React.useState("");
  const [leaveTypeOptions, setleaveTypeOptions] = useState([]);
  const [leaveCodeList, setleaveCodeList] = useState([]);
  const [newDropdownOptions, setNewDropdownOptions] = useState([]);

  const [newDropdownValue, setNewDropdownValue] = useState("");
  const [newDropdownErrors, setNewDropdownErrors] = useState({});
  const [newDropdownCount, setNewDropdownCount] = useState(0);
  const [leaveError, setLeaveError] = useState("");
  // const newDropdownOptions = [
  //   { value: "Casual Leave", count: 2 },
  //   { value: "Personal Leave", count: 10 },
  //   { value: "Petanity Leave", count: 1 },
  //   { value: "Loss of pay", count: 0 },
  // ];

  // const handleNewDropdownChange = (event) => {
  //   const selectedValue = event.target.value;
  //   setNewDropdownValue(selectedValue);
  //   console.log("selectedValue is:", selectedValue);

  //   // Find the count of the selected value
  //   const selectedOption = newDropdownOptions.find(
  //     (option) => option.value === selectedValue
  //   );
  //   if (selectedOption) {
  //     console.log("selectedOption:", selectedOption.count);
  //     setNewDropdownCount(selectedOption.count);

  //   } else {
  //     setNewDropdownCount(0); // Set count to 0 if value not found
  //   }
  // };

  // const handleNewDropdownChange = (event) => {
  //   const selectedValue = event.target.value;
  //   setNewDropdownValue(selectedValue);

  //   // Find the count of the selected value
  //   const selectedOption = newDropdownOptions.find(
  //     (option) => option.value === selectedValue
  //   );
  //   setNewDropdownCount(selectedOption ? selectedOption.count : 0);
  // };

  const handleNewDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setNewDropdownValue(selectedValue);

    // Find the count of the selected value
    const selectedOption = newDropdownOptions.find(
      (option) => option.value === selectedValue
    );
    setNewDropdownCount(selectedOption ? selectedOption.count : 0);

    // Find corresponding leave code
    const matchingLeave = leaveCodeList.find(
      (item) => item["Leave Type"] === selectedValue
    );

    setLeaveCode(matchingLeave ? matchingLeave["Leave Code"] : ""); // Update Leave Code
  };

  const customStyles = {
    leftAlignOption: {
      textAlign: "left",
      display: "inline-block",
      width: "80%", // Adjust width as needed
    },
    rightAlignCount: (count) => ({
      textAlign: "right",
      display: "inline-block",
      width: "20%", // Adjust width as needed
      color: count > 5 ? "green" : count > 0 ? "orange" : "inherit",
    }),
  };

  useEffect(() => {
    getAllLeaveType();
    getAllLeaveCode();
    getAllLeaveTypeByGender();
    if (from && to && from === to) {
      setShowLeaveTypeField(true);
    } else {
      setShowLeaveTypeField(false);
    }
  }, [from, to]);

  const getAllLeaveTypeByGender = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/leavetype/leaveRequest?id=${loginEmpId}&orgId=${orgId}`
      );
      if (response.data.statusFlag === "Ok") {
        setleaveTypeOptions(response.data.paramObjectsMap.leaveType);
      }
    } catch (error) {
      console.error("Error fetching reporting persons:", error);
    }
  };

  const getAllLeaveCode = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/masterController/getLeaveCode?orgId=${orgId}`
      );
      if (response.data.statusFlag === "Ok") {
        setleaveCodeList(response.data.paramObjectsMap.leaveCode);
      }
    } catch (error) {
      console.error("Error fetching reporting persons:", error);
    }
  };

  const getAllLeaveType = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/masterController/getEmployeeLeaveCount?empId=${loginEmpId}&orgId=${orgId}`
      );

      if (response.data.statusFlag === "Ok") {
        // Convert object format to array
        const leaveData = response.data.paramObjectsMap.employeeLeaveCount[0];
        const formattedOptions = Object.keys(leaveData).map((key) => ({
          value: key, // Leave type name
          count: parseInt(leaveData[key], 10), // Convert count to number
        }));

        setNewDropdownOptions(formattedOptions);
      }
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  const handleFrom = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setFrom(formattedDate);
    //console.log(from);
  };

  const handleNotes = (event) => {
    setNotes(event.target.value);
  };
  const handleNotify = (event) => {
    setNotify(event.target.value);
  };
  const handleLeaveType = (event) => {
    setLeaveType(event.target.value);
  };

  const handleSelectLeave = (event) => {
    const selectedLeave = event.target.value;
    setSelectLeave(selectedLeave);

    // Update tot based on selected leave type
    if (selectedLeave === "1st Half") {
      setTot("0.5");
    }
    if (selectedLeave === "2nd Half") {
      setTot("0.5");
    }
    if (selectedLeave === "Full Day") {
      setTot("1");
    }
  };

  // const handleTo = (newDate) => {
  //   const originalDateString = newDate;
  //   const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
  //   setTo(formattedDate);

  //   const daysDifference = dayjs(formattedDate).diff(dayjs(from), "day") + 1;
  //   setTot(String(daysDifference));
  // };

  const handleTo = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setTo(formattedDate);

    // Calculate the total number of selected leave days
    const daysDifference = dayjs(formattedDate).diff(dayjs(from), "day") + 1;

    // Find the selected leave option to get the available count
    const selectedOption = newDropdownOptions.find(
      (option) => option.value === newDropdownValue
    );
    const availableLeaveCount = selectedOption ? selectedOption.count : 0;

    // Validation: Ensure user does not select more leave days than available
    if (availableLeaveCount > 0 && daysDifference > availableLeaveCount) {
      setLeaveError(
        `You have only ${availableLeaveCount} day(s) available for ${newDropdownValue}.`
      );
      setTot(""); // Reset total days
    } else {
      setLeaveError(""); // Clear error
      setTot(String(daysDifference));
    }
  };

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
  };

  const handleCloseNewLeave = () => {
    newLeaveRequest(false);
    handleNew();
  };

  const handleNew = () => {
    setFrom(null);
    setTo(null);
    setTot("");
    setNewDropdownValue("");
    setNotes("");
    setNotify("");
    setLeaveCode("");
    setSelectLeave("");
  };

  const handleValidation = () => {
    const newErrors = {};

    if (!from) {
      newErrors.from = "From Date is required";
    }
    if (!to) {
      newErrors.to = "To Date is required";
    }
    if (newDropdownValue === "") {
      newErrors.leaveType = "Leave Type is required";
    }
    if (!notes) {
      newErrors.notes = "Notes is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    // handleValidation();
    // if (handleValidation()) {
      const dataToSave = {
        active: true,
        createdBy: empCode,
        dayType: selectLeave,
        empId: loginEmpId,
        fromDate: from,
        leaveCode: leaveCode,
        leaveType: newDropdownValue,
        notify: notify,
        remarks: notes,
        toDate: to,
        totalLeave: tot,
      };

      console.log("test", dataToSave);

      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        Axios.put(
          `${process.env.REACT_APP_API_URL}/api/masterController/createUpdateRequestLeave`,
          dataToSave,
          { headers }
        )
          .then((response) => {
            console.log("Data saved successfully:", response.data);
            setSavedData(response.data);
            setSendMail(true);
            setMailFrom(from);
            setMailTo(to);
            setMailNotes(notes);
            setMailMessage("You have a new Leave Request from ");
            setMailMessageTwo("is requesting Leave");
            //handleCloseNewLeave();
            setMessage(response.data.paramObjectsMap.message);
            setErrorType("success");
            setNotification(true);
            handleNew();
          })
          .catch((error) => {
            console.error("Error saving data:", error);
            setMessage("Error: Leave Request not Raise");
            setErrorType("error");
            setNotification(true);
          });
      } else {
        console.error("User is not authenticated. Please log in.");
      }
    // }
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-3">Leave Request</h1>
          <IoMdClose
            onClick={handleCloseNewLeave}
            type="button"
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>
        <div className="row d-flex mt-3">
          <div className="col-md-4 mb-3">
            <FormControl fullWidth size="small">
              <InputLabel id="newDropdownLabel">Leave Type</InputLabel>
              <Select
                labelId="newDropdownLabel"
                id="newDropdownSelect"
                label="Leave Type"
                value={newDropdownValue}
                onChange={handleNewDropdownChange}
              >
                {newDropdownOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    value={option.value}
                    disabled={option.count === 0}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <span>{option.value}</span>
                      <span
                        style={{ color: option.count === 0 ? "gray" : "black" }}
                      >
                        {option.count}
                      </span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
              {newDropdownErrors.value && (
                <span className="text-red-500">{newDropdownErrors.value}</span>
              )}
            </FormControl>
          </div>

          <div className="col-md-4 mb-3">
            <FormControl fullWidth variant="filled">
              <TextField
                id="leaveCode"
                label="Leave Code"
                size="small"
                disabled
                value={leaveCode}
              />
            </FormControl>
          </div>

          {/* FROM DATE FIELD */}
          <div className="col-md-4 mb-3">
            <FormControl fullWidth variant="filled">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From"
                  slotProps={{
                    textField: { size: "small", clearable: true },
                  }}
                  value={from}
                  onChange={handleFrom}
                  format="DD/MM/YYYY"
                />

                {errors.from && (
                  <span className="text-red-500">{errors.from}</span>
                )}
              </LocalizationProvider>
            </FormControl>
          </div>
          {/* TO DATE FIELD */}
          <div className="col-md-4 mb-3">
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="To"
                  slotProps={{
                    textField: { size: "small", clearable: true },
                  }}
                  value={to}
                  onChange={handleTo}
                  format="DD/MM/YYYY"
                />
                {errors.to && <span className="text-red-500">{errors.to}</span>}
                {leaveError && (
                  <span className="text-red-500">{leaveError}</span>
                )}
              </LocalizationProvider>
            </FormControl>
          </div>

          {/* HALF OR FULL DAY FIELD */}
          {showLeaveTypeField && from && to && (
            <div className="col-md-4 mb-3">
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Day Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Day Type"
                  value={selectLeave}
                  onChange={handleSelectLeave}
                >
                  <MenuItem value={"1st Half"}>1st Half</MenuItem>
                  <MenuItem value={"2nd Half"}>2nd Half</MenuItem>
                  <MenuItem value={"Full Day"}>Full Day</MenuItem>
                </Select>
                {errors.selectLeave && (
                  <span className="text-red-500">{errors.selectLeave}</span>
                )}
              </FormControl>
            </div>
          )}

          {/* TOTAL DAYS FIELD */}
          <div className="col-md-4 mb-3">
            <FormControl fullWidth variant="filled">
              <TextField
                id="totdays"
                label="Total Days"
                size="small"
                disabled
                value={tot}
              />
            </FormControl>
          </div>

          {/* LEAVE TYPE FIELD */}
          {/* <div className="col-md-4 mb-3">
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Leave Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Leave Type"
                value={leaveType}
                onChange={handleLeaveType}
              >
                {leaveTypeOptions.map((leave) => (
                  <MenuItem
                    key={leave.LeaveTypeCode}
                    value={leave.LeaveTypeCode}
                  >
                    {leave.LeaveType}
                  </MenuItem>
                ))}
              </Select>
              {errors.leaveType && (
                <span className="text-red-500">{errors.leaveType}</span>
              )}
            </FormControl>
          </div> */}

          <div className="col-md-4 mb-3">
            <FormControl fullWidth variant="filled">
              <TextField
                id="notify"
                label="Notify"
                size="small"
                multiline
                value={notify}
                onChange={handleNotify}
              />
              {errors.notify && (
                <span className="text-red-500">{errors.notify}</span>
              )}
            </FormControl>
          </div>

          {/* NOTES FIELD */}
          <div className="col-md-4 mb-3">
            <FormControl fullWidth variant="filled">
              <TextField
                id="notes"
                label="Notes"
                size="small"
                multiline
                value={notes}
                onChange={handleNotes}
              />
              {errors.notes && (
                <span className="text-red-500">{errors.notes}</span>
              )}
            </FormControl>
          </div>

          {/* NOTIFY FIELD */}
          {/* <div className="col-md-4 mb-3">
            <FormControl fullWidth variant="filled">
              <Autocomplete
                //size="small"
                value={searchValue}
                onChange={handleSearchChange}
                error={Boolean(errors.searchValue)}
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nofity"
                    size="small"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <AiOutlineSearch style={{ marginRight: 8 }} />
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </FormControl>
          </div> */}
        </div>

        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={handleNew}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Reset
          </button>
        </div>
      </div>

      {sendMail && (
        <EmailConfig
          fDate={mailFrom}
          tDate={mailTo}
          reason={mailNotes}
          message={mailMessage}
          message2={mailMessageTwo}
        />
      )}

      {notification && <ToastComponent content={message} type={errorType} />}
    </>
  );
}
export default NewLeaveRequest;
