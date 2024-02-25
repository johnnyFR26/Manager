import express from 'express';
//import { sequelize } from '@neonjs/core';
import cors from 'cors';
import clientRouter from './routes/clientRoutes.js';
import { Client } from './models';

const app = express();
app.use(cors());
app.use(express.json());

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

// Conecta-se ao banco de dados Neon
sequelize.sync()
  .then(() => {
    console.log('Connected to Neon database');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Define as rotas para manipular os clientes
app.use(clientRouter);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
