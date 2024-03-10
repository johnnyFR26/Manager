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
      INSERT INTO clients (email, telefone, name, date, checklist, observation)
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
// DELETE a client by ID
router.delete('/clients/:id', async (req, res) => {
  try {
    const deletedClient = await req.sql`
      DELETE FROM clients
      WHERE id = ${req.params.id}
      RETURNING *`;

    if (deletedClient.length === 0) {
      return res.status(404).json({ message: 'Client not found for deletion' });
    }

    res.json({ message: 'Client deleted successfully', deletedClient: deletedClient[0] });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//module.exports = router;
export default router;
