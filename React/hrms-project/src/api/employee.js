import axios from "axios";

const url = import.meta.env.VITE_HRMS_URL

const instance = axios.create({
    baseURL: url,
});

export const getEmployee = () => {    
      // console.log(url,"url")                                                                                                                                                                                                                                                                                                                                                                                                                              
      return instance.get('/employee').then(
        (res) => {
          // console.log(res.data)
          return res.data;
        })
    
        .catch(error => {
          throw error;
        }
      );
        
    };