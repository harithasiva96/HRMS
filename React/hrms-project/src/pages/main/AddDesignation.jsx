import { useState } from "react";
import { useDispatch } from "react-redux";
import { postDesignationData } from "../../store/designationadd.js";
import { TextField, Button, Box, Modal, Dialog, Snackbar } from "@mui/material";

const AddDesignation = ({openAdd, handleClose }) => {
  const dispatch = useDispatch();

  const initialValues = {
    designation_id: "",
    designation_name: "",
    max_permitted_leave: "",
   
  };

  const [designation, setDesignation] = useState(initialValues);
//   console.log("designation", designation);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log("Form submitted:", designation);

  const handleSuccessCB = () => {
    setSuccessMessage(" Designation added successfully!");
    setDesignation(initialValues);
    handleClose();
    console.log("success")
  };

  const handleErrorCB = (error) => {
    setErrorMessage(error?.message || "An error occured while adding designation.");
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  // submit button
  const handleAddDesignation = (e) => {
    console.log("handleAddDesignation")
    e.preventDefault();
    console.log("Form submitted:", designation);
    dispatch(
      postDesignationData({
        data: designation,
        successCB: handleSuccessCB,
        errorCB: handleErrorCB,
      })
    );
  };

  const handleCloseModal = () => {
    handleClose();
  };

  return (
    <div>
      <Dialog open={openAdd} onClose={handleClose}>
        <Modal
          open={openAdd}
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
              label="Designation Id"
              value={designation.designation_id}
              onChange={(e) =>
                setDesignation({ ...designation, designation_id: e.target.value })
              }
              sx={{ mb: 2 }}
              
            /> */}
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
                onClick={handleAddDesignation}
              >
                ADD
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

export default AddDesignation;
