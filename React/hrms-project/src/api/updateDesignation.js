import axios from 'axios';

export const updateDesignation = ({designation_id,data,successCB, errorCB} ) => { 
  // console.log("employeid",designation_id)
  const url = `${import.meta.env.VITE_HRMS_URL}/updatedesignation/${designation_id}`
  // console.log(url)
  return (
    axios.put(url,data).then(
      (res)=> {
        // console.log(data,"api data")
        successCB()
        if (successCB) successCB("Success")
        return  res.data;
      },
      (error)=>{
            // console.log(error.response.data.message)
            const resp = error.response.data.message
            errorCB(resp)
          
      }
    ))}