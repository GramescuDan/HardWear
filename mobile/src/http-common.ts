import axios from "axios";

export default axios.create({
  baseURL: 'https://padspring.herokuapp.com',
  headers: {
    "Content-type": "application/json",
  }
});
