 const jwt = require('jsonwebtoken')
const  authenticateToken=(req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
       next();
    } catch (error) {
        console.log('Invalid token:', error.message);
        res.status(401).json({ error: 'Invalid token' });
    }
}

const generateToken=(userId)=>{

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    //console.log(token);
    return token;
  }

  module.exports = { authenticateToken,generateToken};