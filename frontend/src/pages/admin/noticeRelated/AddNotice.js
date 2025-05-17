import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';
import Popup from '../../../components/Popup';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id;

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const fields = { title, details, date, adminID };
  const address = "Notice";

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl());
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
          onSubmit={submitHandler}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Add Notice</h2>

          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            type="text"
            placeholder="Enter notice title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="details">
            Details
          </label>
          <input
            id="details"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            type="text"
            placeholder="Enter notice details..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />

          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            type="date"
            placeholder="Enter notice date..."
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loader}
            className={`w-full bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 hover:bg-blue-700 transition duration-200 ${
              loader ? 'cursor-not-allowed opacity-70' : ''
            }`}
          >
            {loader ? <CircularProgress size={24} color="inherit" /> : 'Add'}
          </button>
        </form>
      </div>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddNotice;
