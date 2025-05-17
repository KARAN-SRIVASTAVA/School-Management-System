import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, School, Group } from '@mui/icons-material'; // icons stay same
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
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
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <div className="bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen flex justify-center items-start pt-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          <div 
            className="bg-[#1f1f38] text-gray-400 cursor-pointer p-6 rounded-lg shadow-md hover:bg-[#2c2c6c] hover:text-white transition-colors"
            onClick={() => navigateHandler("Admin")}
          >
            <div className="mb-4">
              <AccountCircle style={{ fontSize: 48 }} />
            </div>
            <h2 className="text-2xl mb-2 font-semibold">Admin</h2>
            <p>Login as an administrator to access the dashboard to manage app data.</p>
          </div>

          <div 
            className="bg-[#1f1f38] text-gray-400 cursor-pointer p-6 rounded-lg shadow-md hover:bg-[#2c2c6c] hover:text-white transition-colors"
            onClick={() => navigateHandler("Student")}
          >
            <div className="mb-4">
              <School style={{ fontSize: 48 }} />
            </div>
            <h2 className="text-2xl mb-2 font-semibold">Student</h2>
            <p>Login as a student to explore course materials and assignments.</p>
          </div>

          <div 
            className="bg-[#1f1f38] text-gray-400 cursor-pointer p-6 rounded-lg shadow-md hover:bg-[#2c2c6c] hover:text-white transition-colors"
            onClick={() => navigateHandler("Teacher")}
          >
            <div className="mb-4">
              <Group style={{ fontSize: 48 }} />
            </div>
            <h2 className="text-2xl mb-2 font-semibold">Teacher</h2>
            <p>Login as a teacher to create courses, assignments, and track student progress.</p>
          </div>
        </div>
      </div>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

      {loader && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50 text-white">
          <svg
            className="animate-spin h-10 w-10 text-white mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          Please Wait
        </div>
      )}
    </div>
  );
};

export default ChooseUser;
