import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AttendanceProcess from "../../features/masters/attendanceProcess/AttendanceProcess";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Attendance Process" }));
  }, []);

  return <AttendanceProcess />;
}

export default InternalPage;
