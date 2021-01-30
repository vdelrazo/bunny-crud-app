import "regenerator-runtime/runtime.js";
import _asyncToGenerator from "C:/Users/vdelrazo/Documents/IMPROVE/NOMA/bunny-crud/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "C:/Users/vdelrazo/Documents/IMPROVE/NOMA/bunny-crud/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "C:/Users/vdelrazo/Documents/IMPROVE/NOMA/bunny-crud/node_modules/@babel/runtime/helpers/esm/createClass";
import http from "../http-common";
import Axios from "axios";

var TutorialDataService = /*#__PURE__*/function () {
  function TutorialDataService() {
    _classCallCheck(this, TutorialDataService);
  }

  _createClass(TutorialDataService, [{
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var promise;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Axios.get("https://api-rest-bunny.herokuapp.com/api/tasks");

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

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
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
    key: "delete",
    value: function _delete(id) {
      return http.delete("/tutorials/".concat(id));
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

  return TutorialDataService;
}();

export default new TutorialDataService();