"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CONNECTION_STRING = process.env.DATABASE_URL;
var SSL = process.env.NODE_ENV === 'production';

var Database =
/*#__PURE__*/
function () {
  function Database() {
    _classCallCheck(this, Database);

    this._pool = new _pg.Pool({
      connectionString: CONNECTION_STRING,
      ssl: SSL
    });

    this._pool.on('error', function (err, client) {
      console.error('Unexpected error on idle PostgreSQL client.', err);
      process.exit(-1);
    });
  }

  _createClass(Database, [{
    key: "query",
    value: function query(_query) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this._pool.connect(function (err, client, done) {
        if (err) throw err;
        var params = args.length === 2 ? args[0] : [];
        var callback = args.length === 1 ? args[0] : args[1];
        client.query(_query, params, function (err, res) {
          done();

          if (err) {
            console.log(err.stack);
            return callback({
              error: 'Database error.'
            }, null);
          }

          callback({}, res.rows);
        });
      });
    }
  }, {
    key: "end",
    value: function end() {
      this._pool.end();
    }
  }]);

  return Database;
}();

var _default = new Database();

exports["default"] = _default;