import { useEffect, useState, useRef, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { BlackButton, BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import Popup from '../../../components/Popup';

const ShowStudents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ];

    const studentRows = studentsList && studentsList.length > 0 && studentsList.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        sclassName: student.sclassName.sclassName,
        id: student._id,
    }));

    const StudentButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];
        const [open, setOpen] = useState(false);
        const anchorRef = useRef(null);
        const [selectedIndex, setSelectedIndex] = useState(0);

        const handleClick = () => {
            if (selectedIndex === 0) handleAttendance();
            else if (selectedIndex === 1) handleMarks();
        };

        const handleAttendance = () => navigate("/Admin/students/student/attendance/" + row.id);
        const handleMarks = () => navigate("/Admin/students/student/marks/" + row.id);

        const handleMenuItemClick = (index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        return (
            <div className="flex gap-2 items-center">
                <button onClick={() => deleteHandler(row.id, "Student")}
                    className="text-red-600 hover:text-red-800">
                    <PersonRemoveIcon />
                </button>
                <BlueButton onClick={() => navigate("/Admin/students/student/" + row.id)}>
                    View
                </BlueButton>
                <div className="relative" ref={anchorRef}>
                    <div className="inline-flex rounded-md shadow-sm">
                        <button onClick={handleClick} className="bg-blue-600 text-white px-3 py-1 rounded-l-md">
                            {options[selectedIndex]}
                        </button>
                        <BlackButton
                            onClick={() => setOpen(prev => !prev)}
                            className="rounded-r-md px-2"
                        >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </BlackButton>
                    </div>
                    {open && (
                        <ul className="absolute z-10 bg-white border mt-1 rounded shadow-md">
                            {options.map((option, index) => (
                                <li
                                    key={option}
                                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${index === selectedIndex ? 'bg-gray-100' : ''}`}
                                    onClick={() => handleMenuItemClick(index)}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        );
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon className="text-blue-600" />, name: 'Add New Student',
            action: () => navigate("/Admin/addstudents")
        },
        {
            icon: <PersonRemoveIcon className="text-red-600" />, name: 'Delete All Students',
            action: () => deleteHandler(currentUser._id, "Students")
        },
    ];

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {response ? (
                        <div className="flex justify-end mt-4">
                            <GreenButton onClick={() => navigate("/Admin/addstudents")}>
                                Add Students
                            </GreenButton>
                        </div>
                    ) : (
                        <div className="w-full overflow-hidden bg-white rounded shadow">
                            {Array.isArray(studentsList) && studentsList.length > 0 && (
                                <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                            )}
                            <SpeedDialTemplate actions={actions} />
                        </div>
                    )}
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowStudents;
