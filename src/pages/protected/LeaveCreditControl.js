import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { Holiday } from "../../features/masters/holidayMaster/Holidays";
import LeaveCreditControl from "../../features/masters/LeaveCreditcontrol";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Leave Credit Control" }));
  }, []);

  return <LeaveCreditControl />;
}

export default InternalPage;
