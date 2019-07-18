import express from 'express';
import Constituency from '../models/constituency';
import request from 'request-promise';

const router = express.Router();

router.get('/:postcode', (req, res) => {
  const postcode = req.params.postcode;

  // console.log('gpt here');

  // request({
  //   uri: `https://api.parliament.uk/query/constituency_lookup_by_postcode.json?postcode=${postcode}`,
  //   json: true,
  // }).then(resp => {
  //   console.log(resp);
  // });

  // Constituency.retrieveByPostcode(postcode, function(err, constituency) {
  //   if (err) {
  //     return res.json(err);
  //   }
  //   return res.json(constituency);
  // });

  Constituency.retrieveByPostcode(postcode, (err, constituency) => {
    if (err) {
      return res.json(err);
    }
    return res.json(constituency);
  });

  // Constituency.retrieveByPostcode
});

module.exports = router;
