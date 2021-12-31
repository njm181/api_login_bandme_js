/* const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

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
 */