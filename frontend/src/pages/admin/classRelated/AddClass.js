import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";

const AddClass = () => {
  const [sclassName, setSclassName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector(state => state.user);
  const { status, currentUser, response, error, tempDetails } = userState;

  const adminID = currentUser._id;
  const address = "Sclass";

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fields = {
    sclassName,
    adminID,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added' && tempDetails) {
      navigate("/Admin/classes/class/" + tempDetails._id);
      dispatch(underControl());
      setLoader(false);
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch, tempDetails]);

  return (
    <>
      <div className="flex flex-1 justify-center items-center min-h-screen bg-gray-50">
        <div className="max-w-lg w-full bg-white p-12 mt-4 rounded-md border border-gray-300 shadow-md">
          <div className="flex justify-center mb-8">
            <img src={Classroom} alt="classroom" className="w-4/5" />
          </div>
          <form onSubmit={submitHandler}>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Create a class"
                value={sclassName}
                onChange={(e) => setSclassName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={loader}
                className={`w-full py-3 rounded-md text-white text-lg font-semibold transition-colors
                  ${loader ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
                `}
              >
                {loader ? (
                  <svg
                    className="animate-spin h-6 w-6 mx-auto text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                ) : (
                  "Create"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full py-3 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Go Back
              </button>
            </div>
          </form>
        </div>
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddClass;
