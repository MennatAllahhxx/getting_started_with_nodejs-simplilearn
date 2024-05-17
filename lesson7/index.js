const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: "hi hello"
    });
});

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'jack',
        email: 'jack@gmail.com'
    };

    jwt.sign({user: user}, 'secretKey', (err, token) => {
        res.json({
            token
        });
    })
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "posts created",
                authData
            });
        }
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(3000, (req, res) => {
    console.log('app running on port 3000');
})