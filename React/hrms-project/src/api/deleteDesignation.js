import axios from 'axios';

const url = import.meta.env.VITE_HRMS_URL;

const instance = axios.create({
  baseURL: url,
});

export const postDeleteDesignation = (designation_id_id) => {
    return instance.post(`/deleteDesignation/${designation_id_id}`)
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
  };
