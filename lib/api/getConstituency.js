"use strict";

var _express = _interopRequireDefault(require("express"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/:postcode', function (req, res) {
  var postcode = req.params.postcode;
  (0, _requestPromise["default"])({
    uri: "https://api.parliament.uk/query/constituency_lookup_by_postcode.json?postcode=".concat(postcode),
    json: true
  }).then(function (data) {
    return res.json(data);
  })["catch"](function (err) {
    return res.json(err);
  });
});
module.exports = router;