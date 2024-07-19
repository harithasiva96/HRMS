// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
// import { updateEmployeeLeave } from "../../store/employee.js"; // Ensure you have an action creator for updating leaves

// const UpdateLeaveForm = ({ open, handleClose, employee }) => {
//   const [totalLeaves, setTotalLeaves] = useState(employee.total_leaves_used || 0);
//   const dispatch = useDispatch();

//   const handleSubmit = () => {
//     dispatch(updateEmployeeLeave({ employeeId: employee.employee_id, totalLeaves }));
//     handleClose();
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Update Total Leaves Used</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           id="totalLeaves"
//           label="Total Leaves Used"
//           type="number"
//           fullWidth
//           variant="standard"
//           value={totalLeaves}
//           onChange={(e) => setTotalLeaves(e.target.value)}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button onClick={handleSubmit}>Update</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default UpdateLeaveForm;


