import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import SalaryReport from "../../features/flowScreens/salaryReport/SalaryReport";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Salary Report" }));
  }, []);

  return <SalaryReport />;
}

export default InternalPage;
