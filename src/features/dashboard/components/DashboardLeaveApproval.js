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

  //PUT METHOD (LEAVE APPROVAL)
  const ApproveLeave = async (reqId) => {
    try {
      if (reqId) {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/leaverequestapp/${reqId}?id=${reqId}`,
          {
            approvedat: new Date().toISOString(),
            approvedby: localStorage.getItem("empcode"),
            requestid: reqId,
            status: "Approved",
            remarks: "OK Leave Granted",
          }
        );

        if (response.status === 200) {
          getAllPendingLeaveRequest();
        }
      }
    } catch (error) {
      console.error("Error updating leave request:", error);
    }
  };
  const RejectLeave = async (reqId) => {
    try {
      if (reqId) {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/leaverequestapp/${reqId}?id=${reqId}`,
          {
            approvedat: new Date().toISOString(),
            approvedby: localStorage.getItem("empcode"),
            requestid: reqId,
            status: "Rejected",
            remarks: "Leave won't allow",
          }
        );

        if (response.status === 200) {
          getAllPendingLeaveRequest();
        }
      }
    } catch (error) {
      console.error("Error updating leave request:", error);
    }
  };

  //PUT METHOD END

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
              <th className="normal-case dasboardPermissiontbl">Status</th>
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
                    {/* new try */}
                    {/* Approval symbol */}
                    <td className="d-flex flex-row">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 0 24 24"
                        style={{ color: "green", cursor: "pointer" }}
                        onClick={() => ApproveLeave(value.id)}
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="currentColor"
                          d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 0 24 24"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => RejectLeave(value.id)}
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="currentColor"
                          d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59L5 6.41l5.59 5.59L5 17.59l1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"
                        />
                      </svg>
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
