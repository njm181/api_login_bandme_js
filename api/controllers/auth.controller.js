const { response } = require('express');
const { generateJWT } = require('../../helpers/generate-jwt');

const authLogin = async(req, res = response) => {

    const { correo, password } = req.body;

    try{
        //Respuestas hardcodeadas para pruebas iniciales

        //verificar si el email existe en la db
        if(correo != "test1@test.com"){
         return res.status(400).json({
             msg: 'User does not exist'
         });   
        }

        //verificar si el usuario esta activo en la db
        const estado = true;
        if(!estado){
            return res.status(400).json({
                msg: 'User is disabled'
            });   
           }

        //verificar la password usar bcrypjs
        // bcryptjs es una lib para encriptar la password antes de guardarla y luego se usa para comparar las password ingresadas con las que hay en la DB
        //const validatePassword = bcryptjs.compareSync(password, usuarioTraidoDeLaBd.password);
        if(password != "123456"){
            return res.status(400).json({
                msg: 'Incorrect password'
            });   
        }

        //generar el JWT
        const token = await generateJWT( '000111') //000111(simula ser un id de la base de datos) lo que se va a guardar en el payload del jwt es el id del usuario que traigo de la bd

        //tambien devolver el objeto usuario con sus datos
        res.json({
            msg: 'auth login ok - it is valided!',
            token
        });

        //en lugar de guardarlo en la db al JWT, cuando necesite usarlo el front para pegarle a algun endpoint, recibimos ese JWT y comprobamos si nosotros lo firmamos
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'Something went wrong'
        });
    }

    
}

module.exports = {
    authLogin
}