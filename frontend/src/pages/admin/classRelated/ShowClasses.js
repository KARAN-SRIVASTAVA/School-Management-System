import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

// Using @mui/icons-material is fine — no need to replace icons if you want to keep them
import DeleteIcon from '@mui/icons-material/Delete';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.error(error);
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    setMessage("Sorry the delete function has been disabled for now.");
    setShowPopup(true);
    // Uncomment when delete is enabled
    // dispatch(deleteUser(deleteID, address)).then(() => {
    //   dispatch(getAllSclasses(adminID, "Sclass"));
    // });
  };

  const sclassColumns = [{ id: 'name', label: 'Class Name', minWidth: 170 }];

  const sclassRows = sclassesList?.length > 0
    ? sclassesList.map((sclass) => ({
        name: sclass.sclassName,
        id: sclass._id,
      }))
    : [];

  // Tailwind styled container instead of styled-components
  const ButtonContainer = ({ children }) => (
    <div className="flex items-center justify-center gap-4">
      {children}
    </div>
  );

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      { icon: <PostAddIcon fontSize="small" />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
      { icon: <PersonAddAlt1Icon fontSize="small" />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ];

    return (
      <ButtonContainer>
        <button
          onClick={() => deleteHandler(row.id, "Sclass")}
          className="text-red-600 hover:text-red-800 focus:outline-none"
          aria-label="Delete Class"
          type="button"
        >
          <DeleteIcon color="error" />
        </button>
        <BlueButton variant="contained" onClick={() => navigate("/Admin/classes/class/" + row.id)}>
          View
        </BlueButton>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);
    const closeMenu = () => setOpen(false);

    return (
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 focus:outline-none"
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Add Students & Subjects"
        >
          <h5 className="mr-2 font-semibold">Add</h5>
          {/* Use SpeedDialIcon from MUI */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>

        {open && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            tabIndex="-1"
          >
            <div className="py-1">
              {actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    action.action();
                    closeMenu();
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                  role="menuitem"
                >
                  <span className="mr-2">{action.icon}</span>
                  {action.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />,
      name: 'Add New Class',
      action: () => navigate("/Admin/addclass"),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: 'Delete All Classes',
      action: () => deleteHandler(adminID, "Sclasses"),
    },
  ];

  return (
    <>
      {loading ? (
        <div className="text-center py-10 font-semibold">Loading...</div>
      ) : (
        <>
          {getresponse ? (
            <div className="flex justify-end mt-4">
              <GreenButton variant="contained" onClick={() => navigate("/Admin/addclass")}>
                Add Class
              </GreenButton>
            </div>
          ) : (
            <>
              {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
              )}
              <SpeedDialTemplate actions={actions} />
            </>
          )}
        </>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ShowClasses;
