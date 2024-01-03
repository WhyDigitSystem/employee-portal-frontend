import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { Holidays } from "../../features/masters/Holidays";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Leave Request" }));
  }, []);

  return <Holidays />;
}

export default InternalPage;
