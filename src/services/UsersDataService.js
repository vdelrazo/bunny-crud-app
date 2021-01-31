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

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new UsersDataService();