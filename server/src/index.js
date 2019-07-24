import 'dotenv/config';
import path from 'path';
import serverless from 'serverless-http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import db from './database';

const app = express();

const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://myrepni.s3-website-eu-west-1.amazonaws.com',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/constituency', require('./api/getConstituency'));
app.use('/api/people', require('./api/getPeople'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
  console.log(app.get('env'));
});

db.query('SELECT NOW()', (err, res) => {
  if (err.error) {
    return console.log(err.error);
  }
  console.log(
    `PostgreSQL connected: ${process.env.AWS_DATABASE_URL} ${res[0].now}.`
  );
});

export var handler = serverless(app);

// user: mrbigwilson password: mrbigwilson
