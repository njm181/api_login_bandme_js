const { response } = require("express");

//lo ejecuto luego del middleware que verifica el jwt
//esto es para saber si es admin o no para ejecutar ciertos endpoints como delete users

const esAdminRole = ( req, res = response, next ) => {

    if( !req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, username } = req.usuario;

    if( !rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${username} no es administrador - no puede hacer eso`
        });
    }

    next();
}

const tieneRole = ( ...roles ) => { //...roles para recibir n cantidad de argumentos
    return ( req, res = response, next ) => {
        //console.log(roles, req.usuario.rol) muestra el array de roles que recibo y el rol del usuario autenticado
        if( !req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }
    
        if( !roles.includes( req.usuario.rol ) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }

        

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}