import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { Practice } from "../../features/flowScreens/Practice";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Today Attendance" }));
  }, []);

  return <Practice />;
}

export default InternalPage;
