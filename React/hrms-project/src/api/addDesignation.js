import axios from 'axios';

export const postDesignation = (data,successCB, errorCB ) => { 
  // console.log("data",data)
  const url = `${import.meta.env.VITE_HRMS_URL}/designation`
  // console.log(url)
  return (
    axios.post(url,data).then(
      (res)=> {
        // console.log(data,"api data")
        successCB()
        if (successCB) successCB("Success")
        return  res.data;
      },
      (error)=>{
            // console.log(error.response.data.message,"pppppppppppp")
            const resp = error.response.data.message
            errorCB(resp)
          
      }
    ))}