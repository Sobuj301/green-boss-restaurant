import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'https://y-livid-ten.vercel.app',
  });
const useAxiosSecure = () => {
  
  axiosSecure.interceptors.request.use(function (config){

    const token = localStorage.getItem('token')
    config.headers.authorization = `Bearer ${token}`
    return config
  },function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


  // axiosSecure.interceptors.response.use(function (response){
  //   return response;
  // },function(error){
  //   const status = error.response.status
  //   if(status === 401 || status === 403){
  //       //  
  //   }
  //   console.log('interceptor error', status)
  //   return Promise.reject(error);
  // })
    return axiosSecure
};

export default useAxiosSecure;