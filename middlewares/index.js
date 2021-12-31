//el html viene a buscar primero este archivo por default

const validateCampos = require('../middlewares/validar-campos');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');

module.exports = {
    ...validateCampos,
    ...validateJWT,
    ...validateRoles
}