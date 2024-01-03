import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { PermissionRequest } from "../../components/permission/PermissionRequest";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Permission Request" }));
  }, []);

  return <PermissionRequest />;
}

export default InternalPage;
