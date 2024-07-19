// import axios from 'axios';

// const url= import.meta.env.VITE_PRODUCT_URL

// const instance = axios.create({
//   baseURL: url,
// });

// export const postLogin = () => {    
//   console.log(url,"url")                                                                                                                                                                                                                                                                                                                                                                                                                              
//   return instance.post('/login').then(
//     (res) => {
//       console.log(res.data)
//       return res.data;
//     })

//     .catch(error => {
//       // console.error("Error:", error);
//       throw error;
//     }
//   );
    
// };


import axios from 'axios';

export const postLogin = (data,successCB, errorCB ) => { 
  console.log("data",data)
  const url = `${import.meta.env.VITE_HRMS_URL}/login`
  console.log(url)
  return (
    axios.post(url,data).then(
      (res)=> {
        console.log(data,"api data")
        successCB()
        if (successCB) successCB("Success")
        return  res.data;
      },
      (error)=>{
            console.log(error.response.data.message)
            const resp = error.response.data.message
            errorCB(resp)
            // if (errorCB) errorCB("An error occurred");
      }
    ))}