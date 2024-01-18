import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import ChangePwd from "../../features/settings/changePassword";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Change Password" }));
  }, []);

  return <ChangePwd />;
}

export default InternalPage;
