import express from 'express';
import db from '../database';

const router = express.Router();

router.get('/:constituency', function(req, res) {
  const constituency = req.params.constituency;

  db.query(
    `SELECT person.forename, person.surname, position, party.name AS party_name, party.color AS party_color, constituency.name AS constituency_name, person.image_url, person.phone AS person_phone, person.email AS person_email, party.phone AS party_phone, party.email AS party_email FROM person, party, constituency WHERE (person.constituency_id=constituency.constituency_id) AND person.party_id = party.party_id AND (constituency.name='${constituency}' OR constituency.name='Northern Ireland') ORDER BY position, surname`,
    (err, data) => {
      if (err.error) return res.json(err);
      return res.json(data);
    }
  );
});

module.exports = router;
