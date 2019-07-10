import express from 'express';
import Constituency from '../models/constituency';

const router = express.Router();

router.get('/:postcode', function(req, res) {
  const postcode = req.params.postcode;

  Constituency.retrieveByPostcode(postcode, function(err, constituency) {
    if (err) {
      return res.json(err);
    }
    return res.json(constituency);
  });
});

module.exports = router;
