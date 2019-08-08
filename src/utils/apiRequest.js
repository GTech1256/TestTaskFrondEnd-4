// import Vue from 'vue';
import axios from 'axios';

// axios.defaults.withCredentials = true; // enable cookies

// const apiVersion = "v1";
const apiRequest = axios.create({
  baseURL: 'https://swapi.co/api/',
});

// ERROR HANDLER
apiRequest.interceptors.response.use(
  r => r,
  (error) => {
    // error can handle with some analytics utils
    console.log(error);
  },
);

// Vue.prototype.$apiRequest = apiRequest; // set global Api Request

export default apiRequest;
