import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { LeaveTypes } from "../../features/masters/LeaveTypes";
//import { LeaveTypes } from "../../components/leave/LeaveTypes";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Leave Type" }));
  }, []);

  return <LeaveTypes />;
}

export default InternalPage;
