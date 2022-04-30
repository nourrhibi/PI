//Validation
const Joi = require('@hapi/joi');

//register validation
const registerValidation = data => {
    const schema = Joi.object().keys({
        name : Joi.string().min(6).required(),
        email : Joi.string().min(6).required().email(),
        password : Joi.string().required()
      });
     return schema.validate(data);
};

//login validation
const loginValidation = data => {
    const schema = Joi.object().keys({
        name : Joi.string().min(6).required(),
        password : Joi.string().required()
      });
     return schema.validate(data);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;