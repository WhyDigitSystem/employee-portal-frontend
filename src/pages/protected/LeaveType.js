import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import LeaveType from "../../features/masters/leaveType/LeaveType";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Leave Type" }));
  }, []);

  return <LeaveType />;
}

export default InternalPage;
