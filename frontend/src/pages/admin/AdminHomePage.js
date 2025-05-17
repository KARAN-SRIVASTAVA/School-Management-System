// import { Container, Grid, Paper } from '@mui/material'
// import SeeNotice from '../../components/SeeNotice';
// import Students from "../../assets/img1.png";
// import Classes from "../../assets/img2.png";
// import Teachers from "../../assets/img3.png";
// import Fees from "../../assets/img4.png";
// import styled from 'styled-components';
// import CountUp from 'react-countup';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
// import { getAllStudents } from '../../redux/studentRelated/studentHandle';
// import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

// const AdminHomePage = () => {
//     const dispatch = useDispatch();
//     const { studentsList } = useSelector((state) => state.student);
//     const { sclassesList } = useSelector((state) => state.sclass);
//     const { teachersList } = useSelector((state) => state.teacher);

//     const { currentUser } = useSelector(state => state.user)

//     const adminID = currentUser._id

//     useEffect(() => {
//         dispatch(getAllStudents(adminID));
//         dispatch(getAllSclasses(adminID, "Sclass"));
//         dispatch(getAllTeachers(adminID));
//     }, [adminID, dispatch]);

//     const numberOfStudents = studentsList && studentsList.length;
//     const numberOfClasses = sclassesList && sclassesList.length;
//     const numberOfTeachers = teachersList && teachersList.length;

//     return (
//         <>
//             <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} md={3} lg={3}>
//                         <StyledPaper>
//                             <img src={Students} alt="Students" />
//                             <Title>
//                                 Total Students
//                             </Title>
//                             <Data start={0} end={numberOfStudents} duration={2.5} />
//                         </StyledPaper>
//                     </Grid>
//                     <Grid item xs={12} md={3} lg={3}>
//                         <StyledPaper>
//                             <img src={Classes} alt="Classes" />
//                             <Title>
//                                 Total Classes
//                             </Title>
//                             <Data start={0} end={numberOfClasses} duration={5} />
//                         </StyledPaper>
//                     </Grid>
//                     <Grid item xs={12} md={3} lg={3}>
//                         <StyledPaper>
//                             <img src={Teachers} alt="Teachers" />
//                             <Title>
//                                 Total Teachers
//                             </Title>
//                             <Data start={0} end={numberOfTeachers} duration={2.5} />
//                         </StyledPaper>
//                     </Grid>
//                     <Grid item xs={12} md={3} lg={3}>
//                         <StyledPaper>
//                             <img src={Fees} alt="Fees" />
//                             <Title>
//                                 Fees Collection
//                             </Title>
//                             <Data start={0} end={23000} duration={2.5} prefix="$" />                        </StyledPaper>
//                     </Grid>
//                     <Grid item xs={12} md={12} lg={12}>
//                         <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
//                             <SeeNotice />
//                         </Paper>
//                     </Grid>
//                 </Grid>
//             </Container>
//         </>
//     );
// };


// const StyledPaper = styled(Paper)`
//   padding: 16px;
//   display: flex;
//   flex-direction: column;
//   height: 200px;
//   justify-content: space-between;
//   align-items: center;
//   text-align: center;
// `;

// const Title = styled.p`
//   font-size: 1.25rem;
// `;

// const Data = styled(CountUp)`
//   font-size: calc(1.3rem + .6vw);
//   color: green;
// `;

// export default AdminHomePage



import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <div className="max-w-screen-lg mx-auto mt-10 mb-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center text-center h-52 justify-between">
                    <img src={Students} alt="Students" className="w-12 h-12" />
                    <p className="text-lg font-medium">Total Students</p>
                    <CountUp start={0} end={numberOfStudents} duration={2.5} className="text-green-600 text-xl" />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center text-center h-52 justify-between">
                    <img src={Classes} alt="Classes" className="w-12 h-12" />
                    <p className="text-lg font-medium">Total Classes</p>
                    <CountUp start={0} end={numberOfClasses} duration={5} className="text-green-600 text-xl" />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center text-center h-52 justify-between">
                    <img src={Teachers} alt="Teachers" className="w-12 h-12" />
                    <p className="text-lg font-medium">Total Teachers</p>
                    <CountUp start={0} end={numberOfTeachers} duration={2.5} className="text-green-600 text-xl" />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center text-center h-52 justify-between">
                    <img src={Fees} alt="Fees" className="w-12 h-12" />
                    <p className="text-lg font-medium">Fees Collection</p>
                    <CountUp start={0} end={23000} duration={2.5} prefix="$" className="text-green-600 text-xl" />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <SeeNotice />
            </div>
        </div>
    );
};

export default AdminHomePage;
