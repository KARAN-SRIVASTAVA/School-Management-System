import React, { useEffect, useState } from 'react';
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import Popup from '../../../components/Popup';

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, 'Subject'));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error);
  }

  const [value, setValue] = useState('1');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    rollNum: student.rollNum,
    name: student.name,
    id: student._id,
  }));

  const StudentsAttendanceButtonHaver = ({ row }) => (
    <>
      <BlueButton
        onClick={() => navigate('/Admin/students/student/' + row.id)}>
        View
      </BlueButton>
      <PurpleButton
        onClick={() =>
          navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)
        }>
        Take Attendance
      </PurpleButton>
    </>
  );

  const StudentsMarksButtonHaver = ({ row }) => (
    <>
      <BlueButton onClick={() => navigate('/Admin/students/student/' + row.id)}>
        View
      </BlueButton>
      <PurpleButton
        onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}>
        Provide Marks
      </PurpleButton>
    </>
  );

  const SubjectStudentsSection = () => (
    <div className="mt-4">
      {getresponse ? (
        <div className="flex justify-end">
          <GreenButton
            onClick={() => navigate('/Admin/class/addstudents/' + classID)}>
            Add Students
          </GreenButton>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Students List:</h2>
          {selectedSection === 'attendance' && (
            <TableTemplate
              buttonHaver={StudentsAttendanceButtonHaver}
              columns={studentColumns}
              rows={studentRows}
            />
          )}
          {selectedSection === 'marks' && (
            <TableTemplate
              buttonHaver={StudentsMarksButtonHaver}
              columns={studentColumns}
              rows={studentRows}
            />
          )}

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2">
            <button
              className={`text-sm ${selectedSection === 'attendance' ? 'font-bold' : ''}`}
              onClick={() => handleSectionChange('attendance')}
            >
              Attendance
            </button>
            <button
              className={`text-sm ${selectedSection === 'marks' ? 'font-bold' : ''}`}
              onClick={() => handleSectionChange('marks')}
            >
              Marks
            </button>
          </div>
        </>
      )}
    </div>
  );

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;

    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-center">Subject Details</h1>
        <p className="text-lg">Subject Name: {subjectDetails?.subName}</p>
        <p className="text-lg">Subject Code: {subjectDetails?.subCode}</p>
        <p className="text-lg">Subject Sessions: {subjectDetails?.sessions}</p>
        <p className="text-lg">Number of Students: {numberOfStudents}</p>
        <p className="text-lg">
          Class Name: {subjectDetails?.sclassName?.sclassName}
        </p>
        {subjectDetails?.teacher ? (
          <p className="text-lg">Teacher Name: {subjectDetails.teacher.name}</p>
        ) : (
          <GreenButton
            onClick={() => navigate('/Admin/teachers/addteacher/' + subjectDetails._id)}>
            Add Subject Teacher
          </GreenButton>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      {subloading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full">
          <div className="flex space-x-4 mb-6 border-b pb-2">
            <button
              className={`px-4 py-2 ${value === '1' ? 'border-b-2 border-black font-semibold' : ''}`}
              onClick={() => handleChange('1')}
            >
              Details
            </button>
            <button
              className={`px-4 py-2 ${value === '2' ? 'border-b-2 border-black font-semibold' : ''}`}
              onClick={() => handleChange('2')}
            >
              Students
            </button>
          </div>

          <div className="mt-6">
            {value === '1' && <SubjectDetailsSection />}
            {value === '2' && <SubjectStudentsSection />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSubject;
