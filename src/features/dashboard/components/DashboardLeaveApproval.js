import axios from "axios";
import moment from "moment";
import { default as React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleCard from "../../../components/Cards/TitleCard";

function DashboardLeaveApproval() {
  const [pendingLeaveRequestList, setPendingLeaveRequestList] = useState([]);

  useEffect(() => {
    getAllPendingLeaveRequest();
  }, []);

  const getAllPendingLeaveRequest = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/leaverequest`
      );

      if (response.status === 200) {
        setPendingLeaveRequestList(
          response.data.paramObjectsMap.leaveRequestVO
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <TitleCard title={"Leave Status"}>
      {/** Table Data */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {/* <th></th> */}
              <th className="normal-case dasboardPermissiontbl">Emp Name</th>
              <th className="normal-case dasboardPermissiontbl">From</th>
              <th className="normal-case dasboardPermissiontbl">To</th>
              <th className="normal-case dasboardPermissiontbl">Total</th>
              <th className="normal-case dasboardPermissiontbl">status</th>
            </tr>
          </thead>
          <tbody>
            {pendingLeaveRequestList
              .filter((value) => value.status === "Pending")
              .map((value, key) => {
                return (
                  <tr key={key}>
                    {/* <th>{key + 1}</th> */}

                    <td className="dasboardPermissiontbl">{value.empname}</td>
                    <td className="dasboardPermissiontbl">
                      {moment(value.fromdate).format("DD-MM-YY")}
                    </td>
                    <td className="dasboardPermissiontbl">
                      {moment(value.todate).format("DD-MM-YY")}
                    </td>
                    <td className="dasboardPermissiontbl">{`${value.totaldays}`}</td>
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
        {pendingLeaveRequestList.length <= 6 && (
          <p
            className="text-end"
            sx={{
              color: "green",
            }}
          >
            <Link to="/app/leaveapproval">More...</Link>
          </p>
        )}
      </div>
    </TitleCard>
  );
}

export default DashboardLeaveApproval;
