const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No token provided or token does not start with Bearer');
        return res.status(401).json({ message: 'unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Decoded:', decoded);
        req.user = { name: decoded.name };
        next();
    } catch (error) {
        console.log('Token verification failed:', error);
        res.status(401).json({ message: 'unauthorized' });
    }
};

module.exports = authenticate;