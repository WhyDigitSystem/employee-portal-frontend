import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import LeaveApproval from "../../features/flowScreens/leaveApproval/LeaveApproval";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Leave Approval" }));
  }, []);

  return <LeaveApproval />;
}

export default InternalPage;
