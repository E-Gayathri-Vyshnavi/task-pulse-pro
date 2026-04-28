const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Crucial for Vercel/Railway deployment
});

app.get('/api/tasks', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
    res.json(rows);
  } catch (err) { res.status(500).json(err); }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    const { rows } = await pool.query('INSERT INTO tasks (title) VALUES ($1) RETURNING *', [title]);
    res.status(201).json(rows[0]);
  } catch (err) { res.status(500).json(err); }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));