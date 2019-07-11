import express from 'express';
import Person from '../models/person';

const router = express.Router();

router.get('/:constituency', function(req, res) {
  const constituency = req.params.constituency;
  Person.retrieveAllRepresentatives(constituency, function(err, data) {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

module.exports = router;
