import { useEffect } from "react";
import { useDispatch } from "react-redux";
//import { LeaveRequest } from "../../features/LeaveRequest";
import { setPageTitle } from "../../features/common/headerSlice";
import { LeaveRequest } from "../../features/flowScreens/LeaveRequest";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Leave Request" }));
  }, []);

  return <LeaveRequest />;
}

export default InternalPage;
