import axios from "axios";
import moment from "moment";
import { default as React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleCard from "../../../components/Cards/TitleCard";

function DashboardPermissionApproval() {
  const [pendingPermissionRequestList, setPendingPermissionRequestList] =
    useState([]);

  useEffect(() => {
    getAllPendingPermissionRequest();
  }, []);

  const getAllPendingPermissionRequest = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/permissionRequest`
      );

      if (response.status === 200) {
        setPendingPermissionRequestList(
          response.data.paramObjectsMap.PermissionRequestVO
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <TitleCard title={"Permission Status"}>
      {/** Table Data */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {/* <th></th> */}
              <th className="normal-case dasboardPermissiontbl">Emp Name</th>
              <th className="normal-case dasboardPermissiontbl">Date</th>
              <th className="normal-case dasboardPermissiontbl">From</th>
              <th className="normal-case dasboardPermissiontbl">To</th>
              <th className="normal-case dasboardPermissiontbl">Hrs</th>
              <th className="normal-case dasboardPermissiontbl">Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingPermissionRequestList
              .filter((value) => value.status === "Pending")
              .map((value, key) => {
                return (
                  <tr key={key}>
                    {/* <th>{key + 1}</th> */}

                    <td className="dasboardPermissiontbl">{value.empname}</td>
                    <td className="dasboardPermissiontbl">
                      {moment(value.permissiondate).format("DD-MM-YY")}
                    </td>
                    <td className="dasboardPermissiontbl">{value.fromhour}</td>
                    <td className="dasboardPermissiontbl">{value.tohour}</td>
                    <td className="dasboardPermissiontbl">{`${value.totalhours}`}</td>
                    {/* <td className="dasboardPermissiontbl">{value.status}</td> */}
                    <td className="dasboardPermissiontbl">
                      {/* {value.status ? ( */}
                      <span style={{ color: "red" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          width="16"
                          viewBox="0 0 24 24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="currentColor"
                            d="M10 4v6h4V4h-4zm0 10h4v-2h-4v2zm0-4h4V8h-4v2z"
                          />
                        </svg>
                      </span>
                      {/* ) : ( */}
                      <span style={{ color: "green" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          width="16"
                          viewBox="0 0 24 24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="currentColor"
                            d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                          />
                        </svg>
                      </span>
                      {/* )} */}
                      {/* &nbsp;{value.status ? "Pending" : "Other Status"} */}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {pendingPermissionRequestList.length <= 6 && (
          <p
            className="text-end"
            sx={{
              color: "green",
            }}
          >
            <Link to="/app/permissionapproval">More...</Link>
          </p>
        )}
      </div>
    </TitleCard>
  );
}

export default DashboardPermissionApproval;
