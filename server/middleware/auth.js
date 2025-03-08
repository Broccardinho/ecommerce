const jwt = require('jsonwebtoken');
const { ACCESS_LEVEL_ADMIN } = require('../config/constants');

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'Auth failed'
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded
        next()
    }catch (err){
        return res.status(401).json({
            success: false,
            message: 'Auth failed'
        })
    }
}

module.exports.isAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized - no token provided' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded.accessLevel === ACCESS_LEVEL_ADMIN) {
            return next()
        }
        return res.status(403).json({ error: 'Forbidden - admin access required' })
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized - invalid token' })
    }
}