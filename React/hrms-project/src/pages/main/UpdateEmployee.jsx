import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateEmployeeData } from "../../store/updateEmployee"
import { TextField, Button, Box, Dialog, Snackbar } from "@mui/material";

const UpdateEmployee = ({ openUpdate, handleClose, employeeData }) => {
  const dispatch = useDispatch();

  const [employee, setEmployee] = useState(employeeData);
  
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
 

  // Update local state when employeeData prop changes
  useEffect(() => {
    setEmployee(employeeData);
  }, [employeeData]);

  const handleSuccessCB = (data) => {
    // setSuccessMessage(data || "Employee details updated successfully!");
    setSuccessMessage("Employee added successfully!");
    
    console.log("success",data)
    console.log(successMessage,'msg')

    setEmployee(employeeData)
    handleClose();
        };

       
  const handleErrorCB = (error) => {
    setErrorMessage(error?.message || "An error occurred while updating employee details.");
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleUpdateEmployee = (e) => {
   
    e.preventDefault();
    dispatch(
      updateEmployeeData({
        employee_id:employee.employee_id,
        data: employee,
        successCB: handleSuccessCB,
        errorCB: handleErrorCB,
      })
    );
  };

  return (
    <Dialog open={openUpdate} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          p: 4,
        }}
      >
        <TextField
          fullWidth
          label="Employee Id"
          value={employee.employee_id}
          onChange={(e) =>
            setEmployee({ ...employee, employee_id: e.target.value })
          }
          sx={{ mb: 2 }}
          disabled
        />
        <TextField
          fullWidth
          label="Employee Name"
          value={employee.employee_name}
          onChange={(e) =>
            setEmployee({ ...employee, employee_name: e.target.value })
          }
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          value={employee.email}
          onChange={(e) =>
            setEmployee({ ...employee, email: e.target.value })
          }
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Total Leaves Used"
          value={employee.total_leaves_used}
          onChange={(e) =>
            setEmployee({ ...employee, total_leaves_used: e.target.value })
          }
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Phone Number"
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
          label="Designation Name"
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
            onClick={handleUpdateEmployee}
          >
            Update
          </Button>
          <Button
            sx={{ ml: 2 }}
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </Dialog>
  );
};

export default UpdateEmployee;
