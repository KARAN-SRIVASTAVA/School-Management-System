import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getClassDetails,
  getClassStudents,
  getSubjectList,
} from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles"; // Keep your styled buttons or replace as needed
import TableTemplate from "../../../components/TableTemplate";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';

const tabs = [
  { label: "Details", value: "1" },
  { label: "Subjects", value: "2" },
  { label: "Students", value: "3" },
  { label: "Teachers", value: "4" },
];

const ClassDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);
  const classID = params.id;

  const [activeTab, setActiveTab] = useState("1");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getClassDetails(classID, "Sclass"));
    dispatch(getSubjectList(classID, "ClassSubjects"));
    dispatch(getClassStudents(classID));
  }, [dispatch, classID]);

  if (error) {
    console.error(error);
  }

  const deleteHandler = (deleteID, address) => {
    setMessage("Sorry the delete function has been disabled for now.");
    setShowPopup(true);
    // Uncomment to enable
    // dispatch(deleteUser(deleteID, address))
    //   .then(() => {
    //     dispatch(getClassStudents(classID));
    //     dispatch(resetSubjects());
    //     dispatch(getSubjectList(classID, "ClassSubjects"));
    //   });
  };

  const subjectColumns = [
    { id: 'name', label: 'Subject Name', minWidth: 170 },
    { id: 'code', label: 'Subject Code', minWidth: 100 },
  ];

  const subjectRows = subjectsList?.map(subject => ({
    name: subject.subName,
    code: subject.subCode,
    id: subject._id,
  })) || [];

  const SubjectsButtonHaver = ({ row }) => (
    <div className="flex space-x-2">
      <button
        onClick={() => deleteHandler(row.id, "Subject")}
        className="text-red-600 hover:text-red-800"
        aria-label="Delete Subject"
      >
        <DeleteIcon />
      </button>
      <BlueButton
        variant="contained"
        onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}
      >
        View
      </BlueButton>
    </div>
  );

  const subjectActions = [
    {
      icon: <PostAddIcon color="primary" />,
      name: 'Add New Subject',
      action: () => navigate("/Admin/addsubject/" + classID),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: 'Delete All Subjects',
      action: () => deleteHandler(classID, "SubjectsClass"),
    }
  ];

  const studentColumns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
  ];

  const studentRows = sclassStudents?.map(student => ({
    name: student.name,
    rollNum: student.rollNum,
    id: student._id,
  })) || [];

  const StudentsButtonHaver = ({ row }) => (
    <div className="flex space-x-2">
      <button
        onClick={() => deleteHandler(row.id, "Student")}
        className="text-red-600 hover:text-red-800"
        aria-label="Remove Student"
      >
        <PersonRemoveIcon />
      </button>
      <BlueButton
        variant="contained"
        onClick={() => navigate("/Admin/students/student/" + row.id)}
      >
        View
      </BlueButton>
      <PurpleButton
        variant="contained"
        onClick={() => navigate("/Admin/students/student/attendance/" + row.id)}
      >
        Attendance
      </PurpleButton>
    </div>
  );

  const studentActions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: 'Add New Student',
      action: () => navigate("/Admin/class/addstudents/" + classID),
    },
    {
      icon: <PersonRemoveIcon color="error" />,
      name: 'Delete All Students',
      action: () => deleteHandler(classID, "StudentsClass"),
    },
  ];

  const ClassDetailsSection = () => {
    const numberOfSubjects = subjectsList?.length || 0;
    const numberOfStudents = sclassStudents?.length || 0;

    return (
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-semibold">Class Details</h2>
        <h3 className="text-xl">This is Class {sclassDetails?.sclassName || "N/A"}</h3>
        <p className="text-lg">Number of Subjects: {numberOfSubjects}</p>
        <p className="text-lg">Number of Students: {numberOfStudents}</p>
        {getresponse && (
          <GreenButton
            variant="contained"
            onClick={() => navigate("/Admin/class/addstudents/" + classID)}
          >
            Add Students
          </GreenButton>
        )}
        {response && (
          <GreenButton
            variant="contained"
            onClick={() => navigate("/Admin/addsubject/" + classID)}
          >
            Add Subjects
          </GreenButton>
        )}
      </div>
    );
  };

  const ClassSubjectsSection = () => (
    <>
      {response ? (
        <div className="flex justify-end mt-4">
          <GreenButton
            variant="contained"
            onClick={() => navigate("/Admin/addsubject/" + classID)}
          >
            Add Subjects
          </GreenButton>
        </div>
      ) : (
        <>
          <h3 className="text-2xl mb-4">Subjects List:</h3>
          <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
          <SpeedDialTemplate actions={subjectActions} />
        </>
      )}
    </>
  );

  const ClassStudentsSection = () => (
    <>
      {getresponse ? (
        <div className="flex justify-end mt-4">
          <GreenButton
            variant="contained"
            onClick={() => navigate("/Admin/class/addstudents/" + classID)}
          >
            Add Students
          </GreenButton>
        </div>
      ) : (
        <>
          <h3 className="text-2xl mb-4">Students List:</h3>
          <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
          <SpeedDialTemplate actions={studentActions} />
        </>
      )}
    </>
  );

  const ClassTeachersSection = () => (
    <div>
      <h3 className="text-2xl mb-4">Teachers</h3>
      {/* Add teachers related UI here */}
    </div>
  );

  return (
    <>
      {loading ? (
        <div className="text-center py-10 text-lg font-semibold">Loading...</div>
      ) : (
        <div className="w-full max-w-7xl mx-auto p-4">
          <div className="border-b border-gray-300 sticky top-0 bg-white z-10">
            <nav className="flex space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-2 font-medium border-b-2 ${
                    activeTab === tab.value
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-6">
            {activeTab === "1" && <ClassDetailsSection />}
            {activeTab === "2" && <ClassSubjectsSection />}
            {activeTab === "3" && <ClassStudentsSection />}
            {activeTab === "4" && <ClassTeachersSection />}
          </div>
        </div>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ClassDetails;
