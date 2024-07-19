
// import React, { useState } from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import { Button, Stack } from "@mui/material";
// import AddEmployee from "./Addemployee";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { getEmployeeData } from "../../store/employee.js";
// import Mainhome from "./Mainhome";
// import EngineeringIcon from '@mui/icons-material/Engineering';
// import BookmarkIcon from '@mui/icons-material/Bookmark';

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });
// // const navigate={useNavigate}


// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function MiniDrawer() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [openEmployeeModal, setOpenEmployeeModal] = useState(false); // State for AddEmployee modal
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const handleOpenEmployeeModal = () => {
//     setOpenEmployeeModal(true);
//   };

//   const handleCloseEmployeeModal = () => {
//     setOpenEmployeeModal(false);
//     // Refresh the employee data
//     dispatch(getEmployeeData());
//   };
 

//   const handleLogout = () => {
//     const url = `${import.meta.env.VITE_HRMS_URL}/logout`;
//     axios
//       .post(url)
//       .then(() => {
//         console.log("Logged out successfully");
//         navigate("/");
//       })
//       .catch((error) => {
//         console.error("Logout error:", error);
//       });
//   };

//   const handleDesignations = () => {
//     navigate('/designations')
//   }

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open} sx={{ backgroundColor: "#009688" }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: "none" }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Home Page
//           </Typography>
//           <Stack direction="row" spacing={2} sx={{ marginLeft: "auto" }}>
//             <Button
//               variant="contained"
//               onClick={handleOpenEmployeeModal}
//               sx={{ backgroundColor: "#001F3F" }}
//             >
//               Add Employee
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleLogout}
//               sx={{ backgroundColor: "#001F3F" }}
//             >
//               Logout
//             </Button>
//           </Stack>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "rtl" ? (
//               <ChevronRightIcon />
//             ) : (
//               <ChevronLeftIcon />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
       
// <List>
//   {["Designations", "Leave Rules"].map((text, index) => (
//     <ListItem key={text} disablePadding sx={{ display: "block" }}>
//       <ListItemButton
//        onClick={handleDesignations}
//         sx={{
//           minHeight: 48,
//           justifyContent: open ? "initial" : "center",
//           px: 2.5,
//         }}
//       >
//         <ListItemIcon
//           sx={{
//             minWidth: 0,
//             mr: open ? 3 : "auto",
//             justifyContent: "center",
//           }}
//         >
//           {index % 2 === 0 ? <EngineeringIcon /> : <BookmarkIcon />}
//         </ListItemIcon>
//         <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//       </ListItemButton>
//     </ListItem>
//   ))}
// </List>

//         <Divider />
       
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         {/* Main content goes here */}
//         <Mainhome />
//       </Box>
//       <AddEmployee
//         open={openEmployeeModal}
//         handleClose={handleCloseEmployeeModal}
//       />
//     </Box>
//   );
// }
