// ModalComponent.jsx
import React from "react";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const ModalComponent = ({ isOpen, closeModal, updateData }) => {
  const [input1, setInput1] = React.useState("");
  const [input2, setInput2] = React.useState("");

  const handleSave = () => {
    // You can perform any action with the input data here
    // For example, update the data or trigger an API call
    updateData({ input1, input2 });
    closeModal();
  };

  return (
    <div
      style={{
        display: isOpen ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "1",
      }}
    >
      <div
        style={{
          backgroundColor: "#fefefe",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "60%",
          maxWidth: "400px",
        }}
      >
        {/* <div style={{ marginBottom: "20px" }}>
          <TextField
            label="Input 1"
            variant="outlined"
            size="small"
            fullWidth
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            style={{ marginBottom: "8px" }}
          />
        </div> */}
        <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>
          Leave Approval
          <span
            style={{
              float: "right",
              fontSize: "25px",
              cursor: "pointer",
            }}
            onClick={closeModal}
          >
            &times;
          </span>
        </h2>
        <div style={{ marginBottom: "20px" }}>
          <FormControl
            variant="outlined"
            size="small"
            fullWidth
            style={{ marginBottom: "8px" }}
          >
            <InputLabel id="input2-label">Status</InputLabel>
            <Select
              labelId="input2-label"
              id="input2"
              //   value={input1}
              //   onChange={(e) => setInput1(e.target.value)}
              label="Status"
            >
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              {/* Add more MenuItem components for additional options */}
            </Select>
          </FormControl>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <TextField
            label="Remarks"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            maxRows={4}
            // value={input2}
            // onChange={(e) => setInput2(e.target.value)}
            style={{ marginBottom: "8px" }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ width: "100%" }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ModalComponent;
