const { Router } = require('express');
const { check } = require('express-validator');
const { verifyUserExistMockedResponse, googleSignIn, facebookSignIn } = require('../controllers/login.controller');
const passport = require('passport');
const router = Router();
require('../../helpers/passport');
 
router.get('/', verifyUserExistMockedResponse)

router.post('/google-sign-in', [
    check('id_token', 'Google id_token is required').not().isEmpty()
] ,googleSignIn);

router.get('/facebook-sign-in', passport.authenticate('facebook'), facebookSignIn)

router.get('/facebook-sign-in/callback', passport.authenticate('facebook',{
    successRedirect: '/api/v1/login/dashboard',
    failureRedirect: 'login-failure'
}));

router.get('/dashboard', (req, res) => {
    res.send("acceso a dashboard");
});

router.get('/login-failed', (req, res) => {
    res.send('No se pudo acceder con facebook');
});
 
module.exports = router;