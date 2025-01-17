import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import SalaryHeads from "../../features/masters/employeeSalary/SalaryHeads";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Salary Heads" }));
  }, []);

  return <SalaryHeads />;
}

export default InternalPage;
