import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import PermissionApproval from "../../features/flowScreens/permissionApproval/PermissionApproval";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Permission Approval" }));
  }, []);

  return <PermissionApproval />;
}

export default InternalPage;
