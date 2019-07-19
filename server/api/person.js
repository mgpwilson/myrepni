import express from 'express';
import db from '../database';

const router = express.Router();

router.get('/:constituency', function(req, res) {
  const constituency = req.params.constituency;

  db.query(
    `SELECT forename, surname, position, party_name, party_color, constituency_name, image_url, party.phone_number, party.email_address FROM person, party, constituency WHERE (person.constituency_id=constituency.constituency_id) AND person.party_id = party.party_id AND (constituency_name='${constituency}' OR constituency_name='Northern Ireland') ORDER BY position, surname`,
    (err, data) => {
      if (err.error) return res.json(err);
      return res.json(data);
    }
  );
});

module.exports = router;
