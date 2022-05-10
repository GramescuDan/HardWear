import axios from "axios";

export default axios.create({
  baseURL: 'http://192.168.0.101:8080',
  headers: {
    "Content-type": "application/json",
  }
});
