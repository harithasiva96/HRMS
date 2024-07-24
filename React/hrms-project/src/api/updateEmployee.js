import axios from 'axios';

export const updateEmployee = ({employee_id,data,successCB, errorCB} ) => { 
  console.log("employeid",employee_id)
  const url = `${import.meta.env.VITE_HRMS_URL}/updateemployee/${employee_id}`
  console.log(url)
  return (
   
    axios.put(url,data).then(
      (res)=> {
        console.log(data,"api data")
       
        if (successCB) successCB(res.data)
        return  res.data;
      },
      (error)=>{
            console.log(error.response.data.error)
            const resp = error.response.data.error
            // console.log("errorrrr", error)
            // if (errorCB) errorCB("An error occurred");
            errorCB(resp)
          
      }
    ))}