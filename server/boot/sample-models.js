
module.exports = function(app) {
    const User = app.models.myUser;
    const Role = app.models.Role;
    const RoleMapping = app.models.RoleMapping;

    User.create([
        {username: 'Raf', email: 'timurvolnii@gmail.com', password: 'timurvolnii'},
        {username: 'Rick', email: 'ya.rafon-92@ya.ru', password: 'suckmybools'}
    ], function(err, users) {
        if (err) throw err;
        console.log('Created users:', users);
        Role.create({
            name: 'admin'
        }, function(err, role) {
            if (err) throw err;
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id
            }, function(err, principal) {
                if (err) throw err;

                console.log('Created principal:', principal);
            });
        });
    }, function (err) {

    });
};