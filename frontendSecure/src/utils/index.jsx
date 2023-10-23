import axios from 'axios';
import { API_BASE_URL } from '../constants';

const fetchData = async (endpoint) => {
  try {
    const res = await axios.get(`${API_BASE_URL}${endpoint}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getUrlParams = () => {
  return new URLSearchParams(window.location.search);
};

export { fetchData, getUrlParams };