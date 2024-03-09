import express from 'express';
import cors from 'cors';
import clientRouter from './routes/clientRoutes.js';
import { sql } from './db.js'; 

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;


app.use((req, res, next) => {
  req.sql = sql; 
  next();
});
app.use(clientRouter);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
