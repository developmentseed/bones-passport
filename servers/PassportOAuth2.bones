var passport = require('passport'),
    strategy = require('passport-oauth').OAuth2Strategy;

server = servers.PassportOAuth.extend({
    key: 'oauth2',
    strategy: strategy
});
