var passport = require('passport'),
    strategy = require('passport-oauth').OAuthStrategy;

server = servers.Passport.extend({
    key: 'oauth',
    strategy: strategy,
       
    verify: function(token, tokenSecret, profile, done) {
        // Temporarily put the oauth details into the user object, to allow us to
        // get them into the session.
        _.extend(profile, { oauth: { token: token, token_secret: tokenSecret } });

        return done(null, profile);
    }

});

server.augment({
    initialize: function(parent, app) {
        this.options.callbackURL = "http://localhost:3000/auth/" + this.key + "/callback";

        parent.call(this, app);

        this.get('/auth/' + this.key + '/callback', 
            passport.authenticate(this.key), function(req, res, next) {
                // add the query parameters to the user object.
                // This should be done by the oauth library, but for some reason
                // it doesn't behave correctly with some variables.
                // see: https://github.com/jaredhanson/passport-oauth/issues/1
                _.extend(req.user, req.query);

                // we don't want the query argument oauth_token
                // in the user record.
                delete req.user.oauth_token;

                // Move the oauth credentials into the session proper,
                // not the user record. This means we can push the
                // user record to the client without leaking secrets.
                req.session.oauth = req.user.oauth;
                delete req.user.oauth;

                // TODO: decide wether we want to redirect always.
                // this is currently quite hard to bypass.
                res.redirect('/');

            });
    }
});
