import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import NewLeaveRequest from "../../features/flowScreens/leaveRequest/NewLeaveRequest";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Leave Request" }));
  }, []);

  return <NewLeaveRequest />;
}

export default InternalPage;
