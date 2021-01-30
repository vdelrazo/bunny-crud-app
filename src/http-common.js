import axios from "axios";

export default axios.create({
  baseURL: "https://api-rest-bunny.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
