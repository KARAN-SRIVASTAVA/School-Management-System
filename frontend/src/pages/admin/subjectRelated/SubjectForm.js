import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const sclassName = params.id;
    const adminID = currentUser._id;
    const address = "Subject";

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const handleSubjectNameChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subName = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subCode = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].sessions = event.target.value || 0;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const fields = {
        sclassName,
        subjects: subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/subjects");
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
    }, [status, navigate, error, response, dispatch]);

    return (
        <form onSubmit={submitHandler} className="space-y-4">
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Add Subjects</h2>
            </div>

            {subjects.map((subject, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subject Name</label>
                        <input
                            type="text"
                            value={subject.subName}
                            onChange={handleSubjectNameChange(index)}
                            required
                            className="mt-1 block w-full border border-gray-400 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subject Code</label>
                        <input
                            type="text"
                            value={subject.subCode}
                            onChange={handleSubjectCodeChange(index)}
                            required
                            className="mt-1 block w-full border border-gray-400 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sessions</label>
                        <input
                            type="number"
                            min="0"
                            value={subject.sessions}
                            onChange={handleSessionsChange(index)}
                            required
                            className="mt-1 block w-full border border-gray-400 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-end">
                        {index === 0 ? (
                            <button
                                type="button"
                                onClick={handleAddSubject}
                                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-100"
                            >
                                Add Subject
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleRemoveSubject(index)}
                                className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-100"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            ))}

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loader}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {loader ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    ) : (
                        'Save'
                    )}
                </button>
            </div>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </form>
    );
};

export default SubjectForm;
