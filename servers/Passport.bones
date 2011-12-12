var passport = require('passport'),
    util = require('util');

// Passport session setup.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, new models.User(obj));
});

server = Bones.Server.extend({
    options: {},
    initialize: function(app) {
        var that = this;

        var options = app.config && app.config.passport && app.config.passport[this.key];
        this.options.sessionKey = 'auth:' + this.key;
        options && _.extend(this.options, options);

        passport.use(new this.strategy(this.options, this.verify));

        this.use(passport.initialize());
        this.use(passport.session());
        this.use(this.router);
        this.get('/auth/' + this.key, passport.authenticate(this.key, 
            { successRedirect: '/', failureRedirect: '/error' }));

        this.get('/logout', function(req, res){
            req.logout();
            res.redirect('/');
        });
    }
});
