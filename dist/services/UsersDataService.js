import "regenerator-runtime/runtime.js";
import _asyncToGenerator from "C:/Users/vdelrazo/Documents/IMPROVE/NOMA/bunny-crud/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "C:/Users/vdelrazo/Documents/IMPROVE/NOMA/bunny-crud/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "C:/Users/vdelrazo/Documents/IMPROVE/NOMA/bunny-crud/node_modules/@babel/runtime/helpers/esm/createClass";
import http from "../http-common";
import axios from "axios";
var usersAPI = "https://api-rest-bunny.herokuapp.com/api/users";

var UsersDataService = /*#__PURE__*/function () {
  function UsersDataService() {
    _classCallCheck(this, UsersDataService);
  }

  _createClass(UsersDataService, [{
    key: "getAllUsers",
    value: function () {
      var _getAllUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var promise;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return axios.get(usersAPI);

              case 2:
                promise = _context.sent;
                return _context.abrupt("return", promise);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAllUsers() {
        return _getAllUsers.apply(this, arguments);
      }

      return getAllUsers;
    }()
  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var promise;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return axios.delete("".concat(usersAPI, "/").concat(id));

              case 2:
                promise = _context2.sent;
                return _context2.abrupt("return", promise);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function deleteUser(_x) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }()
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