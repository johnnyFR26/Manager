import express from 'express';
const router = express.Router();
import { sql } from '../db.js'; // Importe a função sql do seu arquivo db.js

// GET all clients
router.get('/clients', async (req, res) => {
  try {
    const clients = await req.sql`SELECT * FROM clients`;
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new client
router.post('/clients', async (req, res) => {
  const { email, telefone, name, date, checklist, observation } = req.body;
  try {
    const newClient = await req.sql`
      INSERT INTO clients (email, telefone, nome, data_contratacao, checklist, observacoes)
      VALUES (${email}, ${telefone}, ${name}, ${date}, ${checklist}, ${observation})
      RETURNING *`;
    res.status(201).json(newClient[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// GET a client by ID
router.get('/clients/:id', async (req, res) => {
  try {
    const client = await req.sql`SELECT * FROM clients WHERE id = ${req.params.id}`;
    if (client.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client[0]);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//module.exports = router;
export default router;
