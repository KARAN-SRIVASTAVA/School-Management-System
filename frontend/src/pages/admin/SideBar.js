// import * as React from 'react';
// import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
// import { Link, useLocation } from 'react-router-dom';

// import HomeIcon from "@mui/icons-material/Home";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
// import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
// import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
// import ReportIcon from '@mui/icons-material/Report';
// import AssignmentIcon from '@mui/icons-material/Assignment';

// const SideBar = () => {
//     const location = useLocation();
//     return (
//         <>
//             <React.Fragment>
//                 <ListItemButton component={Link} to="/">
//                     <ListItemIcon>
//                         <HomeIcon color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Home" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Admin/classes">
//                     <ListItemIcon>
//                         <ClassOutlinedIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Classes" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Admin/subjects">
//                     <ListItemIcon>
//                         <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Subjects" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Admin/teachers">
//                     <ListItemIcon>
//                         <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Teachers" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Admin/students">
//                     <ListItemIcon>
//                         <PersonOutlineIcon color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Students" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Admin/notices">
//                     <ListItemIcon>
//                         <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Notices" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Admin/complains">
//                     <ListItemIcon>
//                         <ReportIcon color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Complains" />
//                 </ListItemButton>
//             </React.Fragment>
//             <Divider sx={{ my: 1 }} />
//             <React.Fragment>
//                 <ListSubheader component="div" inset>
//                     User
//                 </ListSubheader>
//                 <ListItemButton component={Link} to="/Admin/profile">
//                     <ListItemIcon>
//                         <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Profile" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/logout">
//                     <ListItemIcon>
//                         <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Logout" />
//                 </ListItemButton>
//             </React.Fragment>
//         </>
//     )
// }

// export default SideBar


import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SideBar = () => {
    const location = useLocation();

    // Helper function to check active path
    const isActive = (paths) => {
        if (Array.isArray(paths)) {
            return paths.some(path => location.pathname === path || location.pathname.startsWith(path));
        }
        return location.pathname === paths || location.pathname.startsWith(paths);
    };

    // Base styles for sidebar links
    const baseLinkClasses = "flex items-center px-4 py-2 rounded hover:bg-gray-100 cursor-pointer";

    // Classes based on active state
    const getLinkClasses = (active) =>
        active
            ? `${baseLinkClasses} text-purple-600 font-semibold`
            : `${baseLinkClasses} text-gray-700`;

    // Icon colors by active state (Tailwind text colors)
    const getIconColor = (active) =>
        active ? "text-purple-600" : "text-gray-500";

    return (
        <aside className="w-60 min-h-screen border-r border-gray-200 bg-white px-2 py-4">
            {/* Main navigation */}
            <nav className="space-y-1">
                <Link to="/" className={getLinkClasses(isActive(["/", "/Admin/dashboard"]))}>
                    <HomeIcon className={`${getIconColor(isActive(["/", "/Admin/dashboard"]))} mr-10`} />
                    Home
                </Link>
                <Link to="/Admin/classes" className={getLinkClasses(isActive("/Admin/classes"))}>
                    <ClassOutlinedIcon className={`${getIconColor(isActive("/Admin/classes"))} mr-10`} />
                    Classes
                </Link>
                <Link to="/Admin/subjects" className={getLinkClasses(isActive("/Admin/subjects"))}>
                    <AssignmentIcon className={`${getIconColor(isActive("/Admin/subjects"))} mr-10`} />
                    Subjects
                </Link>
                <Link to="/Admin/teachers" className={getLinkClasses(isActive("/Admin/teachers"))}>
                    <SupervisorAccountOutlinedIcon className={`${getIconColor(isActive("/Admin/teachers"))} mr-10`} />
                    Teachers
                </Link>
                <Link to="/Admin/students" className={getLinkClasses(isActive("/Admin/students"))}>
                    <PersonOutlineIcon className={`${getIconColor(isActive("/Admin/students"))} mr-10`} />
                    Students
                </Link>
                <Link to="/Admin/notices" className={getLinkClasses(isActive("/Admin/notices"))}>
                    <AnnouncementOutlinedIcon className={`${getIconColor(isActive("/Admin/notices"))} mr-10`} />
                    Notices
                </Link>
                <Link to="/Admin/complains" className={getLinkClasses(isActive("/Admin/complains"))}>
                    <ReportIcon className={`${getIconColor(isActive("/Admin/complains"))} mr-10`} />
                    Complains
                </Link>
            </nav>

            <hr className="my-4 border-gray-300" />

            {/* User section */}
            <div>
                <p className="text-xs font-semibold text-gray-500 px-4 mb-2 uppercase tracking-wide">User</p>
                <nav className="space-y-1">
                    <Link to="/Admin/profile" className={getLinkClasses(isActive("/Admin/profile"))}>
                        <AccountCircleOutlinedIcon className={`${getIconColor(isActive("/Admin/profile"))} mr-10`} />
                        Profile
                    </Link>
                    <Link to="/logout" className={getLinkClasses(isActive("/logout"))}>
                        <ExitToAppIcon className={`${getIconColor(isActive("/logout"))} mr-10`} />
                        Logout
                    </Link>
                </nav>
            </div>
        </aside>
    );
};

export default SideBar;
