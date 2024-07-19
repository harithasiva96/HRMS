
// import { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
// import { getEmployeeDetailsData } from "../../store/employeeCard"; 
// import { useDispatch } from "react-redux";
// import { Card, CardContent, Typography, Button, Container, Grid } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const EmployeeCard = () => {
//   const { employeeId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [employee, setEmployee] = useState(null);

//   // Fetch employee data based on employeeId
//   useEffect(() => {
//     dispatch(getEmployeeDetailsData(employeeId)).then((data) => {
//       if (data) setEmployee(data.payload);
//     });
//   }, [employeeId, dispatch]);

//   const handleBack = () => {
//     navigate('/mainhome'); // Navigate back to the main page
//   };

//   if (!employee) {
//     return <div>Loading...</div>;
//   }
//   console.log("page", employee.employee_id);

//   return (
//     <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',  backgroundColor: '#f0f0f0', }}>
//       <Card sx={{ maxWidth: 600, marginTop: 5, padding: 2 }}>
//         <CardContent sx={{ textAlign: 'center' }}>
//           <Typography variant="h5" component="div" gutterBottom>
//             Employee Details
//           </Typography>
//           <Grid container spacing={2} sx={{ textAlign: 'left'}}>
//             <Grid item xs={4}>
//               <Typography variant="body1"><strong>Employee Id:</strong></Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography variant="body1">{employee.employee_id}</Typography>
//             </Grid>
//             <Grid item xs={4}>
//               <Typography variant="body1"><strong>Employee Name:</strong></Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography variant="body1">{employee.employee_name}</Typography>
//             </Grid>
//             <Grid item xs={4}>
//               <Typography variant="body1"><strong>Email:</strong></Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography variant="body1">{employee.email}</Typography>
//             </Grid>
//             <Grid item xs={4}>
//               <Typography variant="body1"><strong>Phone Number:</strong></Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography variant="body1">{employee.phone_number}</Typography>
//             </Grid>
//             <Grid item xs={4}>
//               <Typography variant="body1"><strong>Address:</strong></Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography variant="body1">{employee.address}</Typography>
//             </Grid>
//             <Grid item xs={4}>
//               <Typography variant="body1"><strong>Designation:</strong></Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography variant="body1">{employee.designation_name}</Typography>
//             </Grid>
//             <Grid item xs={4}>
//               <Typography variant="body1"><strong>Total Leaves Used:</strong></Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography variant="body1">{employee.total_leaves_used}</Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//         <Button onClick={handleBack} color="primary" sx={{ display: 'block', margin: '0 auto' }}>
//           Back
//         </Button>
//       </Card>
//     </Container>
//   );
// };

// export default EmployeeCard;




// vcf/index.jsx

import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getEmployeeDetailsData } from "../../store/employeeCard"; 
import { useDispatch } from "react-redux";
import { Card, CardContent, Typography, Button, Container, Grid } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import QRCode from 'react-qr-code';
import vCardsJS from 'vcards-js';
import Navbar from "./Navbar";

const EmployeeCard = () => {
  const { employeeId } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [vCardString, setVCardString] = useState('');
  

  // Fetch employee data based on employeeId
  useEffect(() => {
    dispatch(getEmployeeDetailsData(employeeId)).then((data) => {
      if (data) {
        setEmployee(data.payload);
        generateVCard(data.payload);
      }
    });
  }, [employeeId, dispatch]);

  // Function to generate vCard string and QR code
  const generateVCard = (employee) => {
    const vCard = vCardsJS();
    vCard.firstName = employee.employee_name.split(' ')[0];
    vCard.lastName = employee.employee_name.split(' ')[1] || '';
    vCard.organization = 'Hamon Technologies';
    vCard.workPhone = employee.phone_number;
    vCard.email = employee.email;
    vCard.title = employee.designation_name;
    vCard.address = employee.address;
    const vCardString = vCard.getFormattedString();
    setVCardString(vCardString);
  };

  // Function to handle vCard download
  const handleDownloadVCard = () => {
    if (vCardString) {
      const blob = new Blob([vCardString], { type: 'text/vcard' });
      saveAs(blob, `${employee.employee_name}_contact.vcf`);
    }
  };

  // const handleBack = () => {
  //   navigate('/mainhome'); // Navigate back to the main page
  // };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}> 
    <Navbar/>

      <Card sx={{ maxWidth: 600, marginTop: 5, padding: 2 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h5" component="div" gutterBottom>
            Employee Details
          </Typography>
          <Grid container spacing={2} sx={{ textAlign: 'left' }}>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Employee Id:</strong></Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{employee.employee_id}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Employee Name:</strong></Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{employee.employee_name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Email:</strong></Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{employee.email}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Phone Number:</strong></Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{employee.phone_number}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Address:</strong></Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{employee.address}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Designation:</strong></Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{employee.designation_name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Total Leaves Used:</strong></Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{employee.total_leaves_used}</Typography>
            </Grid>
          </Grid>
          <Button onClick={handleDownloadVCard} color="primary" sx={{ display: 'block', margin: '10px auto' }}>
            Download vCard
          </Button>
          {vCardString && (
            <div>
              <h2>Scan this QR Code to get the contact details:</h2>
              <QRCode value={vCardString} size={256} />
            </div>
          )}
          {/* <Button onClick={handleBack} color="primary" sx={{ display: 'block', margin: '10px auto' }}> */}
            {/* Back
          </Button> */}
        </CardContent>
      </Card>
    </Container>
  );
};

export default EmployeeCard;


