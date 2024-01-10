import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import LandingIntro from "./LandingIntro";
import { encryptPassword } from "./components/utils";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    email: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const [isReCAPTCHACompleted, setIsReCAPTCHACompleted] = useState(false);
  const [alertTnfo, setAlertInfo] = useState(true);

  const history = useNavigate();
  const SESSION_TIMEOUT = 20 * 60 * 1000; // 20 minutes in milliseconds

  useEffect(() => {
    let sessionTimer;
    const resetSessionTimer = () => {
      clearTimeout(sessionTimer);
      sessionTimer = setTimeout(() => {
        // Show session expiry warning here (e.g., a pop-up or notification)
        alert("Your session will expire soon. Please log in again.");
        // Redirect to the login page or perform logout action
        // history.push("/login"); // Redirect to login page
      }, SESSION_TIMEOUT);
    };

    // Reset the session timer whenever there is user activity (e.g., form input)
    const activityEvents = ["keydown", "mousedown", "click", "touchstart"];
    const resetTimerOnActivity = () => {
      resetSessionTimer();
    };
    activityEvents.forEach((event) => {
      document.addEventListener(event, resetTimerOnActivity);
    });

    // Initialize the session timer on component mount
    resetSessionTimer();

    // Clear the timer and remove event listeners on component unmount
    return () => {
      clearTimeout(sessionTimer);
      activityEvents.forEach((event) => {
        document.removeEventListener(event, resetTimerOnActivity);
      });
    };
  }, [SESSION_TIMEOUT, history]);

  const handleReCAPTCHAChange = (value) => {
    // When reCAPTCHA is completed, this function will be called with the value.
    // You can set a flag to indicate that reCAPTCHA is completed.
    setIsReCAPTCHACompleted(true);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedEmail = loginObj.email.trim();
    const trimmedPassword = loginObj.password.trim();

    if (trimmedEmail === "") {
      setErrorMessage("Email Id is required!");
    } else if (!isValidEmail(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
    } else if (trimmedPassword === "") {
      setErrorMessage("Password is required!");
    } else {
      setLoading(true);

      // Create a request body
      const requestBody = {
        email: trimmedEmail,
        password: encryptPassword(trimmedPassword),
      };

      try {
        const response = await Axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/login`,
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.data.status) {
          // Handle authentication failure, display an error message, etc.
          setErrorMessage(response.data.paramObjectsMap.errorMessage);
        } else {
          // Successful login, perform actions like storing tokens and redirecting
          localStorage.setItem(
            "token",
            response.data.paramObjectsMap.user.token
          );
          localStorage.setItem("userName", trimmedEmail);
          localStorage.setItem(
            "userDetails",
            response.data.paramObjectsMap.user.role
          );
          localStorage.setItem(
            "userId",
            response.data.paramObjectsMap.user.userId
          );
          localStorage.setItem(
            "empname",
            response.data.paramObjectsMap.user.empname
          );
          localStorage.setItem(
            "empcode",
            response.data.paramObjectsMap.user.empcode
          );
          // Redirect the user to the welcome page
          console.log("token", response.data);
          window.location.href = "/app/welcome";
        }

        setLoading(false);
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage("Login failed. Please try again."); // Handle login error here
        setLoading(false);
      }
    }
  };

  // Helper function to validate email format
  const isValidEmail = (email) => {
    // Use a regular expression or any other method to validate the email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  type="email"
                  defaultValue={loginObj.email}
                  updateType="email"
                  containerStyle="mt-4"
                  labelTitle="Email Id"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>

              <div className="text-right text-primary">
                <Link to="/forgot-password">
                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }
              >
                Login
              </button>

              <div className="text-center mt-4">
                Don't have an account yet?{" "}
                <Link to="/register">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Register
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
