import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/3-1',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*", 
  },
});

instance.interceptors.request.use(
  (config) => {
    // confing는 axios의 설정을 담고있는 객체
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

//axios instance 생성, baseURL 설정
export default instance;
