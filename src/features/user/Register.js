import Axios from "axios";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import InputText from '../../components/Input/InputText';
import ErrorText from '../../components/Typography/ErrorText';
import { showNotification } from '../common/headerSlice';
import LandingIntro from './LandingIntro';
import { encryptPassword } from './components/utils';


function Register(){

    const INITIAL_REGISTER_OBJ = {
        name: '',
        password: '',
        emailId: '',
      };
    
      const [loading, setLoading] = useState(false);
      const [notification, setNotification] = useState(false);
      const [errorMessage, setErrorMessage] = useState('');
      const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);
      const dispatch = useDispatch()
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      // const [isReCAPTCHACompleted, setIsReCAPTCHACompleted] = useState(false);
    
      // const handleReCAPTCHAChange = (value) => {
      //   // When reCAPTCHA is completed, this function will be called with the value.
      //   // You can set a flag to indicate that reCAPTCHA is completed.
      //   setIsReCAPTCHACompleted(true);
      // };
    
      const handleNotification = () => {
        setNotification(true)
      };
    
      const registerSuccessful = () => {
        dispatch(showNotification({message : "Registration Successful Please Login ", status : 1}))    
    }
     
    const submitForm = async (e) => {
      e.preventDefault();
      setErrorMessage('');
    
      const trimmedEmail = registerObj.emailId.trim();
      const trimmedPassword = registerObj.password.trim();
    
      if (registerObj.name.trim() === '') {
        setErrorMessage('Name is required!');
      } else if (trimmedEmail === '') {
        setErrorMessage('Email Id is required!');
      } else if (!emailPattern.test(trimmedEmail)) {
        setErrorMessage('Please enter a valid email address.');
      } else if (trimmedPassword === '') {
        setErrorMessage('Password is required!');
      } else if (trimmedPassword.length < 8) {
        setErrorMessage('Password must be at least 8 characters long.');
      } else if (!/[A-Z]/.test(trimmedPassword)) {
        setErrorMessage('Password must contain at least one uppercase letter.');
      } else if (!/[a-z]/.test(trimmedPassword)) {
        setErrorMessage('Password must contain at least one lowercase letter.');
      } else if (!/[@#$%^&+=]/.test(trimmedPassword)) {
        setErrorMessage('Password must contain at least one special character (@#$%^&+=).');
      }
       else {
        setLoading(true);
        // Prepare the user registration data
        const userData = {
          firstName: registerObj.name,
          email: trimmedEmail,
          password: encryptPassword(trimmedPassword),
          userName: trimmedEmail,
        };
        try {
          const response = await Axios.post(`${process.env.REACT_APP_API_URL}/api/user/signup`, userData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.data.status) {
            // Handle authentication failure, display an error message, etc.
            setErrorMessage(response.data.paramObjectsMap.errorMessage);
          } else {
            // Successful registration, perform actions like storing tokens and redirecting
            localStorage.setItem('token', 'YourAuthTokenHere'); // Replace with the actual token
            setLoading(false);
            handleNotification();
            registerSuccessful();
            window.location.href = '/login';
            localStorage.setItem('AccountCreated', true);
          }
        } catch (error) {
          console.error('Registration error:', error);
          setErrorMessage('Registration failed. Please try again.'); // Handle registration error here
          setLoading(false);
        }
      }
    };
    
      const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setRegisterObj({ ...registerObj, [updateType]: value });
      };

    return(
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
                    <form onSubmit={(e) => submitForm(e)}>

                        <div className="mb-4">

                            <InputText defaultValue={registerObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue}/>

                            <InputText defaultValue={registerObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue}/>

                            <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue}/>

                        </div>

                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                        <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Register</button>

                        <div className='text-center mt-4'>Already have an account? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Register