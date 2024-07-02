const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

let targetNumber = Math.floor(Math.random() * 100) + 1;

app.get('/guess', (req, res) => {
    const userGuess = parseInt(req.query.number, 10);
    let message = '';

    if (isNaN(userGuess)) {
        message = 'Please provide a valid number!';
    } else if (userGuess > targetNumber) {
        message = 'Too high!';
    } else if (userGuess < targetNumber) {
        message = 'Too low!';
    } else {
        message = 'Congratulations! You guessed the number!';
        targetNumber = Math.floor(Math.random() * 100) + 1; // Reset the game
    }

    res.json({ message });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});