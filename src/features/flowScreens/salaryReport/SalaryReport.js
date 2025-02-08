import axios from "axios";
import { default as React, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SalaryReport = () => {
  const [allSalaryData, setAllSalaryData] = React.useState([]);
  const [allEmployeeName, setAllEmployeeName] = React.useState([]);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const navigate = useNavigate();

  useEffect(() => {
    getAllSalaryReport();
  }, []);

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

  // const getReviseEmployees = (empCode) => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };

  //     axios
  //       .get(
  //         `${process.env.REACT_APP_API_URL}/api/SalaryStructure/employeeLatestSalaryStructureDetails?empCode=${empCode}&orgId=${orgId}`,
  //         { headers }
  //       )
  //       .then((response) => {
  //         console.log(
  //           "Data fetched successfully:",
  //           response.data.paramObjectsMap.salaryStructureVO
  //         );
  //         setAllEmployeeName(response.data.paramObjectsMap.salaryStructureVO);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }
  // };

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
                        {row.salaryStructureStatus}
                      </td>
                      {/* <td className="py-3 px-4 text-center">
                        <button
                          className={`py-2 px-4 text-white rounded ${
                            row.action === "Add"
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                          onClick={() =>
                            navigate("/app/salaryStructure", {
                              state: { employee: row },
                            })
                          }
                        >
                          {row.action}
                        </button>
                      </td> */}
                      {/* <td className="py-3 px-4 text-center">
                        <button
                          className={`py-2 px-4 text-white rounded ${
                            row.action === "Add"
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                          onClick={() => {
                            if (row.action === "Revise") {
                              getReviseEmployees(row.empCode);
                            } else {
                              navigate("/app/salaryStructure", {
                                state: { employee: row },
                              });
                            }
                          }}
                        >
                          {row.action}
                        </button>
                      </td> */}
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
                                    state: { reviseEmployee: salaryData }, // Pass fetched data
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
                                state: { employeeData: row  },
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
    </>
  );
};

export default SalaryReport;
