import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Payslip from "../../features/flowScreens/Payslip/Payslip";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "PaySlip" }));
  }, []);

  return <Payslip />;
}

export default InternalPage;
