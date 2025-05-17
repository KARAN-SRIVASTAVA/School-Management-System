import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';
import { GreenButton, PurpleButton } from '../../../components/buttonStyles';

const ChooseSubject = ({ situation }) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [classID, setClassID] = useState('');
  const [teacherID, setTeacherID] = useState('');
  const [loader, setLoader] = useState(false);

  const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

  useEffect(() => {
    if (situation === 'Norm') {
      setClassID(params.id);
      const classID = params.id;
      dispatch(getTeacherFreeClassSubjects(classID));
    } else if (situation === 'Teacher') {
      const { classID, teacherID } = params;
      setClassID(classID);
      setTeacherID(teacherID);
      dispatch(getTeacherFreeClassSubjects(classID));
    }
  }, [situation, params, dispatch]);

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>;
  } else if (response) {
    return (
      <div className="max-w-4xl mx-auto my-8 px-4">
        <h1 className="text-lg font-semibold mb-4 text-red-600">
          Sorry all subjects have teachers assigned already
        </h1>
        <div className="flex justify-end mt-4">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            onClick={() => navigate('/Admin/addsubject/' + classID)}
          >
            Add Subjects
          </button>
        </div>
      </div>
    );
  } else if (error) {
    console.log(error);
  }

  const updateSubjectHandler = (teacherId, teachSubject) => {
    setLoader(true);
    dispatch(updateTeachSubject(teacherId, teachSubject));
    navigate('/Admin/teachers');
  };

  return (
    <div className="max-w-6xl mx-auto my-8 px-4 bg-white rounded shadow overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Choose a subject</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2"></th>
            <th className="border border-gray-300 px-4 py-2 text-center">Subject Name</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Subject Code</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(subjectsList) && subjectsList.length > 0 && subjectsList.map((subject, index) => (
            <tr key={subject._id} className="even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-white">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{subject.subName}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{subject.subCode}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {situation === 'Norm' ? (
                  <GreenButton
                    variant="contained"
                    onClick={() => navigate('/Admin/teachers/addteacher/' + subject._id)}
                  >
                    Choose
                  </GreenButton>
                ) : (
                  <GreenButton
                    variant="contained"
                    disabled={loader}
                    onClick={() => updateSubjectHandler(teacherID, subject._id)}
                  >
                    {loader ? <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5 mx-auto animate-spin"></div> : 'Choose Sub'}
                  </GreenButton>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChooseSubject;
