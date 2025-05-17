import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import TableTemplate from '../../../components/TableTemplate';

const ChooseClass = ({ situation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllSclasses(currentUser._id, "Sclass"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const navigateHandler = (classID) => {
    if (situation === "Teacher") {
      navigate("/Admin/teachers/choosesubject/" + classID);
    }
    else if (situation === "Subject") {
      navigate("/Admin/addsubject/" + classID);
    }
  };

  const sclassColumns = [
    { id: 'name', label: 'Class Name', minWidth: 170 },
  ];

  const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => ({
    name: sclass.sclassName,
    id: sclass._id,
  }));

  const SclassButtonHaver = ({ row }) => (
    <button
      onClick={() => navigateHandler(row.id)}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
    >
      Choose
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      {loading ? (
        <div className="text-center py-8 text-gray-600">Loading...</div>
      ) : (
        <>
          {getresponse ? (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => navigate("/Admin/addclass")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Class
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">Choose a class</h2>
              {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ChooseClass;
