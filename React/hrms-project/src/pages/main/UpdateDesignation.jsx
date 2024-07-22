import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDesignationData } from "../../store/updateDesignation"
import { TextField, Button, Box, Dialog, Snackbar } from "@mui/material";

const UpdateDesignation = ({ openUpdate, handleCloseUpdate, designationData }) => { //eslint-disable-line
  const dispatch = useDispatch();
  const [designation, setDesignation] = useState(designationData);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // console.log(designation,"page")
  // Update local state when designationData prop changes
  useEffect(() => {
    setDesignation(designationData);
  }, [designationData]);

  const handleSuccessCB = () => {
    setSuccessMessage("Employee details updated successfully!");
    handleCloseUpdate();

  };

  const handleErrorCB = (error) => {
    setErrorMessage(error?.message || "An error occurred while updating designation details.");
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleUpdateDesignation = (e) => {
   
    e.preventDefault();
    dispatch(
        updateDesignationData({
        designation_id:designation.designation_id,
        data: designation,
        successCB: handleSuccessCB,
        errorCB: handleErrorCB,
      })
    );
  };

  return (
    <Dialog open={openUpdate} onClose={handleCloseUpdate}>
      <Box
        sx={{
          width: 400,
          p: 4,
        }}
      >
        <TextField
          fullWidth
          label="Designation Name"
          value={designation.designation_name}
          onChange={(e) =>
            setDesignation({ ...designation, designation_name: e.target.value })
          }
          sx={{ mb: 2 }}
          
        />
        <TextField
          fullWidth
          label="Maximum Permitted Leave"
          id="filled-number"
          type="number"
          InputLabelProps={{
                shrink: true,
              }}
          variant="filled"
          value={designation.max_permitted_leave}
          onChange={(e) =>
            setDesignation({ ...designation, max_permitted_leave: e.target.value })
          }
          sx={{ mb: 2 }}
        />
       
          

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateDesignation}
          >
            Update
          </Button>
          <Button
            sx={{ ml: 2 }}
            variant="outlined"
            onClick={handleCloseUpdate}
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

export default UpdateDesignation;

