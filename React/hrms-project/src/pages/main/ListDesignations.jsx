import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDesignationData } from "../../store/listDesignation";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Navbarcomp from "./Navbarcomp";
import UpdateDesignation from "./UpdateDesignation";
import ButtonGroup from '@mui/material/ButtonGroup';
import { postDeleteDesignation } from "../../api/deleteDesignation.js";
import { Box } from "@mui/material";



const ListDesignations = () => {

  
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedDesignation, setSelectedDEsignation] = useState(null);
 
  
  const dispatch = useDispatch();
  const designationData = useSelector((state) => state.designationData.data);
  // console.log(designationData,"desiiii")
  const isLoading = useSelector((state) => state.designationData.status);
  

  const handleOpenUpdate = (employee) => {
    setSelectedDEsignation(employee);
    setOpenUpdate(true);
  };
  
  
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedDEsignation(null);
    dispatch(getDesignationData());  // Refresh employee data after update
  };
  
  const handleDelete = async(designation_id) => {
    await postDeleteDesignation(designation_id)
    dispatch(getDesignationData())
  }
 

  useEffect(() => {
    dispatch(getDesignationData());
  }, [dispatch]);


  return (
    <>
    
      {isLoading === "pending" ? (
        <div>LOADING ...</div>
      ) : (<div>
        <Navbarcomp />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
        <TableContainer component={Paper} sx={{ minWidth: 600, boxShadow: 3, mt: 14}}>
      
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              
              <TableCell align="center" sx={{ fontWeight: 'bold'}}>Designation Id</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Designation Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Maximum Leave Permitted</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Options</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {designationData.map((data) => (
              <TableRow
                key={data}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                
               
                <TableCell align="center">{data.designation_id}</TableCell>
                <TableCell align="center"> {data.designation_name}</TableCell>
                <TableCell align="center">{data.max_permitted_leave}</TableCell>
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
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(data.designation_id)}
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
      </TableContainer>
      </Box>
      </div>
        )}
        {selectedDesignation && (
        <UpdateDesignation
          openUpdate={openUpdate}
          handleCloseUpdate={handleCloseUpdate}
          designationData={selectedDesignation}
        />
      )}
 
    
     </>
  );
};

export default ListDesignations;

