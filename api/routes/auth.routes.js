const { Router } = require('express');
const { check } = require('express-validator');
const { authLogin } = require('../controllers/auth.controller');
const { validateJWT, validarCampos, tieneRol, esAdminRole } = require("../../middlewares");

const router = Router();

router.post('/', [
    validateJWT,
    //esAdminRole,
    //tieneRole('ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos
    ], authLogin);


module.exports = router;
