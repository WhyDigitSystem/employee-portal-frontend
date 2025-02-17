import axios from "axios";
import { default as React, useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const SalaryReport = () => {
  const [allSalaryData, setAllSalaryData] = React.useState([]);
  const [allEmployeeName, setAllEmployeeName] = React.useState([]);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    getAllSalaryReport();
  }, []);

  const handleViewClick = async (empCode) => {
    try {
      const salaryData = await getReviseEmployees(empCode);
      if (salaryData) {
        setSelectedEmployee(salaryData);
        dialogRef.current.showModal(); // Open the dialog
      }
    } catch (error) {
      console.error("Error fetching revised employee data:", error);
    }
  };

  const getAllSalaryReport = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/SalaryStructure/getSalaryStructureDetails?orgId=${orgId}`
      );

      if (response.status === 200) {
        setAllSalaryData(response.data.paramObjectsMap.salaryStructureDetails);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getReviseEmployees = async (empCode) => {
    const token = localStorage.getItem("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/SalaryStructure/employeeLatestSalaryStructureDetails?empCode=${empCode}&orgId=${orgId}`,
          { headers }
        );
        console.log(
          "Data fetched successfully:",
          response.data.paramObjectsMap.salaryStructureVO
        );
        return response.data.paramObjectsMap.salaryStructureVO; // Return the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    }
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <>
          <div className="mt-4">
            {/* <h4>Selected Employees</h4> */}
            <table className="w-full table-bordered">
              <thead>
                <tr style={{ backgroundColor: "#626366", color: "white" }}>
                  <th className="py-3 px-4 text-left">Employee Name</th>
                  <th className="py-3 px-4 text-left">Employee Code</th>
                  <th className="py-3 px-4 text-center">
                    Salary Structure Status
                  </th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {allSalaryData.length > 0 ? (
                  allSalaryData.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="py-3 px-4 text-left">{row.empName}</td>
                      <td className="py-3 px-4 text-left">{row.empCode}</td>
                      <td className="py-3 px-4 text-center">
                        {row.salaryStructureStatus === "View" ? (
                          <button
                            className="py-1 px-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-md hover:from-teal-500 hover:to-green-500 transition-all duration-300"
                            onClick={() => handleViewClick(row.empCode)}
                          >
                            View
                          </button>
                        ) : (
                          <span className="px-3 py-1 rounded-lg text-white bg-yellow-500 shadow-md">
                            {row.salaryStructureStatus}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          className={`py-2 px-4 text-white rounded ${
                            row.action === "Add"
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                          onClick={async () => {
                            if (row.action === "Revise") {
                              try {
                                const salaryData = await getReviseEmployees(
                                  row.empCode
                                ); // Wait for API response

                                if (salaryData) {
                                  navigate("/app/salaryStructure", {
                                    state: {
                                      reviseEmployee: salaryData,
                                      from: "SalaryReport",
                                    }, // Pass fetched data
                                  });
                                } else {
                                  console.error(
                                    "Invalid API response for revision."
                                  );
                                }
                              } catch (error) {
                                console.error(
                                  "Error fetching revised employee data:",
                                  error
                                );
                              }
                            } else {
                              navigate("/app/salaryStructure", {
                                state: {
                                  employeeData: row,
                                  from: "SalaryReport",
                                },
                              });
                            }
                          }}
                        >
                          {row.action}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="py-3 px-4 text-center text-gray-500"
                    >
                      No data selected
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      </div>
      <dialog
        ref={dialogRef}
        className="p-8 rounded-xl shadow-2xl w-4/5 max-w-3xl bg-white border border-gray-300"
      >
        {selectedEmployee && (
          <div>
            {/* HEADER */}
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
              Employee Salary Details
            </h2>

            {/* EMPLOYEE DETAILS */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Employee Name
                </label>
                <input
                  type="text"
                  value={selectedEmployee.employeeName}
                  readOnly
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Employee Code
                </label>
                <input
                  type="text"
                  value={selectedEmployee.employeeCode}
                  readOnly
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Department
                </label>
                <input
                  type="text"
                  value={selectedEmployee.department}
                  readOnly
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Position
                </label>
                <input
                  type="text"
                  value={selectedEmployee.position}
                  readOnly
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* EARNINGS TABLE */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Earnings
            </h3>
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left text-gray-600">
                    Heading
                  </th>
                  <th className="border px-4 py-2 text-left text-gray-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedEmployee.salaryStructureEarningsVO.map(
                  (earning, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{earning.heading}</td>
                      <td className="border px-4 py-2">{earning.amount}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            {/* DEDUCTIONS TABLE */}
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
              Deductions
            </h3>
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left text-gray-600">
                    Heading
                  </th>
                  <th className="border px-4 py-2 text-left text-gray-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedEmployee.salaryStructureDeductionVO.map(
                  (deduction, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{deduction.heading}</td>
                      <td className="border px-4 py-2">{deduction.amount}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            {/* BUTTONS */}
            <div className="mt-6 text-center">
              <button
                onClick={() => dialogRef.current.close()}
                className="px-2 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
};

export default SalaryReport;
