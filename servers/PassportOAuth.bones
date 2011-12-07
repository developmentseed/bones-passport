var passport = require('passport'),
    strategy = require('passport-oauth').OAuthStrategy;

server = servers.Passport.extend({
    key: 'oauth',
    strategy: strategy,
       
    verify: function(token, tokenSecret, profile, done) {
        return done(null, profile);
    }

});

server.augment({
    initialize: function(parent, app) {
        this.options.callbackURL = "http://localhost:3000/auth/" + this.key + "/callback";

        parent.call(this, app);

        this.get('/auth/' + this.key + '/callback', passport.authenticate(this.key), function(req, res) {
            res.redirect('/');
        });
    }
});
