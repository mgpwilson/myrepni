import db from '../database';

class Postcode {
  static retrieveAll(callback) {
    db.query('SELECT code FROM postcode', function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
  static insert(postcode, callback) {
    db.query('INSERT INTO postcode (code) VALUES ($1)', [postcode], function(
      err,
      res
    ) {
      if (err.error) {
        return callback(err);
      }
      callback(res);
    });
  }
}

export default Postcode;
