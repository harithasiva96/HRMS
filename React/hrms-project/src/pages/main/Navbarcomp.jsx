import { useNavigate } from 'react-router-dom';
import { Button, Stack, AppBar, Toolbar, Typography } from '@mui/material';




const Navbarcomp = () => {
  const navigate = useNavigate();
 
  
  const handleBack = () => {
    navigate('/mainhome')
 }
   
  
   return (
    
    <AppBar position="fixed" sx={{ backgroundColor: '#4DB6AC' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HRMS HUB
        </Typography>
        <Stack direction="row" spacing={2}>
         
          <Button variant="contained" onClick={handleBack}>
            Home
          </Button>
        </Stack>
      </Toolbar>
      
    </AppBar>
  );
};
export default Navbarcomp;