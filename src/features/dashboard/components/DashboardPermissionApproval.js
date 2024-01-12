import axios from "axios";
import moment from "moment";
import { default as React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleCard from "../../../components/Cards/TitleCard";

function DashboardPermissionApproval() {
  const [permissionList, setPermissionList] = useState([]);

  useEffect(() => {
    getPendingPermissionApproval();
  }, []);

  const getPendingPermissionApproval = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/permissionRequest`,
          {
            headers,
          }
        )
        .then((response) => {
          console.log("Data saved successfully:", response.data);
          setPermissionList(response.data.paramObjectsMap.PermissionRequestVO);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
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
            {permissionList
              .filter((value) => value.status === "Pending")
              .map((value, key) => {
                return (
                  <tr key={key}>
                    {/* <th>{key + 1}</th> */}

                    <td className="dasboardPermissiontbl">{value.empname}</td>
                    {/* <td className="dasboardPermissiontbl">{value.empcode}</td> */}
                    <td className="dasboardPermissiontbl">
                      {moment(value.permissiondate).format("DD-MM-YY")}
                    </td>
                    <td className="dasboardPermissiontbl">
                      {console.log(value.fromhour)}
                      {moment(value.fromhour, "HH:mm:ss").format("HH:mm")}
                    </td>
                    <td className="dasboardPermissiontbl">
                      {moment(value.tohour, "HH:mm:ss").format("HH:mm")}
                    </td>
                    <td className="dasboardPermissiontbl">{`${value.totalhours}`}</td>
                    <td className="dasboardPermissiontbl">{value.status} </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {permissionList.length <= 6 && (
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

export default DashboardPermissionApproval;
