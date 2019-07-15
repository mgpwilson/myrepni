import db from '../database';

class Person {
  static retrieveAllRepresentatives(postcode, callback) {
    db.query(
      `SELECT forename, surname, position, party_name, party_color, constituency_name, image_url, phone_number, email_address FROM person, party, constituency WHERE (person.constituency_id=constituency.constituency_id) AND person.party_id = party.party_id AND (constituency_name='${postcode}' OR constituency_name='Northern Ireland') ORDER BY position, surname`,
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}

export default Person;
