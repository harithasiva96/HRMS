import { useState, useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { updateEmployeeData } from "../../store/updateEmployee"
import { TextField, Button, Box, Dialog, Snackbar,MenuItem, Select , FormControl, InputLabel} from "@mui/material";
import { getDesignationData } from "../../store/listDesignation.js";

const UpdateEmployee = ({ openUpdate, handleClose, employeeData }) => { //eslint-disable-line
  const dispatch = useDispatch();

  const [employee, setEmployee] = useState(employeeData);
  
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
 

  // Update local state when employeeData prop changes
  useEffect(() => {
    setEmployee(employeeData);
  }, [employeeData]);

  const handleSuccessCB = (data) => {
   
    setSuccessMessage("Employee added successfully!");
    
    console.log("success",data)
   

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

  const designation = useSelector((state) => state.designationData.data);
  useEffect(() => {
    dispatch(getDesignationData());
  }, [dispatch]);

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
        {/* <TextField
          fullWidth
          label="Designation Name"
          value={employee.designation_name}
          onChange={(e) =>
            setEmployee({ ...employee, designation_name: e.target.value })
          }
          sx={{ mb: 2 }}
        /> */}

            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel id="designation-label">Designation</InputLabel>


            <Select
            name="des_name"
            
            value={employee.designation_name}
            onChange={(e) =>
              setEmployee({ ...employee, designation_name: e.target.value })
            }
            displayEmpty
            sx={{
              width: '350px',         
              height: '50px',         
              maxWidth: '100%',      
              minWidth: '200px',}}
            
            >
              <MenuItem value="" disabled>
              Select Designation
              </MenuItem>
              {designation.map(designation => (
                <MenuItem key={designation.designation_name} value={designation.designation_name}>
                  {designation.designation_name}
                </MenuItem>
              ))}
            </Select>
            </FormControl>

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
