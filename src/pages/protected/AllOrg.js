import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AllOrg from "../../features/productAdmin/AllOrg";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Organization" }));
  }, []);

  return <AllOrg />;
}

export default InternalPage;
