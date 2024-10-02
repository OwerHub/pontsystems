const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8000;
const SECRET_KEY = 'very_secret_key';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log('username:', username);

    
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
