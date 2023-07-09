import express from 'express';
import 'dotenv/config';
import basicAuth from 'express-basic-auth';
import bodyParser from 'body-parser';
import printRoutes from './routes/print.js';

const app = express();

app.use(bodyParser.json());

const user = process.env.API_USERNAME;
const password = process.env.API_PASSWORD;

app.use(
  basicAuth({
    users: { [user]: password },
    challenge: true,
    unauthorizedResponse: 'You are not authorized to access this resource.',
  })
);

// use the routes
app.use('/', printRoutes);

app.listen(4004, () => {
  console.log('Listening on port 4004');
});
