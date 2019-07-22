"use strict";

var _express = _interopRequireDefault(require("express"));

var _database = _interopRequireDefault(require("../database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/:constituency', function (req, res) {
  var constituency = req.params.constituency;

  _database["default"].query("SELECT person.forename, person.surname, position, party.name AS party_name, party.color AS party_color, constituency.name AS constituency_name, person.image_url, person.phone AS person_phone, person.email AS person_email, party.phone AS party_phone, party.email AS party_email FROM person, party, constituency WHERE (person.constituency_id=constituency.constituency_id) AND person.party_id = party.party_id AND (constituency.name='".concat(constituency, "' OR constituency.name='Northern Ireland') ORDER BY position, surname"), function (err, data) {
    if (err.error) return res.json(err);
    return res.json(data);
  });
});
module.exports = router;