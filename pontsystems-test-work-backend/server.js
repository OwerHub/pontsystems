const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
//TODO: move the key to .env file
// NOTE: This a very basic backend, just for testing purposes.
const SECRET_KEY = 'really_secret_key'; 

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    credentials: true 
}));

app.use(express.json()); 

app.post('/login', (req, res) => {
    const token = jwt.sign({ username: req.body.username || 'guest' }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ token });
});

app.get('/test', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    return res.status(200).json({ message: 'Hello, There!' ,
         token:token || undefined});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
