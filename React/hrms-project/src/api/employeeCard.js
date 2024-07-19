import axios from 'axios';

const url = import.meta.env.VITE_HRMS_URL;

const instance = axios.create({
  baseURL: url,
});

export const getEmployeeDetails = (employeeId) => {
    return instance.get(`/getemployeecard/${employeeId}`)
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
  };