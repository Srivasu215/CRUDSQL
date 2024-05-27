let express = require("express");
let app = express();
let bodyparser = require("body-parser");
let port = 5000;
const mysql = require('mysql2');

app.use(express.json());
app.use(bodyparser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gayatri'
});

app.post('/users', (req, res) => {
    const { student_name, contact_no, Branch } = req.body;

    const query = 'INSERT INTO CSE (student_name, contact_no, Branch ) VALUES (?, ?,?)';

    db.execute(query, [student_name, contact_no, Branch], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, student_name, contact_no, Branch });
    });
});

app.get('/users', (req, res) => {

    const query = 'SELECT * FROM CSE';

    db.execute(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(results);
    });
});

app.put('/users/:ID', (req, res) => {
    const { student_name, contact_no, Branch } = req.body;
    let ID = req.params.ID;
    const query = 'UPDATE CSE SET student_name=?, contact_no=?, Branch=? WHERE ID=?';

    db.execute(query, [student_name, contact_no, Branch, ID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, student_name, contact_no, Branch });
    });
});

app.delete('/users/:ID', (req, res) => {
    let ID = req.params.ID;
    const query = 'DELETE FROM CSE WHERE ID=?';

    db.execute(query, [ID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(results);
    });
});



db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

app.listen(port, () => console.log(`server run on port http://localhost:${port}`))