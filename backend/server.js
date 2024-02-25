import express from 'express';
import cors from 'cors';
import clientRouter from './routes/clientRoutes.js';
import { sql } from './db.js'; // Importe a função sql do seu arquivo db.js

const app = express();
app.use(cors());
app.use(express.json());

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

// Define as rotas para manipular os clientes
app.use((req, res, next) => {
  req.sql = sql; // Adicione o objeto sql (conexão com o banco de dados) ao objeto de solicitação
  next();
});
app.use(clientRouter);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
