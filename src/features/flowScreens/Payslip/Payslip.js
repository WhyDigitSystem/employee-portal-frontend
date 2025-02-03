import { MenuItem, TextField } from "@mui/material";
import Axios from "axios";
import dayjs from "dayjs";
import { default as React, useEffect, useState } from "react";
import PayslipPdf from "./PayslipPdf";

export const Payslip = () => {
  const [add, setAdd] = React.useState(false);
  const [tableData, setTableData] = React.useState([]);
  const [organizationData, setOrganizationData] = React.useState([]);
  const [empCode, setEmpCode] = React.useState(localStorage.getItem("empcode"));
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [formData, setFormData] = useState([
    {
      month: "",
      year: "",
    },
  ]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 20 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleAddOpen = () => {
    setAdd(true);
  };

  const handleBack = () => {
    setAdd(false);
    // getAllState();
  };

  useEffect(() => {
    orginization();
  }, []);

  const orginization = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      Axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/orginization/${orgId}`,
        {
          headers,
        }
      )
        .then((response) => {
          console.log("Data saved successfully organizationVO:", response.data);
          setOrganizationData(response.data.paramObjectsMap.organizationVO);
          // handleView();
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error saving data:", error);
        });
    }
  };

  const employeeSalaryDetailsForPDF = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      Axios.get(
        `${process.env.REACT_APP_API_URL}/api/SalaryStructure/employeeSalaryDetailsForPDF?empCode=${empCode}&month=${formData.month}&orgId=${orgId}&year=${formData.year}`,
        {
          headers,
        }
      )
        .then((response) => {
          console.log(
            "Data saved successfully salaryStructureDetails:",
            response.data
          );
          setTableData(response.data.paramObjectsMap.salaryStructureDetails);
          handleAddOpen();
          // handleView();
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error saving data:", error);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked, selectionStart, selectionEnd, type } =
      e.target;
    let errorMessage = "";

    if (errorMessage) {
    } else {
      setFormData({ ...formData, [name]: value });

      if (type === "text" || type === "textarea") {
        setTimeout(() => {
          const inputElement = document.getElementsByName(name)[0];
          if (inputElement && inputElement.setSelectionRange) {
            inputElement.setSelectionRange(selectionStart, selectionEnd);
          }
        }, 0);
      }
    }
  };

  return (
    <>
      {add ? (
        <PayslipPdf
          newPayslipRequest={handleBack}
          paySlipDetails={tableData}
          headerDetails={organizationData}
        />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="row d-flex mt-3">
            <div className="col-md-4 mb-3">
              <TextField
                select
                fullWidth
                size="small"
                label="Select Month"
                name="month"
                value={formData.month || ""}
                onChange={handleInputChange}
              >
                {months.map((month, index) => (
                  <MenuItem key={index} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="col-md-4 mb-3">
              <TextField
                select
                fullWidth
                size="small"
                label="Select Year"
                name="year"
                value={formData.year || ""}
                onChange={handleInputChange}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <button
                  type="button"
                  onClick={employeeSalaryDetailsForPDF}
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Get Payslip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payslip;
