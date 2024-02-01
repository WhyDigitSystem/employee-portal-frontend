import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import SearchAttendance from "../../features/flowScreens/searchAttendance/SearchAttendance";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Search Attendance" }));
  }, []);

  return <SearchAttendance />;
}

export default InternalPage;
