import http from "../http-common";
import axios from "axios";

const usersAPI = "https://api-rest-bunny.herokuapp.com/api/users";

class UsersDataService {
  async getAllUsers() {
    const promise = await axios.get(usersAPI);
    return promise;
  }

  async deleteUser(id) {
    const promise = await axios.delete(`${usersAPI}/${id}`);
    return promise;
  }

  async updateUser(id, data) {
    const promise = await axios.put(`${usersAPI}/${id}`, `{"name": "${data}"}`,  {
      headers: {
          'Content-Type': 'application/json',
      }
    });
    return promise;
  }

  async createUser(data) {
    const promise = await axios.post(usersAPI, `{"name": "${data}"}`,  {
      headers: {
          'Content-Type': 'application/json',
      }
    });
    return promise;
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new UsersDataService();