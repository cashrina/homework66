import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://homework66-cashrina-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;
