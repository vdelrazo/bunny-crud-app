import axios from "axios";

const tasksAPI = "https://api-rest-bunny.herokuapp.com/api/tasks";

class TasksDataService {
  async getAllTasks() {
    const promise = await axios.get(tasksAPI);
    return promise;
  }

  async getTasksByUser(id) {
    const promise = await axios.get(`${tasksAPI}/${id}`);
    return promise;
  }

  async deleteTask(id) {
    const promise = await axios.delete(`${tasksAPI}/${id}`);
    return promise;
  }

  async updateTask(id, description, state) {
    const promise = await axios.put(`${tasksAPI}/${id}`, `{"description": "${description}", "state": ${state}}`,  {
      headers: {
          'Content-Type': 'application/json',
      }
    });
    return promise;
  }

  async createTask(id, description, state) {
    const promise = await axios.post(tasksAPI, `{"description": "${description}", "state": ${state}, "user_id": "${id}"}`,  {
      headers: {
          'Content-Type': 'application/json',
      }
    });
    return promise;
  }
}

export default new TasksDataService();