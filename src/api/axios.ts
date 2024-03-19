import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/3-1',
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

const window = global.window;

instance.interceptors.request.use(
  (config) => {
    // confing는 axios의 설정을 담고있는 객체
    const token = window?.sessionStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (window) console.log(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (window) console.log(error);
    return Promise.reject(error);
  },
);

export default instance;
