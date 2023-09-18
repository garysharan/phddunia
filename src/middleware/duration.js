const jwt = require('jsonwebtoken');
const Course = require('../db/models/user');
const duration = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Course.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error(); 
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({error:"Unauthorized request"});
    }
    
}
 

module.exports = duration;