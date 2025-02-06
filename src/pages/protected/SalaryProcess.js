import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import SalaryProcess from "../../features/masters/salaryProcess/SalaryProcess";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Salary Process" }));
  }, []);

  return <SalaryProcess />;
}

export default InternalPage;
