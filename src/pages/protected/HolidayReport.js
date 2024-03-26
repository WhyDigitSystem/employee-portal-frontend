import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import HolidayReport from "../../features/flowScreens/holidayReport/HolidayReport";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Holiday Report" }));
  }, []);

  return <HolidayReport />;
}

export default InternalPage;
