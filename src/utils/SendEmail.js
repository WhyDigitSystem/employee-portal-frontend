import emailjs from "@emailjs/browser";
import { useEffect } from "react";

const SendEmail = async (fDate, tDate, reason) => {
  try {
    const templateParams = {
      message: `You have a new Leave Approval Request from ${localStorage.getItem(
        "empname"
      )}`,
      to_name: "Kavitha",
      from_name: localStorage.getItem("empname"),
      message2: `${localStorage.getItem(
        "empname"
      )} is requesting leave from: ${fDate} to ${tDate}`,
      reason: reason,
    };

    const response = await emailjs.send(
      "service_wq3zl7a",
      "template_jsenrs8",
      templateParams,
      "FQM7O8vHxDdSIW6Kq"
    );

    console.log("test", fDate, tDate, reason);

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const EmailConfig = ({ fDate, tDate, reason }) => {
  useEffect(() => {
    SendEmail(fDate, tDate, reason);
  }, [fDate, tDate, reason]);

  return null;
};

export default EmailConfig;
