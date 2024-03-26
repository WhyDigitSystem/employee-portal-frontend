import emailjs from "@emailjs/browser";
import { useEffect } from "react";
const SendEmail = async (message, to_email, to_name, status) => {
  try {
    const templateParams = {
      message: `${message}${status}..!!`,
      to_name: to_name,
      to_email: to_email,
    };

    // const response = await emailjs.send(
    //   "service_a6yjejr",
    //   "template_2gahkp4",
    //   templateParams,
    //   "Gm0fxripLOTNeLMpg"
    // );

    const response = await emailjs.send(
      "service_xrgab0o",
      "template_erwdu6v",
      templateParams,
      "941V7bNnHzPNaTlXP"
    );
    console.log("test", message, to_email, to_name);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
const ApprovalEmail = ({ message, to_email, to_name, status }) => {
  useEffect(() => {
    console.log("abcd: ", message, to_email, to_name, status);
    SendEmail(message, to_email, to_name, status);
  }, [message, to_email, to_name, status]);
  return null;
};
export default ApprovalEmail;
