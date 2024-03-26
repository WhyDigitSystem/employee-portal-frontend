import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import OrganizationSetup from "../../features/masters/organizationSetup/OrganizationSetup";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Organization Setup" }));
  }, []);

  return <OrganizationSetup />;
}

export default InternalPage;
