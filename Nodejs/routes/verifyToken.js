const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('authtoken');
    if(!token) return res.status(401).send('Access denied');

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET); // verified traja3lena il info (user id )
        req.user=verified;   
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}