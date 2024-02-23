const express = require('express');
const router = express.Router();
const { Client } = require('../models');

// GET all clients
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new client
router.post('/clients', async (req, res) => {
  const { email, telefone, nome, dataContratacao, checklist, observacoes } = req.body;
  try {
    const newClient = await Client.create({ email, telefone, nome, dataContratacao, checklist, observacoes });
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a client by ID
router.get('/clients/:id', getClient, (req, res) => {
  res.json(res.client);
});

// Middleware to get a client by ID
async function getClient(req, res, next) {
  try {
    const client = await Client.findByPk(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.client = client;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
