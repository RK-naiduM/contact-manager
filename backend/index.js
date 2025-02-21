const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import database connection

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to read JSON body in requests

// 🟢 Add a new contact
app.post('/contacts', (req, res) => {
    const { name, email, phone } = req.body;
    console.log("Received data:", { name, email, phone }); // Log received data

    const sql = 'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)';
    db.query(sql, [name, email, phone], (err, result) => {
        if (err) {
            console.error("Error inserting contact:", err); // Log error if any
            return res.status(500).json({ error: err.message });
        }
        console.log("Contact inserted with ID:", result.insertId); // Log successful insertion
        res.json({ message: 'Contact added successfully', id: result.insertId });
    });
});

// 🟡 Get all contacts
app.get('/contacts', (req, res) => {
    const sql = 'SELECT * FROM contacts';
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching contacts:", err); // Log error if any
            return res.status(500).json({ error: err.message });
        }
        console.log("Contacts fetched:", results); // Log fetched contacts
        res.json(results);
    });
});

// 🔵 Get a single contact by ID
app.get('/contacts/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Fetching contact with ID: ${id}`); // Log contact ID being fetched

    const sql = 'SELECT * FROM contacts WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching contact:", err); // Log error if any
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            console.log("Contact not found!"); // Log if no contact found
            return res.status(404).json({ message: 'Contact not found' });
        }
        console.log("Contact found:", result[0]); // Log found contact
        res.json(result[0]);
    });
});

// 🟠 Update a contact
app.put('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    console.log(`Updating contact with ID: ${id}`); // Log contact ID being updated

    const sql = 'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?';
    db.query(sql, [name, email, phone, id], (err, result) => {
        if (err) {
            console.error("Error updating contact:", err); // Log error if any
            return res.status(500).json({ error: err.message });
        }
        console.log("Contact updated successfully:", result); // Log update success
        res.json({ message: 'Contact updated successfully' });
    });
});

// 🔴 Delete a contact
app.delete('/contacts/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Deleting contact with ID: ${id}`); // Log contact ID being deleted

    const sql = 'DELETE FROM contacts WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting contact:", err); // Log error if any
            return res.status(500).json({ error: err.message });
        }
        console.log("Contact deleted successfully:", result); // Log delete success
        res.json({ message: 'Contact deleted successfully' });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
