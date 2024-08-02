import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://laog98.pythonanywhere.com',
  timeout: 100000
});

export default instance
