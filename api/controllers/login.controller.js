const { response } = require("express");
const { json } = require("express/lib/response");
const { stringify } = require("nodemon/lib/utils");
const { googleVerify } = require("../../middlewares/google-verify");
const LoginService = require('../../services/login.service');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

//usar code para enviar un codigo propio de respuesta con tres letras que representen el flujo en el que estoy: LGN = LoGiN y un numero de orden 001/002
const verifyUserExistMockedResponse = async( req, res = response ) => {
    const loginService = new LoginService();
    const {email, username} = req.body;
    //filtrar para obtener respuesta success o error
    console.log(req.get('is-registered'));

    if(req.get('is-registered') === stringify(true)){
        const verifyUserExistResponse = await loginService.verifyUserExistMockedResponseSuccess(email, username);
        console.log(verifyUserExistResponse);
        if(verifyUserExistResponse.isRegistered){
            res
            .status(200)
            .json({
                message: 'user found',
                payload: verifyUserExistResponse,
                data_received: {email, username}
            });
        }else{
            res
            .status(404)
            .json({
                code: 'LOG001',
                message: 'user not found',
                payload: verifyUserExistResponse,
                data_received: {email, username}
            });
        }
    }else{
        const verifyUserExistResponse = await loginService.verifyUserExistMockedResponseError(email, username);
        console.log(verifyUserExistResponse);
        if(verifyUserExistResponse.isRegistered){
            res
            .status(200)
            .json({
                message: 'user found',
                payload: verifyUserExistResponse,
                data_received: {email, username}
            });
        }else{
            res
            .status(404)
            .json({
                code: 'LOG001',
                message: 'user not found',
                payload: verifyUserExistResponse,
                data_received: {email, username}
            });
        }
    }
}

const googleSignIn = async( req, res = response) => {
    const { id_token } = req.body;

    try{
        const googleUser = await googleVerify(id_token);
        console.log(googleUser);

        //aca habria que ver en la base de datos si existe o no. si no existe lo creo con data que viene y lo guardo asi le genera un id la BD para luego con ese id generar el JWT
        //y si existe devuelvo data
        //definir modelo del usuario con un campo que sea tipo de registro y ahi va google o facebook y que tenga estado cada usuario
        //para el logout directo desde el front
        res.json({
            message: 'Authentication success',
            id_token,
            email: googleUser.userEmail
        });
    }catch(error){
        json.status(400).json({
            isAuth: false,
            message: 'Token cannot be verified',
            code: 'LGN001'
        });
    }
}

const facebookSignIn = ( req, res = response ) => {
    
    try{
        passport.serializeUser(function(user, done) {
            done(null, user);
          });
          passport.deserializeUser(function(user, done) {
            done(null, user);
          });
          
          passport.use(new FacebookStrategy({
              clientID: process.env.FACEBOOKIDAPP,
              clientSecret: process.env.FACEBOOKSECRETKEY,
              callbackURL: "http://localhost:8080/api/v1/login/facebook-sign-in/callback",
              profileFields: ['id', 'displayName', 'name', 'emails']
              },function(accessToken, refreshToken, profile, done){
                  console.log(profile);
                  console.log('access token: '+accessToken);
                  console.log('refresh token: '+refreshToken);
                  return done(null, profile);
                  }
              )
          );
    }catch( error ){
        console.log(error);
        res.status(400).json({
            isAuth: false,
            message: 'Authentication with Facebook was failed',
            code: 'LGN002'
        });
    }
}

module.exports = {
    verifyUserExistMockedResponse,
    googleSignIn,
    facebookSignIn
}