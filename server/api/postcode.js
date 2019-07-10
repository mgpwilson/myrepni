import express from 'express';
import Postcode from '../models/postcode';

const router = express.Router();

router.get('/', function(req, res) {
  Postcode.retrieveAll(function(err, postcode) {
    if (err) {
      return res.json(err);
    }
    return res.json(postcode);
  });
});

router.post('/', function(req, res) {
  const postcode = req.body.postcode;

  Postcode.insert(postcode, function(err, result) {
    if (err) {
      return res.json(err);
    }
    return res.json(result);
  });
});

module.exports = router;
