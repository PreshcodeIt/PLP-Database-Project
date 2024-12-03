const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Routes
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/employees', (req, res) => {
    const { name, position, salary } = req.body;
    const sql = 'INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)';
    db.query(sql, [name, position, salary], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, name, position, salary });
    });
});

app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, position, salary } = req.body;
    const sql = 'UPDATE employees SET name = ?, position = ?, salary = ? WHERE id = ?';
    db.query(sql, [name, position, salary, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Employee updated successfully.' });
    });
});

app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM employees WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Employee deleted successfully.' });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
