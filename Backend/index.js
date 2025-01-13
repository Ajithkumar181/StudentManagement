const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS package

// Initialize app and database connection
const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ajithvictus@rmkec',
    database: 'studentdb'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Enable CORS for all origins or a specific origin
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests only from React app running on localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

// Endpoint to add a new student
app.post('/add-student', (req, res) => {
    const { firstName, lastName, email, dateOfBirth, personalNumber, parentContact, address } = req.body;

    const query = `
        INSERT INTO students (FirstName, LastName, Email, DateOfBirth, PersonalNumber, ParentContact, Address)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.query(query, [firstName, lastName, email, dateOfBirth, personalNumber, parentContact, address], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).send({ message: 'Failed to add student' });
            return;
        }
        res.status(200).send({ message: 'Student added successfully', studentID: result.insertId });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
