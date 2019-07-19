import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import { json as _json } from 'body-parser';

import db from './database';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(_json());

app.use('/api/constituency', require('./api/constituency'));
app.use('/api/person', require('./api/person'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

db.query('SELECT NOW()', (err, res) => {
  if (err.error) {
    return console.log(err.error);
  }
  console.log(`PostgreSQL connected: ${res[0].now}.`);
});

export default app;
