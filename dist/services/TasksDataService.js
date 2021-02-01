function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import axios from "axios";
var tasksAPI = "https://api-rest-bunny.herokuapp.com/api/tasks";

var TasksDataService = /*#__PURE__*/function () {
  function TasksDataService() {
    _classCallCheck(this, TasksDataService);
  }

  _createClass(TasksDataService, [{
    key: "getAllTasks",
    value: async function getAllTasks() {
      var promise = await axios.get(tasksAPI);
      return promise;
    }
  }, {
    key: "getTasksByUser",
    value: async function getTasksByUser(id) {
      var promise = await axios.get("".concat(tasksAPI, "/").concat(id));
      return promise;
    }
  }, {
    key: "deleteTask",
    value: async function deleteTask(id) {
      var promise = await axios.delete("".concat(tasksAPI, "/").concat(id));
      return promise;
    }
  }, {
    key: "updateTask",
    value: async function updateTask(id, description, state) {
      var promise = await axios.put("".concat(tasksAPI, "/").concat(id), "{\"description\": \"".concat(description, "\", \"state\": ").concat(state, "}"), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return promise;
    }
  }, {
    key: "createTask",
    value: async function createTask(id, description, state) {
      var promise = await axios.post(tasksAPI, "{\"description\": \"".concat(description, "\", \"state\": ").concat(state, ", \"user_id\": \"").concat(id, "\"}"), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return promise;
    }
  }]);

  return TasksDataService;
}();

export default new TasksDataService();