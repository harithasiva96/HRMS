import { useNavigate } from "react-router-dom";
import { Button, Stack, AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/minidrawer");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#4DB6AC" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          INNOVATIVE SOLUTIONS:HRMS HUB
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

export default Navbar;
