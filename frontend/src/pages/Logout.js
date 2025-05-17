import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';

const Logout = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-5 flex flex-col justify-center items-center shadow-md bg-purple-200/40 text-black">
      <h1 className="text-2xl font-semibold mb-4">{currentUser?.name || "User"}</h1>
      <p className="mb-5 text-base text-center">Are you sure you want to log out?</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md text-lg transition-colors"
      >
        Log Out
      </button>
      <button
        onClick={handleCancel}
        className="bg-purple-800 hover:bg-purple-900 text-white px-5 py-2 rounded-md text-lg mt-3 transition-colors"
      >
        Cancel
      </button>
    </div>
  );
};

export default Logout;
