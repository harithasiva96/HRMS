import axios from 'axios';

const url = import.meta.env.VITE_HRMS_URL;

const instance = axios.create({
  baseURL: url,
});

export const postDeleteDesignation = (designation_id) => {
  // console.log(designation_id,"designation_id")
    return instance.post(`/deletedesignation/${designation_id}`)
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
  };
