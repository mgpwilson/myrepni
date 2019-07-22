"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _database = _interopRequireDefault(require("./database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ENV = process.env.NODE_ENV;
var PORT = process.env.PORT || 5000;
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use('/api/constituency', require('./api/getConstituency'));
app.use('/api/people', require('./api/getPeople'));

if (ENV === 'production') {
  app.use(_express["default"]["static"](_path["default"].join(__dirname, '../client/build')));
  app.use(function (req, res) {
    return res.sendFile(_path["default"].join(__dirname, '../client/build/index.html'));
  });
}

app.listen(PORT, function () {
  console.log("Server listening on port ".concat(PORT, "..."));
});

_database["default"].query('SELECT NOW()', function (err, res) {
  if (err.error) {
    return console.log(err.error);
  }

  console.log("PostgreSQL connected: ".concat(res[0].now, "."));
});

var _default = app;
exports["default"] = _default;