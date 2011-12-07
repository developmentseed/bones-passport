var passport = require('passport'),
    strategy = require('passport-twitter').Strategy;

server = servers.PassportOAuth.extend({
    key: 'twitter',
    strategy: strategy
});
 
