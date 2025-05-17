import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const TeacherDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

  const teacherID = params.id;

  useEffect(() => {
    dispatch(getTeacherDetails(teacherID));
  }, [dispatch, teacherID]);

  if (error) {
    console.log(error);
  }

  const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

  const handleAddSubject = () => {
    navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
  };

  return (
    <>
      {loading ? (
        <div className="text-center py-6">Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-3xl font-semibold text-center mb-8">Teacher Details</h1>
          <div className="text-lg mb-4">
            <p><strong>Teacher Name:</strong> {teacherDetails?.name}</p>
          </div>
          <div className="text-lg mb-4">
            <p><strong>Class Name:</strong> {teacherDetails?.teachSclass?.sclassName}</p>
          </div>
          {isSubjectNamePresent ? (
            <>
              <div className="text-lg mb-4">
                <p><strong>Subject Name:</strong> {teacherDetails?.teachSubject?.subName}</p>
              </div>
              <div className="text-lg mb-6">
                <p><strong>Subject Sessions:</strong> {teacherDetails?.teachSubject?.sessions}</p>
              </div>
            </>
          ) : (
            <button
              onClick={handleAddSubject}
              className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition"
            >
              Add Subject
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default TeacherDetails;
