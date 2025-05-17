import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { PurpleButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';

const StudentAttendance = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams();

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            dispatch(getUserDetails(params.id, "Student"));
        } else if (situation === "Subject") {
            const { studentID, subjectID } = params;
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    };

    const fields = { subName: chosenSubName, status, date };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(updateStudentFields(studentID, fields, "StudentAttendance"));
    };

    useEffect(() => {
        if (response) {
            setLoader(false);
            setShowPopup(true);
            setMessage(response);
        } else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("error");
        } else if (statestatus === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("Done Successfully");
        }
    }, [response, statestatus, error]);

    return (
        <>
            {loading ? (
                <div className="text-center py-20">Loading...</div>
            ) : (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-full max-w-xl p-8">
                        <div className="mb-6 space-y-2">
                            <h2 className="text-2xl font-semibold">
                                Student Name: {userDetails.name}
                            </h2>
                            {currentUser.teachSubject && (
                                <h2 className="text-2xl font-semibold">
                                    Subject Name: {currentUser.teachSubject?.subName}
                                </h2>
                            )}
                        </div>
                        <form onSubmit={submitHandler} className="space-y-6">
                            {situation === "Student" && (
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Select Subject
                                    </label>
                                    <select
                                        value={subjectName}
                                        onChange={changeHandler}
                                        required
                                        className="w-full border border-gray-300 rounded px-4 py-2"
                                    >
                                        {subjectsList && subjectsList.length > 0 ? (
                                            subjectsList.map((subject, index) => (
                                                <option key={index} value={subject.subName}>
                                                    {subject.subName}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">Add Subjects For Attendance</option>
                                        )}
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Attendance Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                >
                                    <option value="">Choose an option</option>
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>

                            <PurpleButton
                                fullWidth
                                size="large"
                                className="mt-4"
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div> : "Submit"}
                            </PurpleButton>
                        </form>
                    </div>
                </div>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentAttendance;
