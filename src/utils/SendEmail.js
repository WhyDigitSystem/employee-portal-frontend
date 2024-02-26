import emailjs from "@emailjs/browser";
import { useEffect } from "react";

const SendEmail = async (fDate, tDate, reason, message, message2, date) => {
  try {
    let message2Template;
    if (date) {
      message2Template = `${localStorage.getItem(
        "empname"
      )} ${message2} ${date} from ${fDate} to ${tDate}.`;
    } else {
      message2Template = `${localStorage.getItem(
        "empname"
      )} ${message2} from ${fDate} to ${tDate}.`;
    }
    const templateParams = {
      message: `${message}${localStorage.getItem("empname")}..!!`,
      to_name: "Kavitha",
      from_name: localStorage.getItem("empname"),
      message2: message2Template,
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

const EmailConfig = ({ fDate, tDate, reason, message, message2, date }) => {
  useEffect(() => {
    SendEmail(fDate, tDate, reason, message, message2, date);
  }, [fDate, tDate, reason, message, message2, date]);

  return null;
};

export default EmailConfig;
