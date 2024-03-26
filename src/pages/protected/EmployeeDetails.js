import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { EmployeeDetails } from "../../features/masters/employee/EmployeeDetails";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Employee Details" }));
  }, []);

  return <EmployeeDetails />;
}

export default InternalPage;
