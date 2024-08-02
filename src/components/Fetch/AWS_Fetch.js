import axios from 'axios';


const instance = axios.create({
  //baseURL: 'https://react-backend-git-main-laog98s-projects.vercel.app',
  baseURL: 'https://react-drab-nine.vercel.app',
  timeout: 100000
});

export default instance
