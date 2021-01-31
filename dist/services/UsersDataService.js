function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import http from "../http-common";
import axios from "axios";
var usersAPI = "https://api-rest-bunny.herokuapp.com/api/users";

var UsersDataService = /*#__PURE__*/function () {
  function UsersDataService() {
    _classCallCheck(this, UsersDataService);
  }

  _createClass(UsersDataService, [{
    key: "getAllUsers",
    value: async function getAllUsers() {
      var promise = await axios.get(usersAPI);
      return promise;
    }
  }, {
    key: "deleteUser",
    value: async function deleteUser(id) {
      var promise = await axios.delete("".concat(usersAPI, "/").concat(id));
      return promise;
    }
  }, {
    key: "get",
    value: function get(id) {
      return http.get("/tutorials/".concat(id));
    }
  }, {
    key: "create",
    value: function create(data) {
      return http.post("/tutorials", data);
    }
  }, {
    key: "update",
    value: function update(id, data) {
      return http.put("/tutorials/".concat(id), data);
    }
  }, {
    key: "deleteAll",
    value: function deleteAll() {
      return http.delete("/tutorials");
    }
  }, {
    key: "findByTitle",
    value: function findByTitle(title) {
      return http.get("/tutorials?title=".concat(title));
    }
  }]);

  return UsersDataService;
}();

export default new UsersDataService();