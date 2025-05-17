import React from 'react';
import { Link } from 'react-router-dom';
import Students from "../assets/students.svg";

const Homepage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl gap-0">
        
        {/* Left Image */}
        <div>
          <img src={Students} alt="students" className="w-full h-auto" />
        </div>
        
        {/* Right content */}
        <div className="p-6 md:p-12 flex flex-col justify-center h-screen">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Welcome to
            <br />
            School Management
            <br />
            System
          </h1>

          <p className="mt-8 mb-8 text-gray-700 max-w-md leading-relaxed">
            Streamline school management, class organization, and add students and faculty.
            Seamlessly track attendance, assess performance, and provide feedback.
            Access records, view marks, and communicate effortlessly.
          </p>

          <div className="flex flex-col items-center gap-4 max-w-xs">
            <Link to="/choose" className="w-full">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition">
                Login
              </button>
            </Link>

            <Link to="/chooseasguest" className="w-full">
              <button className="w-full border border-purple-600 text-purple-600 hover:bg-purple-100 font-semibold py-3 rounded-md transition">
                Login as Guest
              </button>
            </Link>

            <p className="text-gray-700 mt-6 text-center">
              Don't have an account?{' '}
              <Link to="/Adminregister" className="text-purple-700 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Homepage;
