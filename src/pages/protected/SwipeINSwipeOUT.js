import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import SearchAttendance from "../../features/flowScreens/SwipeINSwipeOUT/SwipeINSwipeOUT";
import SwipeINSwipeOUT from "../../features/flowScreens/SwipeINSwipeOUT/SwipeINSwipeOUT";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "SwipeIN SwipeOUT" }));
  }, []);

  return <SwipeINSwipeOUT />;
}

export default InternalPage;
