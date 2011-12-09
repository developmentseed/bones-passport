var path = require('path'),
    fs = require('fs');

Bones.Command.options['passport'] = {
    'title': 'passport=[path]',
    'description': 'Path to passport configuration file.',
    'default': function(options, config) {
        var files = config ? config.files : Bones.Command.options['files'].default();
        return path.join(files, 'passport.json');
    }
};

Bones.Command.augment({
    bootstrap: function(parent, plugin, callback) {
        parent.call(this, plugin, function() {
            try {
                plugin.config.passport = JSON.parse(fs.readFileSync(plugin.config.passport));
            } catch (e) {
                // do nothing
            }

            callback();
        });
    }
});
