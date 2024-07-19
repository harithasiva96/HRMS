import { useNavigate } from 'react-router-dom';
import { Button, Stack, AppBar, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import AddDesignation from "./AddDesignation"
import { getDesignationData } from "../../store/listDesignation";
import { useDispatch } from 'react-redux';





const Navbarcomp = () => {
  const navigate = useNavigate();
 
  const [openAdd, setOpenAdd] = useState(false);
  const handleBack = () => {
    navigate('/minidrawer')
 }

 const handleOpen = () => {
  setOpenAdd(true)
};
const dispatch = useDispatch()
const handleClose = () => {
  setOpenAdd(false);
  
  dispatch(getDesignationData())
}
   
  
   return (
    
    <AppBar position="fixed" sx={{ backgroundColor: '#4DB6AC' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HRMS HUB: DESIGNATIONS
        </Typography>
        <Stack direction="row" spacing={2}>
       
        <Button  variant="contained"  onClick = {handleOpen}>Add Designation</Button>
              
          <Button variant="contained" onClick={handleBack}>
            Home
          </Button>
        </Stack>
      </Toolbar>
      < AddDesignation openAdd ={openAdd}
    handleClose ={handleClose}/> 
    </AppBar>
  );
};
export default Navbarcomp;