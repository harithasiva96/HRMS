import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper , Box, Typography} from '@mui/material';
import Navbar from './Navbar';

const LeavePolicyTable = () => {
  return (
    
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
        <Navbar />
        <Typography variant="h3">Leave Policy</Typography>
    <TableContainer component={Paper} sx={{ minWidth: 600, boxShadow: 3, mt: 10}}>
      <Table>
        
        <TableHead>
          <TableRow>
            <TableCell><strong>Leave Type</strong></TableCell>
            <TableCell><strong>What It Is</strong></TableCell>
            <TableCell><strong>Entitlement</strong></TableCell>
            <TableCell><strong>Eligibility</strong></TableCell>
            <TableCell><strong>How to Apply</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Annual Leave</TableCell>
            <TableCell>Paid time off for vacation or personal reasons.</TableCell>
            <TableCell>20 days per year (prorated based on start date).</TableCell>
            <TableCell>All full-time employees after 3 months.</TableCell>
            <TableCell>Request via company portal 2 weeks in advance.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sick Leave</TableCell>
            <TableCell>Paid leave for illness or medical appointments.</TableCell>
            <TableCell>10 days per year.</TableCell>
            <TableCell>All employees.</TableCell>
            <TableCell>Notify your manager and submit a medical certificate via the portal.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Casual Leave</TableCell>
            <TableCell>Paid or unpaid leave for unexpected personal matters.</TableCell>
            <TableCell>5 days per year.</TableCell>
            <TableCell>Available after 6 months of employment.</TableCell>
            <TableCell>Submit a request form via the portal.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Maternity Leave</TableCell>
            <TableCell>Paid leave for childbirth and recovery.</TableCell>
            <TableCell>12 weeks (3 months).</TableCell>
            <TableCell>Female employees who have been employed for at least 6 months.</TableCell>
            <TableCell>Submit a request form 2 months in advance.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Paternity Leave</TableCell>
            <TableCell>Paid leave for the birth or adoption of a child.</TableCell>
            <TableCell>2 weeks.</TableCell>
            <TableCell>Male employees with a child or adopted child.</TableCell>
            <TableCell>Request via the portal 1 month in advance.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Adoption Leave</TableCell>
            <TableCell>Paid leave for the adoption of a child.</TableCell>
            <TableCell>2 weeks.</TableCell>
            <TableCell>All employees who have adopted a child.</TableCell>
            <TableCell>Submit a request form with adoption papers.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bereavement Leave</TableCell>
            <TableCell>Paid leave for the death of a close family member.</TableCell>
            <TableCell>3 days.</TableCell>
            <TableCell>All employees.</TableCell>
            <TableCell>Notify your manager and submit a request form via the portal.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Unpaid Leave</TableCell>
            <TableCell>Leave without pay for personal or professional reasons.</TableCell>
            <TableCell>Up to 4 weeks per year.</TableCell>
            <TableCell>All employees.</TableCell>
            <TableCell>Request via the portal and provide a reason.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Public Holidays</TableCell>
            <TableCell>Paid days off on officially recognized holidays.</TableCell>
            <TableCell>Per the company holiday schedule.</TableCell>
            <TableCell>All employees.</TableCell>
            <TableCell>Check the company calendar for specific dates.</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default LeavePolicyTable;
