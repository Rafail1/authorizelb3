module.exports = function(app) {
    var Role = app.models.Role;

    Role.registerResolver('teamMember', function (role, context, cb) {
        return cb(null, false);
    });
};