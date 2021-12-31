const { validationResult } = require('express-validator');


const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    /* const { uid } = req.uid;

    console.log(req.uid); */

    next();
}



module.exports = {
    validarCampos
}
