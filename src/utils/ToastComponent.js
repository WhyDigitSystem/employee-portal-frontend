import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Assuming you have defined or imported the 'dark' theme
function ToastComponent({ content, type }) {
  useEffect(() => {
    if (type === "success") {
      toast.success(content, { autoClose: 3000, theme: "colored" });
    } else if (type === "error") {
      toast.error(content, { autoClose: 3000, theme: "colored" });
    }
  }, [content, type]);
  return <ToastContainer />;
}
export default ToastComponent;
