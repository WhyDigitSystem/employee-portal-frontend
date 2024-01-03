import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
