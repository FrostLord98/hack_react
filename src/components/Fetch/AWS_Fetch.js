import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://laog98.pythonanywhere.com',
  //baseURL: 'http://127.0.0.1:5000',
  timeout: 100000
});

export default instance
