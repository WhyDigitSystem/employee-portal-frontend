import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import LeaveTypeMaster from "../../features/masters/leaveTypeMaster/leaveTypeMaster";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Leave Type Master" }));
  }, []);

  return <LeaveTypeMaster />;
}

export default InternalPage;
