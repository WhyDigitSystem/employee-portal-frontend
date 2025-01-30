import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Designation from "../../features/masters/designation/designation";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Designation" }));
  }, []);

  return <Designation />;
}

export default InternalPage;
