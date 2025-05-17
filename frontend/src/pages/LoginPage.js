import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // We still keep these icons for toggle eye
import bgpic from "../assets/designlogin.jpg";
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import styled from 'styled-components';

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (role === "Student") {
      const rollNum = event.target.rollNumber.value;
      const studentName = event.target.studentName.value;
      const password = event.target.password.value;

      if (!rollNum || !studentName || !password) {
        if (!rollNum) setRollNumberError(true);
        if (!studentName) setStudentNameError(true);
        if (!password) setPasswordError(true);
        return;
      }
      const fields = { rollNum, studentName, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    } else {
      const email = event.target.email.value;
      const password = event.target.password.value;

      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }

      const fields = { email, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'rollNumber') setRollNumberError(false);
    if (name === 'studentName') setStudentNameError(false);
  };

  const guestModeHandler = () => {
    const password = "zxc";

    if (role === "Admin") {
      const email = "yogendra@12";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Student") {
      const rollNum = "1";
      const studentName = "Dipesh Awasthi";
      const fields = { rollNum, studentName, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Teacher") {
      const email = "tony@12";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    }
  }, [status, currentRole, navigate, error, response, currentUser]);

  return (
    <div className="flex h-screen">
      {/* Left side form container */}
      <div className="w-full sm:w-8/12 md:w-5/12 flex flex-col items-center justify-center bg-white shadow-lg p-10">
        <h1 className="text-4xl font-semibold text-[#2c2143] mb-2">{role} Login</h1>
        <p className="text-lg mb-6">Welcome back! Please enter your details</p>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {role === "Student" ? (
            <>
              <div className="mb-4">
                <label htmlFor="rollNumber" className="block text-gray-700 font-medium mb-1">
                  Enter your Roll Number
                </label>
                <input
                  type="number"
                  id="rollNumber"
                  name="rollNumber"
                  autoComplete="off"
                  autoFocus
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500
                    ${rollNumberError ? 'border-red-500' : 'border-gray-300'}`}
                />
                {rollNumberError && <p className="text-red-600 text-sm mt-1">Roll Number is required</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="studentName" className="block text-gray-700 font-medium mb-1">
                  Enter your name
                </label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  autoComplete="name"
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500
                    ${studentNameError ? 'border-red-500' : 'border-gray-300'}`}
                />
                {studentNameError && <p className="text-red-600 text-sm mt-1">Name is required</p>}
              </div>
            </>
          ) : (
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Enter your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500
                  ${emailError ? 'border-red-500' : 'border-gray-300'}`}
              />
              {emailError && <p className="text-red-600 text-sm mt-1">Email is required</p>}
            </div>
          )}

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type={toggle ? 'text' : 'password'}
              id="password"
              name="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500
                ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
            />
            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="absolute right-3 top-9 text-gray-500 focus:outline-none"
              tabIndex={-1}
              aria-label="Toggle password visibility"
            >
              {toggle ? <Visibility /> : <VisibilityOff />}
            </button>
            {passwordError && <p className="text-red-600 text-sm mt-1">Password is required</p>}
          </div>

          <div className="flex justify-between items-center mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-600"
                value="remember"
              />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <StyledLink href="#" className="text-purple-600 hover:underline">
              Forgot password?
            </StyledLink>
          </div>

          <button
            type="submit"
            disabled={loader}
            className={`w-full py-3 rounded-md text-white font-semibold
              bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500
              ${loader ? 'cursor-not-allowed opacity-70' : ''}`}
          >
            {loader ? (
              <svg className="animate-spin mx-auto h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              "Login"
            )}
          </button>

          <button
            type="button"
            onClick={guestModeHandler}
            className="w-full mt-4 mb-6 py-3 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Login as Guest
          </button>

          {role === "Admin" && (
            <div className="flex items-center justify-center">
              <p>Don't have an account?</p>
              <div className="ml-2">
                <StyledLink to="/Adminregister" className="text-purple-600 hover:underline">
                  Sign up
                </StyledLink>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Right side image */}
      <div
        className="hidden sm:block sm:w-4/12 md:w-7/12 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgpic})` }}
      />

      {/* Guest loader backdrop */}
      {guestLoader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50 text-white">
          <svg className="animate-spin h-12 w-12 mb-4 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <span>Please Wait</span>
        </div>
      )}

      {/* Popup */}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default LoginPage;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
