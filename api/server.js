// make express server
import express from 'express';
import bodyParser from 'body-parser';
import nonAuthRoutes from './routes/nonAuth.js';

const app = express();
const port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(nonAuthRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`localhost:${port}`)
});