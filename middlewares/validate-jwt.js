const { response, request } = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = async( req = request, res = response, next) => {
    //el token viene dentro del header x-token = token
    //leer los headers

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try{
        //verificar jwt
        const { uid } = jwt.verify( token, process.env.SECRETPRIVATEKEY );
        //console.log(payload);
        //lo inserto dentro del objeto request para poder llevarlo y usarlo en los controllers
        req.uid = uid;
        //obtengo el uid luego de la validacion del jwt que viene del validate-jwt middleware
        //esto haria en el controller
        //const { uid } = req.uid;
        //console.log(req.uid);
        //validar si el usuario que en teoria obtengo de la db existe, tal vez no existe y const usuario seria undefined
        const usuario = true;
        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en db'
            });
        }

        //leer el usuario que corresponde al uid de la bd  y lo almaceno en la req.usuario
        // validar si el usuario con ese uid no ha sido borrado o estado en false
        const estado = true;
        if( !estado ){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado en false'
            });
        }

        //req.usuario = await get usuarioObtenido y autenticado
        //luego en el controller para obtenerlo -> const userAutenticado = req.usuariop

        next();
    } catch(error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }

}

module.exports = {
    validateJWT
}