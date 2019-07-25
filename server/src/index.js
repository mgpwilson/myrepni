import 'dotenv/config';
import serverless from 'serverless-http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import db from './database';

const app = express();

const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://myrepni.com',
    'https://myrepni.com',
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/getConstituency', require('./api/getConstituency'));
app.use('/getPeople', require('./api/getPeople'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
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
