import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://hack-react-9yh5.vercel.app',
  //baseURL: 'http://127.0.0.1:5000',
  timeout: 100000
});

export default instance
