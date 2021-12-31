const express = require("express");
const cors = require('cors');
const helmet = require("helmet");
require('dotenv').config();
const passport = require("passport");

const rootPath = '/api/v1/login';
const rootAuthPath = '/auth'

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.initPath = rootPath;
        this.authPath = rootPath + rootAuthPath;
        this.initMiddlewares();
        this.routes();

    }

    initMiddlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(helmet());
        //this.app.use(passport.session({ secret: 'mysecret' }));
        this.app.use(passport.initialize());
        //this.app.use(passport.session());
    }

    routes(){
        //Middware que se carga cuando pasa una solicitud por esta ruta. Para utilizar las request que estan dentro de Routes
        this.app.use(this.authPath, require('../api/routes/auth.routes'));
        this.app.use(this.initPath, require('../api/routes/login.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor is running on port: '+ this.port)
        });
    }
}

module.exports = Server;