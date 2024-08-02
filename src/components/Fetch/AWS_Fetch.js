import axios from 'axios';


const instance = axios.create({
  timeout: 100000
});

export default instance
