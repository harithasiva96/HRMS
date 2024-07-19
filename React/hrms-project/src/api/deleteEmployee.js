import axios from 'axios';

const url = import.meta.env.VITE_HRMS_URL;

const instance = axios.create({
  baseURL: url,
});

export const postDeleteEmployee = (employee_id) => {
    return instance.post(`/deleteemployee/${employee_id}`)
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
  };
