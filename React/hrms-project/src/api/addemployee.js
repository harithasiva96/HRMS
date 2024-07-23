import axios from 'axios';

export const postEmployee = (data,successCB, errorCB ) => { 
  const url = `${import.meta.env.VITE_HRMS_URL}/addemployee`
  // console.log(url)
  return (
    axios.post(url,data).then(
      (res)=> {
        console.log(data,"api data")
        // successCB()
        if (successCB) successCB("Success")
        return  res.data;
      },
      (error)=>{
            console.log("errorrrr", error)
            if (errorCB) errorCB("An error occurred");
            // console.log(error.response.data.message)
            // const resp = error.response.data.message
          
      }
    ))}