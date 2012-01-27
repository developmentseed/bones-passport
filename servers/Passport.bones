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

        // store the strategy instance in a separate variable, so we can access it easily.
        var strategy = new this.strategy(this.options, this.verify);

        // mount the passport strategy.
        passport.use(strategy);

        // give the request access to the strategy instance
        // to allow re-use of the oauth instance to make requests.
        this.use(function(req, res, next) {
            req.passportStrategy = strategy;
            next();
        });

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
