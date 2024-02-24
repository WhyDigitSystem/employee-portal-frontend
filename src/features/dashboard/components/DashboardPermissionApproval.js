import axios from "axios";
import moment from "moment";
import { default as React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleCard from "../../../components/Cards/TitleCard";
import ApprovalEmail from "../../../utils/ApprovalEmail";

function DashboardPermissionApproval() {
  const [pendingPermissionRequestList, setPendingPermissionRequestList] =
    useState([]);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [branchId, setBranchId] = React.useState(
    localStorage.getItem("branchId")
  );
  const [message, setMessage] = React.useState("");
  const [mailTo, setMailTo] = React.useState("");
  const [empName, setEmpName] = React.useState("");
  const [sendMail, setSendMail] = React.useState(false);

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

  const approvePermission = async (reqId) => {
    try {
      if (reqId) {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/permissionRequestapp/${reqId}?id=${reqId}`,
          {
            approvedat: new Date().toISOString(),
            approvedby: localStorage.getItem("empcode"),
            requestid: reqId,
            status: "Approved",
            remarks: "Ok Granted",
          }
        );

        if (response.status === 200) {
          getAllPendingPermissionRequest();
          setSendMail(true);
          setEmpName(localStorage.getItem("empname"));
          setMailTo(localStorage.getItem("userName"));
          setMessage("Your Permission Request has been Approved..!!");
        }
      }
    } catch (error) {
      console.error("Error updating permission request:", error);
    }
  };
  const rejectPermission = async (reqId) => {
    try {
      if (reqId) {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/permissionRequestapp/${reqId}?id=${reqId}`,
          {
            approvedat: new Date().toISOString(),
            approvedby: localStorage.getItem("empcode"),
            requestid: reqId,
            status: "Rejected",
            remarks: "We won't Allow",
          }
        );

        if (response.status === 200) {
          getAllPendingPermissionRequest();
          setSendMail(true);
          setEmpName(localStorage.getItem("empname"));
          setMailTo(localStorage.getItem("userName"));
          setMessage("Your Permission Request has been Rejected..!!");
        }
      }
    } catch (error) {
      console.error("Error updating permission request:", error);
    }
  };

  return (
    <>
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
                  const formatedFromTime = moment
                    .utc(value.fromhour)
                    .format("HH:mm A");
                  const formatedToTime = moment
                    .utc(value.tohour)
                    .format("HH:mm A");
                  const formatedTotHrs = moment
                    .utc(value.tohour)
                    .format("HH:mm ");

                  return (
                    <tr key={key}>
                      {/* <th>{key + 1}</th> */}

                      <td className="dasboardPermissiontbl">{value.empname}</td>
                      <td className="dasboardPermissiontbl">
                        {moment(value.permissiondate).format("DD-MM-YY")}
                      </td>
                      <td className="dasboardPermissiontbl">
                        {value.fromhour}
                      </td>
                      {/* <td className="dasboardPermissiontbl">{value.fromhour}</td> */}
                      {/* <td className="dasboardPermissiontbl">{formatedToTime}</td> */}
                      <td className="dasboardPermissiontbl">{value.tohour}</td>
                      {/* <td className="dasboardPermissiontbl">{`${formatedTotHrs}`}</td> */}
                      <td className="dasboardPermissiontbl">{`${value.totalhours}`}</td>

                      <td className="d-flex flex-row">
                        <button
                          className="btn  btn-sm btn-ghost normal-case"
                          onClick={() => approvePermission(value.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 0 24 24"
                            style={{ color: "green", cursor: "pointer" }}
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="currentColor"
                              d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                            />
                          </svg>
                        </button>
                        <button
                          className="btn  btn-sm btn-ghost normal-case"
                          onClick={() => rejectPermission(value.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 0 24 24"
                            style={{ color: "red", cursor: "pointer" }}
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="currentColor"
                              d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59L5 6.41l5.59 5.59L5 17.59l1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"
                            />
                          </svg>
                        </button>
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
      {sendMail && (
        <ApprovalEmail to_email={mailTo} to_name={empName} message={message} />
      )}
    </>
  );
}

export default DashboardPermissionApproval;
