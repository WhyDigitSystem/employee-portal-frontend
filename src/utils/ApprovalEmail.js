import emailjs from "@emailjs/browser";
import { useEffect } from "react";
const SendEmail = async (message, to_email, to_name) => {
  try {
    const templateParams = {
      message: message,
      to_name: to_name,
      to_email: to_email,
    };
    const response = await emailjs.send(
      "service_a6yjejr",
      "template_2gahkp4",
      templateParams,
      "Gm0fxripLOTNeLMpg"
    );
    console.log("test", message, to_email, to_name);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
const ApprovalEmail = ({ message, to_email, to_name }) => {
  useEffect(() => {
    console.log("abcd: ", message, to_email, to_name);
    SendEmail(message, to_email, to_name);
  }, [message, to_email, to_name]);
  return null;
};
export default ApprovalEmail;
