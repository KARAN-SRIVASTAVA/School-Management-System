import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const ShowTeachers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllTeachers(currentUser._id));
  }, [currentUser._id, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  } else if (response) {
    return (
      <div className="flex justify-end mt-4">
        <GreenButton onClick={() => navigate("/Admin/teachers/chooseclass")}>
          Add Teacher
        </GreenButton>
      </div>
    );
  } else if (error) {
    console.log(error);
  }

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Sorry the delete function has been disabled for now.")
    setShowPopup(true)

    // dispatch(deleteUser(deleteID, address)).then(() => {
    //     dispatch(getAllTeachers(currentUser._id));
    // });
  };

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'teachSubject', label: 'Subject' },
    { id: 'teachSclass', label: 'Class' },
  ];

  const rows = teachersList.map((teacher) => ({
    name: teacher.name,
    teachSubject: teacher.teachSubject?.subName || null,
    teachSclass: teacher.teachSclass.sclassName,
    teachSclassID: teacher.teachSclass._id,
    id: teacher._id,
  }));

  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Teacher',
      action: () => navigate("/Admin/teachers/chooseclass")
    },
    {
      icon: <PersonRemoveIcon color="error" />, name: 'Delete All Teachers',
      action: () => deleteHandler(currentUser._id, "Teachers")
    },
  ];

  // Pagination handlers
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="w-full overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200 sticky top-0 bg-gray-50">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {columns.map((column) => {
                  const value = row[column.id];
                  if (column.id === 'teachSubject') {
                    return (
                      <td key={column.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        {value ? (
                          value
                        ) : (
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            onClick={() => navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)}
                          >
                            Add Subject
                          </button>
                        )}
                      </td>
                    );
                  }
                  return (
                    <td key={column.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {value}
                    </td>
                  );
                })}
                <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                  <button
                    onClick={() => deleteHandler(row.id, "Teacher")}
                    aria-label="Delete teacher"
                    className="text-red-600 hover:text-red-800"
                  >
                    <PersonRemoveIcon />
                  </button>
                  <BlueButton
                    onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}
                  >
                    View
                  </BlueButton>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{page * rowsPerPage + 1}</span> to{' '}
          <span className="font-medium">{Math.min((page + 1) * rowsPerPage, rows.length)}</span> of{' '}
          <span className="font-medium">{rows.length}</span> results
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="block w-full rounded border border-gray-300 py-1 pl-2 pr-7 text-base focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {[5, 10, 25, 100].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <button
            onClick={() => handleChangePage(Math.max(page - 1, 0))}
            disabled={page === 0}
            className={`px-3 py-1 rounded border ${page === 0 ? 'text-gray-400 border-gray-300' : 'text-indigo-600 border-indigo-600 hover:bg-indigo-50'}`}
          >
            Prev
          </button>
          <button
            onClick={() => handleChangePage(Math.min(page + 1, Math.floor(rows.length / rowsPerPage)))}
            disabled={page >= Math.floor(rows.length / rowsPerPage)}
            className={`px-3 py-1 rounded border ${page >= Math.floor(rows.length / rowsPerPage) ? 'text-gray-400 border-gray-300' : 'text-indigo-600 border-indigo-600 hover:bg-indigo-50'}`}
          >
            Next
          </button>
        </div>
      </div>

      <SpeedDialTemplate actions={actions} />
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default ShowTeachers;
