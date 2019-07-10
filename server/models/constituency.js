import request from 'request-promise';

const API_KEY = process.env.API_KEY;

class Constituency {
  static retrieveByPostcode(postcode, callback) {
    request({
      uri: `https://www.theyworkforyou.com/api/getConstituency?key=${API_KEY}&postcode=${postcode}&output=js`,
      json: true,
    }).then(function(res) {
      callback(res);
    });
  }
}

export default Constituency;
