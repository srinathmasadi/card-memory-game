const jwt = require('jsonwebtoken');
const config = require('config');

//Generate Token

const generateToken = (id) => {
    return jwt.sign({id}, config.get('jwtSecret'),{
        expiresIn:'30d'
    })
}

module.exports=generateToken