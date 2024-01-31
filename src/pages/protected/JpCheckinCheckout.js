import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import JpCheckinCheckout from "../../features/masters/jpCheckinCheckout";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "JP CheckIn CheckOut" }));
  }, []);

  return <JpCheckinCheckout />;
}

export default InternalPage;
