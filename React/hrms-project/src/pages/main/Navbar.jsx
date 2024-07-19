import  { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { getEmployeeData } from "../../store/employee.js";
import { Button, Stack, AppBar, Toolbar } from '@mui/material';
import AddEmployee from "./Addemployee";


const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch(); 
  
  const handleOpen = () => {
    setOpen(true);
  }; 
  
  const handleClose = () => {
    setOpen(false);
    // Refresh the employee data
    dispatch(getEmployeeData());
  };  
  
  const handleLogout = () => {
    const url = `${import.meta.env.VITE_HRMS_URL}/logout`; 
    axios.post(url)
      .then(() => {
        console.log("Logged out successfully");
        navigate("/");
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
    };  
  
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#4DB6AC' }}>
      <Toolbar>
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HRMS HUB
        </Typography> */}
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleOpen}>
            Add Employee
          </Button>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Toolbar>
      <AddEmployee open={open} handleClose={handleClose} />
    </AppBar>
  );
};


export default Navbar;