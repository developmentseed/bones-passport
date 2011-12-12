Bones Passport
--------------
Provides a pluggable authentication middleware server that uses
the [Passport](https://github.com/jaredhanson/passport) library.

Supports dummy, twitter, oauth1 and oauth2 authentication strategies.

### Usage

Mount any of the supported authentication strategies in your bones middleware
server :


    // filename: servers/Middleware.bones
    var express = require('express');

    servers.Middleware.augment({
        initialize: function(parent, app) {
            parent.call(this, app);
            // session support is required, and is the responsibility
            // of your application to enable.
            this.use(express.session({ secret: 'secret' }));

            this.use(new servers.PassportTwitter(app));
        }
    });


Configuration settings for the authentication strategies are stored in a 
`passport.json` file in the root of your application, for example: 


    {
        "twitter" : {
            "callbackURL": "http://mydomain:3000/auth/twitter/callback",
            "consumerKey": "get from dev.twitter.com",
            "consumerSecret": "get from div.twitter.com"
        }
    }


You can initiate login by directing your user to `/auth/twitter` in this case,
although each authentication strategy has it's own url, such as `/auth/dummy`
and `/auth/oauth2` for those relevant strategies.

Bones-passport has a basic User model that will be instanced into `req.user`
by passport when a user has been logged in, and you can test for a logged in
user with `req.isAuthenticated`.

#### Authors

- [Adrian Rossouw](http://github.com/Vertice)

