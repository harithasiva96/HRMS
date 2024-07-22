import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import './styles.css';



const Home = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/login");
  };

  return (
    <div id="background">
    <Typography variant="h2" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#333',textAlign: 'center',}}>
          Innovative Solutions
        </Typography>
      <Box
        height={300}
        width={800}
        my={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: "2px Solid Blue" , marginLeft:"500px", marginTop:"200px"}}
      >
        <h1>Welcome to HRMS Hub</h1>

        <Button variant="contained" onClick={handleOnClick}>
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Home;
