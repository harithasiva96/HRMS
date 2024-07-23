import { useState } from "react";
import { useDispatch } from "react-redux";
import { postLoginData } from "../../store/login.js";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Modal, Dialog, Typography } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const initialValues = {
    user_name: "",
    password: "",
  };

  const [login, setLogin] = useState(initialValues);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true); 
  const navigate = useNavigate();

  const handleSuccessCB = () => {
    handleLoginClick();
  };

  const handleLoginClick = () => {
    navigate("/minidrawer");
  };

  const onCancel = () => {
    navigate("/");
  }

  const handleErrorCB = (data) => {
    setError(data)
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", login);
    dispatch(
      postLoginData({
        data: login,
        successCB: handleSuccessCB,
        errorCB: handleErrorCB,
      })
    );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}> {/* Fixed `open` prop */}
      <Modal
        open={open}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            fullWidth
            label="User name"
            value={login.user_name}
            onChange={(e) =>
              setLogin({ ...login, user_name: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            sx={{ mb: 2 }}
          />
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
            <span style={{ width: '16px' }} />
            <Button variant="contained" color="primary" onClick={onCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Dialog>
  );
};

export default Login;

