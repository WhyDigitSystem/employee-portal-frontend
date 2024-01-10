import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import TodayFullAttendance from "../../features/flowScreens/TodayFullAttendance";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Today Attendance" }));
  }, []);

  return <TodayFullAttendance />;
}

export default InternalPage;
