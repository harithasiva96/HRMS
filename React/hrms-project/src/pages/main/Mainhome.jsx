// import { useEffect, useState } from "react";
// import {useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import { getEmployeeData } from "../../store/employee.js";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// // import AddEmployee from "./Addemployee";
// import Navbar from "./Navbar.jsx";
// import UpdateEmployee from "./UpdateEmployee.jsx";
// import ButtonGroup from '@mui/material/ButtonGroup';
// import { postDeleteEmployee } from "../../api/deleteEmployee.js";
// import Typography from '@mui/material/Typography';

// const Mainhome = () => {

//   const [openUpdate, setOpenUpdate] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
  

//   const dispatch = useDispatch();
//   const employeeData = useSelector((state) => state.employeeData.data);
//   console.log(employeeData);
//   const isLoading = useSelector((state) => state.employeeData.status);
//   const navigate = useNavigate();

//   // const handleLogout = () => {
//   //   navigate('/');
//   // };
//   const handleOpenUpdate = (employee) => {
//     setSelectedEmployee(employee);
//     setOpenUpdate(true);
//   };


//   const handleCloseUpdate = () => {
//     setOpenUpdate(false);
//     setSelectedEmployee(null);
//     dispatch(getEmployeeData());  // Refresh employee data after update
    
    
//   };
//   const handleDesignations = () => {
//     navigate('/designations')
//   }

//   // const handleOpen = () => {
//   //   setOpen(true)
//   // };

//   // const handleClose = () => {
//   //   setOpen(false);
//   //   // refresh the get product page
//   //   dispatch(getEmployeeData())
//   // }

//   const handleViewDetails = (employeeId) => {
//     navigate(`/employee/${employeeId}`);
//   }

//   const handleDelete = async(employee_id) => {
//     await postDeleteEmployee(employee_id)
    
//   }

//   useEffect(() => {
//     dispatch(getEmployeeData());
//   }, [dispatch]);


//   return (
//     <>
   
//       {isLoading === "pending" ? (
//         <div>LOADING ...</div>
//       ) : (<div>
//           <Navbar/>
//         <Stack spacing={2} direction="row" justifyContent="center">
//     {/* <Button  variant="contained"  onClick = {handleLogout}>Logout</Button> */}
//     {/* <Button variant="contained"  onClick = {handleOpen}>Add Employee</Button> */}
//     <Button variant="contained"  onClick = {handleDesignations}>Designations</Button>
//     </Stack>
//     <Typography variant="h4" gutterBottom sx={{ p: 2, textAlign: 'center' }}>
//             Employees
//           </Typography>
//         <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 400 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
              
//               <TableCell align="center" sx={{ fontWeight: 'bold'}}>Employee Id</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold' }}>Employee Name</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold' }}>Total Leaves Used</TableCell>
//               <TableCell align="center"sx={{ fontWeight: 'bold' }}>Designation</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
             
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {employeeData.map((data) => (
             
//               <TableRow
//                 key={data.employee_id}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
                
               
//                 <TableCell align="center">{data.employee_id}</TableCell>
//                 <TableCell align="center">
//                 <Button
//                     variant="text"
//                     onClick={() => handleViewDetails(data.employee_id)}
//                     sx={{ textDecoration: 'none', color: 'blue' }}
//                   >
//                   {data.employee_name}
//                   </Button>
//                   </TableCell>
//                 <TableCell align="center">{data.email}</TableCell>
//                 <TableCell align="center">{data.total_leaves_used}/{data.max_permitted_leave}</TableCell>
//                 <TableCell align="center">{data.designation_name}</TableCell>
//                 <TableCell align="center">
//                 <ButtonGroup
//                           disableElevation
//                          variant="contained"
//                         aria-label="Disabled button group"
//                                   >
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => handleOpenUpdate(data)}
//                         sx={{ mr: 1 }}
//                       >
//                         Update
//                       </Button>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleDelete(data.employee_id)}
//                       >
//                         Delete
//                       </Button>
//                       </ButtonGroup>
//                     </TableCell>
               
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
      
//       </div>
//         )}
      
//         {selectedEmployee && (
//         <UpdateEmployee
//           openUpdate={openUpdate}
//           handleClose={handleCloseUpdate}
//           employeeData={selectedEmployee}
//         />
       
//       )}
     
 
//  {/* < AddEmployee open = {open}
//     handleClose ={handleClose}/> */}
  
//     </>
//   );
// };

// export default Mainhome;







// import { useEffect, useState } from "react";
// import {useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import { getEmployeeData } from "../../store/employee.js";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// // import AddEmployee from "./Addemployee";
// // import Navbar from "./Navbar.jsx";
// import UpdateEmployee from "./UpdateEmployee.jsx";
// import ButtonGroup from '@mui/material/ButtonGroup';
// import { postDeleteEmployee } from "../../api/deleteEmployee.js";
// import Typography from '@mui/material/Typography';
// import MiniDrawer from "./SideDrawer.jsx";

// const Mainhome = () => {

//   const [openUpdate, setOpenUpdate] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
  

//   const dispatch = useDispatch();
//   const employeeData = useSelector((state) => state.employeeData.data);
//   console.log(employeeData);
//   const isLoading = useSelector((state) => state.employeeData.status);
//   const navigate = useNavigate();

//   // const handleLogout = () => {
//   //   navigate('/');
//   // };
//   const handleOpenUpdate = (employee) => {
//     setSelectedEmployee(employee);
//     setOpenUpdate(true);
//   };


//   const handleCloseUpdate = () => {
//     setOpenUpdate(false);
//     setSelectedEmployee(null);
//     dispatch(getEmployeeData());  // Refresh employee data after update
    
    
//   };
//   // const handleDesignations = () => {
//   //   navigate('/designations')
//   // }

//   // const handleOpen = () => {
//   //   setOpen(true)
//   // };

//   // const handleClose = () => {
//   //   setOpen(false);
//   //   // refresh the get product page
//   //   dispatch(getEmployeeData())
//   // }

//   const handleViewDetails = (employeeId) => {
//     navigate(`/employee/${employeeId}`);
//   }

//   const handleDelete = async(employee_id) => {
//     await postDeleteEmployee(employee_id)
    
//   }

//   useEffect(() => {
//     dispatch(getEmployeeData());
//   }, [dispatch]);


//   return (
//     <>
   
//       {isLoading === "pending" ? (
//         <div>LOADING ...</div>
//       ) : (<div>
//           <MiniDrawer/>
//         <Stack spacing={2} direction="row" justifyContent="center">
//     {/* <Button  variant="contained"  onClick = {handleLogout}>Logout</Button> */}
//     {/* <Button variant="contained"  onClick = {handleOpen}>Add Employee</Button> */}
//     {/* <Button variant="contained"  onClick = {handleDesignations}>Designations</Button> */}
//     </Stack>
//     <Typography variant="h4" gutterBottom sx={{ p: 2, textAlign: 'center' }}>
//             Employees
//           </Typography>
//         <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 400 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
              
//               <TableCell align="center" sx={{ fontWeight: 'bold'}}>Employee Id</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold' }}>Employee Name</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold' }}>Total Leaves Used</TableCell>
//               <TableCell align="center"sx={{ fontWeight: 'bold' }}>Designation</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
             
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {employeeData.map((data) => (
             
//               <TableRow
//                 key={data.employee_id}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
                
               
//                 <TableCell align="center">{data.employee_id}</TableCell>
//                 <TableCell align="center">
//                 <Button
//                     variant="text"
//                     onClick={() => handleViewDetails(data.employee_id)}
//                     sx={{ textDecoration: 'none', color: 'blue' }}
//                   >
//                   {data.employee_name}
//                   </Button>
//                   </TableCell>
//                 <TableCell align="center">{data.email}</TableCell>
//                 <TableCell align="center">{data.total_leaves_used}/{data.max_permitted_leave}</TableCell>
//                 <TableCell align="center">{data.designation_name}</TableCell>
//                 <TableCell align="center">
//                 <ButtonGroup
//                           disableElevation
//                          variant="contained"
//                         aria-label="Disabled button group"
//                                   >
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => handleOpenUpdate(data)}
//                         sx={{ mr: 1 }}
//                       >
//                         Update
//                       </Button>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleDelete(data.employee_id)}
//                       >
//                         Delete
//                       </Button>
//                       </ButtonGroup>
//                     </TableCell>
               
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
      
//       </div>
//         )}
      
//         {selectedEmployee && (
//         <UpdateEmployee
//           openUpdate={openUpdate}
//           handleClose={handleCloseUpdate}
//           employeeData={selectedEmployee}
//         />
       
//       )}
     
 
//  {/* < AddEmployee open = {open}
//     handleClose ={handleClose}/> */}
  
//     </>
//   );
// };

// export default Mainhome;


import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getEmployeeData } from "../../store/employee.js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import UpdateEmployee from "./UpdateEmployee.jsx";
import ButtonGroup from '@mui/material/ButtonGroup';
import { postDeleteEmployee } from "../../api/deleteEmployee.js";
import Typography from '@mui/material/Typography';

const Mainhome = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state.employeeData.data);
  // const isLoading = useSelector((state) => state.employeeData.status);
  const navigate = useNavigate();

  const handleOpenUpdate = (employee) => {
    setSelectedEmployee(employee);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedEmployee(null);
    dispatch(getEmployeeData());  // Refresh employee data after update
  };

  const handleViewDetails = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  }

  const handleDelete = async (employee_id) => {
    await postDeleteEmployee(employee_id);
    dispatch(getEmployeeData());  // Refresh employee data after deletion
  }

  useEffect(() => {
    dispatch(getEmployeeData());
  }, [dispatch]);

  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="center">
        {/* Removed commented-out buttons */}
      </Stack>
      <Typography variant="h4" gutterBottom sx={{ p: 2, textAlign: 'center' }}>
        Employees
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Employee Id</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Employee Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Total Leaves Used</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Designation</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.map((data) => (
              <TableRow
                key={data.employee_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{data.employee_id}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="text"
                    onClick={() => handleViewDetails(data.employee_id)}
                    sx={{ textDecoration: 'none', color: 'blue' }}
                  >
                    {data.employee_name}
                  </Button>
                </TableCell>
                <TableCell align="center">{data.email}</TableCell>
                <TableCell align="center">{data.total_leaves_used}/{data.max_permitted_leave}</TableCell>
                <TableCell align="center">{data.designation_name}</TableCell>
                <TableCell align="center">
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled button group"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenUpdate(data)}
                      sx={{ mr: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(data.employee_id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedEmployee && (
        <UpdateEmployee
          openUpdate={openUpdate}
          handleClose={handleCloseUpdate}
          employeeData={selectedEmployee}
        />
      )}
    </>
  );
};

export default Mainhome;












