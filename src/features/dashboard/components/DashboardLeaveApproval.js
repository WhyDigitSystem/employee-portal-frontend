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
                    <td className="dasboardPermissiontbl">{value.status}</td>
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
            <Link to="/app/todayfullattendance">More...</Link>
          </p>
        )}
      </div>
    </TitleCard>
  );
}

export default DashboardLeaveApproval;
