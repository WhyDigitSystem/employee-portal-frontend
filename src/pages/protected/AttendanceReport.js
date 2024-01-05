import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AttendanceReport from "../../features/flowScreens/attendanceReport/AttendanceReport";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Attendance Report" }));
  }, []);

  return <AttendanceReport />;
}

export default InternalPage;
