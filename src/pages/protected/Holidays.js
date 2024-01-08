import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { Holiday } from "../../features/masters/holidayMaster/Holidays";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Holidays" }));
  }, []);

  return <Holiday />;
}

export default InternalPage;
