import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import Popup from '../../../components/Popup';
import { BlueButton } from '../../../components/buttonStyles';

const StudentExamMarks = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams();

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [marksObtained, setMarksObtained] = useState("");

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
        if (userDetails?.sclassName && situation === "Student") {
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

    const fields = { subName: chosenSubName, marksObtained };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"));
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
                <div>Loading...</div>
            ) : (
                <div className="flex justify-center py-24 px-4">
                    <div className="w-full max-w-xl">
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
                                    <label htmlFor="subject" className="block mb-1 font-medium text-gray-700">
                                        Select Subject
                                    </label>
                                    <select
                                        id="subject"
                                        value={subjectName}
                                        onChange={changeHandler}
                                        required
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        {subjectsList && subjectsList.length > 0 ? (
                                            subjectsList.map((subject, index) => (
                                                <option key={index} value={subject.subName}>
                                                    {subject.subName}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">Add Subjects For Marks</option>
                                        )}
                                    </select>
                                </div>
                            )}
                            <div>
                                <label htmlFor="marks" className="block mb-1 font-medium text-gray-700">
                                    Enter Marks
                                </label>
                                <input
                                    type="number"
                                    id="marks"
                                    value={marksObtained}
                                    onChange={(e) => setMarksObtained(e.target.value)}
                                    required
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <BlueButton
                                type="submit"
                                className="w-full flex justify-center items-center py-2 mt-2"
                                disabled={loader}
                            >
                                {loader ? <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span> : "Submit"}
                            </BlueButton>
                        </form>
                    </div>
                </div>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentExamMarks;
