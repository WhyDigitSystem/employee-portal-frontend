import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { PermissionRequest } from "../../features/flowScreens/permissionRequest/PermissionRequest";
//import { PermissionRequest } from "../../features/flowScreens/PermissionRequest";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Permission Report" }));
  }, []);

  return <PermissionRequest />;
}

export default InternalPage;
