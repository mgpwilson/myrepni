import express from 'express';
import request from 'request-promise';

const router = express.Router();

router.get('/:postcode', (req, res) => {
  const postcode = req.params.postcode;

  request({
    uri: `https://api.parliament.uk/query/constituency_lookup_by_postcode.json?postcode=${postcode}`,
    json: true,
  })
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

module.exports = router;
