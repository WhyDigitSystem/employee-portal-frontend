import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import SalaryStructure from "../../features/masters/employeeSalary/SalaryStructure";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Salary Structure" }));
  }, []);

  return <SalaryStructure />;
}

export default InternalPage;
