import request from 'request-promise';

class Constituency {
  static retrieveByPostcode(postcode, callback) {
    request({
      uri: `https://api.parliament.uk/query/constituency_lookup_by_postcode.json?postcode=${postcode}`,
      json: true,
    }).then(res => {
      callback(res);
    });
  }
}

export default Constituency;
