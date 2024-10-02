const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const SECRET_KEY = 'your_secret_key'; 

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    credentials: true 
}));

app.use(express.json()); // JSON body parser

app.post('/login', (req, res) => {
    console.log('Request body:', req.body);
    const token = jwt.sign({ username: req.body.username || 'guest' }, SECRET_KEY, { expiresIn: '1h' });
    console.log('Token:', token);
    return res.status(200).json({ token });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
