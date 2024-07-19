import { useState } from "react";
import { useDispatch } from "react-redux";
import { postEmployeeData } from "../../store/addemployee.js";
import { TextField, Button, Box, Modal, Dialog, Snackbar } from "@mui/material";

const AddEmployee = ({open, handleClose }) => {
  const dispatch = useDispatch();

  const initialValues = {
    employee_id: "",
    employee_name: "",
    email: "",
    total_leaves_used: "",
    phone_number: "",
    address: "",
    designation_name: "",
  };

  const [employee, setEmployee] = useState(initialValues);
  console.log("employee", employee);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSuccessCB = () => {
    setSuccessMessage("Employee added successfully!");
    setEmployee(initialValues);
    handleClose();
  };

  const handleErrorCB = (error) => {
    setErrorMessage(error?.message || "An error occured while adding employee.");
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  // submit button
  const handleAddEmployee = (e) => {
    e.preventDefault();
    console.log("Form submitted:", employee);
    dispatch(
      postEmployeeData({
        data: employee,
        successCB: handleSuccessCB,
        errorCB: handleErrorCB,
      })
    );
  };

  const handleCloseModal = () => {
    handleClose();
  };

  console.log(open,"open")
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Modal
          open={open}
          onClose={handleClose}
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
            {/* <TextField
              fullWidth
              label="Employee Id"
              value={employee.employee_id}
              onChange={(e) =>
                setEmployee({ ...employee, employee_id: e.target.value })
              }
              sx={{ mb: 2 }}
            /> */}
            <TextField
              fullWidth
              label="Employee Name"
              type="text"
              required
              id="filled-required"
              varient="filled"
              value={employee.employee_name}
              onChange={(e) =>
                setEmployee({ ...employee, employee_name: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Total Leaves Used"
              id="filled-number"
              
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              value={employee.total_leaves_used}
              onChange={(e) =>
                setEmployee({ ...employee, total_leaves_used: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              varient="filled"
              value={employee.phone_number}
              onChange={(e) =>
                setEmployee({ ...employee, phone_number: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Address"
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
             
              fullWidth
              label="designation_name"
              
              value={employee.designation_name}
              onChange={(e) =>
                setEmployee({ ...employee, designation_name: e.target.value })
              }
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddEmployee}
              >
                Save
              </Button>
              <Button
                sx={{ ml: 2 }}
                variant="outlined"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Dialog>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />

      {/* Snackbar for error message */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </div>
  );
};

export default AddEmployee;
