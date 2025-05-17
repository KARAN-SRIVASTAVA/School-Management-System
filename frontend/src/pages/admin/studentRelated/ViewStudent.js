// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
// import { useNavigate, useParams } from 'react-router-dom'
// import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
// import { Box, Button, Collapse, IconButton, Table, TableBody, TableHead, Typography, Tab, Paper, BottomNavigation, BottomNavigationAction, Container } from '@mui/material';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import { KeyboardArrowUp, KeyboardArrowDown, Delete as DeleteIcon } from '@mui/icons-material';
// import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
// import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
// import CustomBarChart from '../../../components/CustomBarChart'
// import CustomPieChart from '../../../components/CustomPieChart'
// import { StyledTableCell, StyledTableRow } from '../../../components/styles';

// import InsertChartIcon from '@mui/icons-material/InsertChart';
// import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
// import TableChartIcon from '@mui/icons-material/TableChart';
// import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
// import Popup from '../../../components/Popup';

// const ViewStudent = () => {
//     const [showTab, setShowTab] = useState(false);

//     const navigate = useNavigate()
//     const params = useParams()
//     const dispatch = useDispatch()
//     const { userDetails, response, loading, error } = useSelector((state) => state.user);

//     const studentID = params.id
//     const address = "Student"

//     useEffect(() => {
//         dispatch(getUserDetails(studentID, address));
//     }, [dispatch, studentID])

//     useEffect(() => {
//         if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
//             dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
//         }
//     }, [dispatch, userDetails]);

//     if (response) { console.log(response) }
//     else if (error) { console.log(error) }

//     const [name, setName] = useState('');
//     const [rollNum, setRollNum] = useState('');
//     const [password, setPassword] = useState('');
//     const [sclassName, setSclassName] = useState('');
//     const [studentSchool, setStudentSchool] = useState('');
//     const [subjectMarks, setSubjectMarks] = useState('');
//     const [subjectAttendance, setSubjectAttendance] = useState([]);

//     const [openStates, setOpenStates] = useState({});

//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");

//     const handleOpen = (subId) => {
//         setOpenStates((prevState) => ({
//             ...prevState,
//             [subId]: !prevState[subId],
//         }));
//     };

//     const [value, setValue] = useState('1');

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     const [selectedSection, setSelectedSection] = useState('table');
//     const handleSectionChange = (event, newSection) => {
//         setSelectedSection(newSection);
//     };

//     const fields = password === ""
//         ? { name, rollNum }
//         : { name, rollNum, password }

//     useEffect(() => {
//         if (userDetails) {
//             setName(userDetails.name || '');
//             setRollNum(userDetails.rollNum || '');
//             setSclassName(userDetails.sclassName || '');
//             setStudentSchool(userDetails.school || '');
//             setSubjectMarks(userDetails.examResult || '');
//             setSubjectAttendance(userDetails.attendance || []);
//         }
//     }, [userDetails]);

//     const submitHandler = (event) => {
//         event.preventDefault()
//         dispatch(updateUser(fields, studentID, address))
//             .then(() => {
//                 dispatch(getUserDetails(studentID, address));
//             })
//             .catch((error) => {
//                 console.error(error)
//             })
//     }

//     const deleteHandler = () => {
//         setMessage("Sorry the delete function has been disabled for now.")
//         setShowPopup(true)

//         // dispatch(deleteUser(studentID, address))
//         //     .then(() => {
//         //         navigate(-1)
//         //     })
//     }

//     const removeHandler = (id, deladdress) => {
//         dispatch(removeStuff(id, deladdress))
//             .then(() => {
//                 dispatch(getUserDetails(studentID, address));
//             })
//     }

//     const removeSubAttendance = (subId) => {
//         dispatch(updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten"))
//             .then(() => {
//                 dispatch(getUserDetails(studentID, address));
//             })
//     }

//     const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
//     const overallAbsentPercentage = 100 - overallAttendancePercentage;

//     const chartData = [
//         { name: 'Present', value: overallAttendancePercentage },
//         { name: 'Absent', value: overallAbsentPercentage }
//     ];

//     const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
//         const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
//         return {
//             subject: subName,
//             attendancePercentage: subjectAttendancePercentage,
//             totalClasses: sessions,
//             attendedClasses: present
//         };
//     });

//     const StudentAttendanceSection = () => {
//         const renderTableSection = () => {
//             return (
//                 <>
//                     <h3>Attendance:</h3>
//                     <Table>
//                         <TableHead>
//                             <StyledTableRow>
//                                 <StyledTableCell>Subject</StyledTableCell>
//                                 <StyledTableCell>Present</StyledTableCell>
//                                 <StyledTableCell>Total Sessions</StyledTableCell>
//                                 <StyledTableCell>Attendance Percentage</StyledTableCell>
//                                 <StyledTableCell align="center">Actions</StyledTableCell>
//                             </StyledTableRow>
//                         </TableHead>
//                         {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
//                             const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
//                             return (
//                                 <TableBody key={index}>
//                                     <StyledTableRow>
//                                         <StyledTableCell>{subName}</StyledTableCell>
//                                         <StyledTableCell>{present}</StyledTableCell>
//                                         <StyledTableCell>{sessions}</StyledTableCell>
//                                         <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
//                                         <StyledTableCell align="center">
//                                             <Button variant="contained"
//                                                 onClick={() => handleOpen(subId)}>
//                                                 {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}Details
//                                             </Button>
//                                             <IconButton onClick={() => removeSubAttendance(subId)}>
//                                                 <DeleteIcon color="error" />
//                                             </IconButton>
//                                             <Button variant="contained" sx={styles.attendanceButton}
//                                                 onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}>
//                                                 Change
//                                             </Button>
//                                         </StyledTableCell>
//                                     </StyledTableRow>
//                                     <StyledTableRow>
//                                         <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                                             <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
//                                                 <Box sx={{ margin: 1 }}>
//                                                     <Typography variant="h6" gutterBottom component="div">
//                                                         Attendance Details
//                                                     </Typography>
//                                                     <Table size="small" aria-label="purchases">
//                                                         <TableHead>
//                                                             <StyledTableRow>
//                                                                 <StyledTableCell>Date</StyledTableCell>
//                                                                 <StyledTableCell align="right">Status</StyledTableCell>
//                                                             </StyledTableRow>
//                                                         </TableHead>
//                                                         <TableBody>
//                                                             {allData.map((data, index) => {
//                                                                 const date = new Date(data.date);
//                                                                 const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
//                                                                 return (
//                                                                     <StyledTableRow key={index}>
//                                                                         <StyledTableCell component="th" scope="row">
//                                                                             {dateString}
//                                                                         </StyledTableCell>
//                                                                         <StyledTableCell align="right">{data.status}</StyledTableCell>
//                                                                     </StyledTableRow>
//                                                                 )
//                                                             })}
//                                                         </TableBody>
//                                                     </Table>
//                                                 </Box>
//                                             </Collapse>
//                                         </StyledTableCell>
//                                     </StyledTableRow>
//                                 </TableBody>
//                             )
//                         }
//                         )}
//                     </Table>
//                     <div>
//                         Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
//                     </div>
//                     <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => removeHandler(studentID, "RemoveStudentAtten")}>Delete All</Button>
//                     <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}>
//                         Add Attendance
//                     </Button>
//                 </>
//             )
//         }
//         const renderChartSection = () => {
//             return (
//                 <>
//                     <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
//                 </>
//             )
//         }
//         return (
//             <>
//                 {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0
//                     ?
//                     <>
//                         {selectedSection === 'table' && renderTableSection()}
//                         {selectedSection === 'chart' && renderChartSection()}

//                         <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
//                             <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
//                                 <BottomNavigationAction
//                                     label="Table"
//                                     value="table"
//                                     icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
//                                 />
//                                 <BottomNavigationAction
//                                     label="Chart"
//                                     value="chart"
//                                     icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
//                                 />
//                             </BottomNavigation>
//                         </Paper>
//                     </>
//                     :
//                     <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}>
//                         Add Attendance
//                     </Button>
//                 }
//             </>
//         )
//     }

//     const StudentMarksSection = () => {
//         const renderTableSection = () => {
//             return (
//                 <>
//                     <h3>Subject Marks:</h3>
//                     <Table>
//                         <TableHead>
//                             <StyledTableRow>
//                                 <StyledTableCell>Subject</StyledTableCell>
//                                 <StyledTableCell>Marks</StyledTableCell>
//                             </StyledTableRow>
//                         </TableHead>
//                         <TableBody>
//                             {subjectMarks.map((result, index) => {
//                                 if (!result.subName || !result.marksObtained) {
//                                     return null;
//                                 }
//                                 return (
//                                     <StyledTableRow key={index}>
//                                         <StyledTableCell>{result.subName.subName}</StyledTableCell>
//                                         <StyledTableCell>{result.marksObtained}</StyledTableCell>
//                                     </StyledTableRow>
//                                 );
//                             })}
//                         </TableBody>
//                     </Table>
//                     <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/marks/" + studentID)}>
//                         Add Marks
//                     </Button>
//                 </>
//             )
//         }
//         const renderChartSection = () => {
//             return (
//                 <>
//                     <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
//                 </>
//             )
//         }
//         return (
//             <>
//                 {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
//                     ?
//                     <>
//                         {selectedSection === 'table' && renderTableSection()}
//                         {selectedSection === 'chart' && renderChartSection()}

//                         <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
//                             <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
//                                 <BottomNavigationAction
//                                     label="Table"
//                                     value="table"
//                                     icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
//                                 />
//                                 <BottomNavigationAction
//                                     label="Chart"
//                                     value="chart"
//                                     icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
//                                 />
//                             </BottomNavigation>
//                         </Paper>
//                     </>
//                     :
//                     <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/marks/" + studentID)}>
//                         Add Marks
//                     </Button>
//                 }
//             </>
//         )
//     }

//     const StudentDetailsSection = () => {
//         return (
//             <div>
//                 Name: {userDetails.name}
//                 <br />
//                 Roll Number: {userDetails.rollNum}
//                 <br />
//                 Class: {sclassName.sclassName}
//                 <br />
//                 School: {studentSchool.schoolName}
//                 {
//                     subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
//                         <CustomPieChart data={chartData} />
//                     )
//                 }
//                 <Button variant="contained" sx={styles.styledButton} onClick={deleteHandler}>
//                     Delete
//                 </Button>
//                 <br />
//                 {/* <Button variant="contained" sx={styles.styledButton} className="show-tab" onClick={() => { setShowTab(!showTab) }}>
//                     {
//                         showTab
//                             ? <KeyboardArrowUp />
//                             : <KeyboardArrowDown />
//                     }
//                     Edit Student
//                 </Button>
//                 <Collapse in={showTab} timeout="auto" unmountOnExit>
//                     <div className="register">
//                         <form className="registerForm" onSubmit={submitHandler}>
//                             <span className="registerTitle">Edit Details</span>
//                             <label>Name</label>
//                             <input className="registerInput" type="text" placeholder="Enter user's name..."
//                                 value={name}
//                                 onChange={(event) => setName(event.target.value)}
//                                 autoComplete="name" required />

//                             <label>Roll Number</label>
//                             <input className="registerInput" type="number" placeholder="Enter user's Roll Number..."
//                                 value={rollNum}
//                                 onChange={(event) => setRollNum(event.target.value)}
//                                 required />

//                             <label>Password</label>
//                             <input className="registerInput" type="password" placeholder="Enter user's password..."
//                                 value={password}
//                                 onChange={(event) => setPassword(event.target.value)}
//                                 autoComplete="new-password" />

//                             <button className="registerButton" type="submit" >Update</button>
//                         </form>
//                     </div>
//                 </Collapse> */}
//             </div>
//         )
//     }

//     return (
//         <>
//             {loading
//                 ?
//                 <>
//                     <div>Loading...</div>
//                 </>
//                 :
//                 <>
//                     <Box sx={{ width: '100%', typography: 'body1', }} >
//                         <TabContext value={value}>
//                             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                                 <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
//                                     <Tab label="Details" value="1" />
//                                     <Tab label="Attendance" value="2" />
//                                     <Tab label="Marks" value="3" />
//                                 </TabList>
//                             </Box>
//                             <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
//                                 <TabPanel value="1">
//                                     <StudentDetailsSection />
//                                 </TabPanel>
//                                 <TabPanel value="2">
//                                     <StudentAttendanceSection />
//                                 </TabPanel>
//                                 <TabPanel value="3">
//                                     <StudentMarksSection />
//                                 </TabPanel>
//                             </Container>
//                         </TabContext>
//                     </Box>
//                 </>
//             }
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

//         </>
//     )
// }

// export default ViewStudent

// const styles = {
//     attendanceButton: {
//         marginLeft: "20px",
//         backgroundColor: "#270843",
//         "&:hover": {
//             backgroundColor: "#3f1068",
//         }
//     },
//     styledButton: {
//         margin: "20px",
//         backgroundColor: "#02250b",
//         "&:hover": {
//             backgroundColor: "#106312",
//         }
//     }
// }

// Converted React component from MUI to Tailwind CSS
// All MUI components have been replaced with Tailwind-based JSX

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
import CustomBarChart from '../../../components/CustomBarChart';
import CustomPieChart from '../../../components/CustomPieChart';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import Popup from '../../../components/Popup';
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Delete as DeleteIcon,
  InsertChart,
  InsertChartOutlined,
  TableChart,
  TableChartOutlined
} from '@mui/icons-material';

const ViewStudent = () => {
  const [showTab, setShowTab] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { userDetails, response, loading, error } = useSelector((state) => state.user);
  const studentID = params.id;
  const address = 'Student';

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  useEffect(() => {
    if (userDetails?.sclassName?._id) {
      dispatch(getSubjectList(userDetails.sclassName._id, 'ClassSubjects'));
    }
  }, [dispatch, userDetails]);

  const [name, setName] = useState('');
  const [rollNum, setRollNum] = useState('');
  const [password, setPassword] = useState('');
  const [sclassName, setSclassName] = useState('');
  const [studentSchool, setStudentSchool] = useState('');
  const [subjectMarks, setSubjectMarks] = useState('');
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const [openStates, setOpenStates] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState('1');
  const [selectedSection, setSelectedSection] = useState('table');

  const fields = password === '' ? { name, rollNum } : { name, rollNum, password };

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.name || '');
      setRollNum(userDetails.rollNum || '');
      setSclassName(userDetails.sclassName || '');
      setStudentSchool(userDetails.school || '');
      setSubjectMarks(userDetails.examResult || '');
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const handleOpen = (subId) => {
    setOpenStates((prev) => ({ ...prev, [subId]: !prev[subId] }));
  };

  const deleteHandler = () => {
    setMessage('Sorry the delete function has been disabled for now.');
    setShowPopup(true);
  };

  const removeHandler = (id, deladdress) => {
    dispatch(removeStuff(id, deladdress)).then(() => {
      dispatch(getUserDetails(studentID, address));
    });
  };

  const removeSubAttendance = (subId) => {
    dispatch(updateStudentFields(studentID, { subId }, 'RemoveStudentSubAtten')).then(() => {
      dispatch(getUserDetails(studentID, address));
    });
  };

  const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;
  const chartData = [
    { name: 'Present', value: overallAttendancePercentage },
    { name: 'Absent', value: overallAbsentPercentage }
  ];

  const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(
    ([subName, { subCode, present, sessions }]) => {
      const percent = calculateSubjectAttendancePercentage(present, sessions);
      return { subject: subName, attendancePercentage: percent, totalClasses: sessions, attendedClasses: present };
    }
  );

  const renderTableSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Attendance:</h3>
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th>Subject</th><th>Present</th><th>Total Sessions</th><th>%</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], i) => {
            const percent = calculateSubjectAttendancePercentage(present, sessions);
            return (
              <React.Fragment key={i}>
                <tr>
                  <td>{subName}</td><td>{present}</td><td>{sessions}</td><td>{percent}%</td>
                  <td className="flex items-center space-x-2">
                    <button className="bg-purple-800 text-white px-2 py-1 rounded" onClick={() => handleOpen(subId)}>
                      {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />} Details
                    </button>
                    <button onClick={() => removeSubAttendance(subId)}><DeleteIcon className="text-red-600" /></button>
                    <button className="bg-purple-800 text-white px-2 py-1 rounded" onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}>Change</button>
                  </td>
                </tr>
                {openStates[subId] && (
                  <tr>
                    <td colSpan="5">
                      <div className="ml-4">
                        <h4 className="font-medium">Attendance Details</h4>
                        <table className="text-xs mt-2">
                          <thead><tr><th>Date</th><th>Status</th></tr></thead>
                          <tbody>
                            {allData.map((data, j) => (
                              <tr key={j}><td>{new Date(data.date).toISOString().substring(0,10)}</td><td>{data.status}</td></tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="text-sm">Overall Attendance: {overallAttendancePercentage.toFixed(2)}%</div>
      <div className="space-x-2">
        <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => removeHandler(studentID, "RemoveStudentAtten")}>Delete All</button>
        <button className="bg-green-800 text-white px-3 py-1 rounded" onClick={() => navigate(`/Admin/students/student/attendance/${studentID}`)}>Add Attendance</button>
      </div>
    </div>
  );

  const renderMarksSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Subject Marks:</h3>
      <table className="min-w-full border text-sm">
        <thead><tr><th>Subject</th><th>Marks</th></tr></thead>
        <tbody>
          {subjectMarks.map((res, i) => (
            <tr key={i}><td>{res?.subName?.subName}</td><td>{res.marksObtained}</td></tr>
          ))}
        </tbody>
      </table>
      <button className="bg-green-800 text-white px-3 py-1 rounded" onClick={() => navigate(`/Admin/students/student/marks/${studentID}`)}>Add Marks</button>
    </div>
  );

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="flex space-x-4 border-b mb-4">
            <button onClick={() => setTab('1')} className={tab === '1' ? 'font-bold border-b-2' : ''}>Details</button>
            <button onClick={() => setTab('2')} className={tab === '2' ? 'font-bold border-b-2' : ''}>Attendance</button>
            <button onClick={() => setTab('3')} className={tab === '3' ? 'font-bold border-b-2' : ''}>Marks</button>
          </div>

          {tab === '1' && (
            <div className="space-y-2">
              <p>Name: {userDetails.name}</p>
              <p>Roll Number: {userDetails.rollNum}</p>
              <p>Class: {sclassName?.sclassName}</p>
              <p>School: {studentSchool?.schoolName}</p>
              {subjectAttendance?.length > 0 && <CustomPieChart data={chartData} />}
              <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={deleteHandler}>Delete</button>
            </div>
          )}

          {tab === '2' && (
            selectedSection === 'table' ? renderTableSection() : <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
          )}

          {tab === '3' && (
            selectedSection === 'table' ? renderMarksSection() : <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
          )}

          {(tab === '2' || tab === '3') && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
              <button onClick={() => setSelectedSection('table')} className="text-sm">Table</button>
              <button onClick={() => setSelectedSection('chart')} className="text-sm">Chart</button>
            </div>
          )}
        </div>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default ViewStudent;