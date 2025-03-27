require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the request from the request header
    const token = req.header('Authorization')?.split(' ')[1];

    console.log('Token:', token);

    if(!token) {
        console.log('No token provided');
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }
        try{
          //Verify the token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          console.log('Decoded token:', decoded);
          req.user = decoded;
          next();
        }
        catch (err) {
            console.log('Token verificsation failed', err.message);
            res.status(400).json({message: 'Invalid token.'});
        }
}

module.exports = authMiddleware;