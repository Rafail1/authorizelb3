'use strict';

const DEFAULT_RESET_PW_TTL = 15 * 60; // 15 mins in seconds
const senderAddress = 'karliksmith@ya.ru';
module.exports = function (MyUser) {

    MyUser.resetPasswordSend = function (email, cb) {
        cb = cb || utils.createPromiseCallback();
        const UserModel = this;
        const ttl = UserModel.settings.resetPasswordTokenTTL || DEFAULT_RESET_PW_TTL;
        if (typeof email !== 'string') {
            var err = new Error(g.f('Email is required'));
            err.statusCode = 400;
            err.code = 'EMAIL_REQUIRED';
            return cb(err);
        }
        const where = {email: email};
        UserModel.findOne({where: where}, function (err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb({error: true, code: 'user_not_found'})
            }
            if (UserModel.settings.emailVerificationRequired && !user.emailVerified) {
                return cb({error: true, code: 'email_not_verified'})
            }
            user.createAccessToken(ttl, onTokenCreated);

            function onTokenCreated(err, accessToken) {
                if (err) {
                    return cb(err);
                }
                MyUser.app.models.Email.send({
                    to: email,
                    from: senderAddress,
                    subject: 'Восстановление пароля',
                    html: 'Для восстановления пароля перейди по <a href="http://localhost:4200/auth/password-reset/' + accessToken.id + '">ссылке</a>'
                }, function (err) {
                    if (err) {
                        if (err.responseCode === 554) {
                            return cb({error: true, code: 'message_go_spam'})
                        } else {
                            return cb({error: true, code: 'message_send_error'})
                        }
                    }
                    cb(null, {code: 'verify_message_sent'});
                });
            }
        });
    };
    MyUser.resetMyPassword = function (options, cb) {
        MyUser.app.models.MyAccessToken.resolve(options.access_token, function (err, token) {
            if (err || !token) {
                return cb(null, {error: true, code: 'token_invalid'});
            }
            token.validate(function (err, isValid) {
                if (err || !isValid) {
                    return cb(null, {error: true, code: 'token_invalid'});
                }
                MyUser.findById(token.userId, function (err, myUser) {
                    myUser.updateAttribute('password', options.newPassword, function (err) {
                        myUser._invalidateAccessTokensOfUsers()
                        if (err) {
                            return cb(null, {error: true, code: 'password_change_error'});
                        }
                        return cb(null, {code: 'password_changed'});
                    })
                })
            })


        })
    };
    MyUser.prototype.verify = function (options, cb) {
        const user = this;
        MyUser.generateVerificationToken(user, {}, function (err, token) {
            user.verificationToken = token;
            user.save(function (err) {
                if (err) {
                    console.log(user.verificationToken);
                    return cb(err, null);
                }
                options.html = options.html.replace('{token}', token);
                options.html = options.html.replace('{uid}', user.id);
                MyUser.app.models.Email.send({
                    to: options.to,
                    from: options.from,
                    subject: options.subject,
                    html: options.html
                }, function (err) {
                    if (err) return cb(err, null);
                    cb(null, {status: 200});

                });
            });

        })
    };
    MyUser.resend = function (email, cb) {
        MyUser.findOne({where: {email: email}}, function (err, user) {
            if (err) {
                return cb(null, {code:'server_error', error:true});
            }
            if(!user) {
                return cb(null, {code:'user_not_found', error:true});
            }
            if(user.emailVerified) {
                return cb(null, {code:'email_already_confirmed', error:true});
            }
            const options = verifyEmailOptions(user);
            user.verify(options, function (err, response) {
                if (err) {
                    MyUser.deleteById(user.id);
                    return cb(null, {code:'server_error', error:true});
                }
                cb(null, {code:'verify_message_sent'});
            });
        })
    };
    MyUser.getMyRole = function (req, res, cb) {
        const RoleMapping = MyUser.app.models.RoleMapping;
        const Role = MyUser.app.models.Role;
        Role.getRoles({principalType: RoleMapping.USER, principalId: req.accessToken.userId},
            {returnOnlyRoleNames: true}, function (err, roles) {
            if(err) {
                return cb(err);
            }
            cb(null,roles);
        });
    };
    MyUser.remoteMethod('resend', {
        accepts: {arg: 'email', type: 'string', http:{source:'body'}},
        returns: { type: 'object', root: true }
    });
    MyUser.remoteMethod('getMyRole', {
        accepts: [
            {arg: 'req', type: 'object', 'http': {source: 'req'}},
            {arg: 'res', type: 'object', 'http': {source: 'res'}}
        ],
        returns: { type: 'object', root: true }
    });
    MyUser.remoteMethod('resetPasswordSend', {
        accepts: {arg: 'email', type: 'string', http:{source:'body'}},
        returns: { type: 'object', root: true }
    });

    MyUser.remoteMethod('resetMyPassword', {
        accepts: {arg: 'options', type: 'object', http:{source:'body'}},
        returns: { type: 'object', root: true }
    });

    MyUser.afterRemote('confirm', function (context, user, next) {
        context.result = {code: 'confirmed'};
        next();
    });

    MyUser.afterRemoteError('login', function (context, next) {
        const email = context.args.credentials.email;
        MyUser.findOne({where: {email: email}}, function (err, user) {
            if (err || !user) {
                next({error: true, code: "login_failed"});
            } else {
                if (!user.emailVerified) {
                    next({error: true, code: "email_not_verified"});
                } else {
                    next({error: true, code: "login_failed"});
                }
            }
        })
    });

    MyUser.afterRemoteError('confirm', function (context, next) {
        if (context.error.statusCode === 400) {
            next({error: true, code: 'token_invalid'});
        } else {
            next({error: true, code: 'server_error'});
        }
    });
    MyUser.afterRemoteError('create', function (context, next) {
        if (context.error.statusCode === 422) {
            next({error: true, code: 'email_exists'})
        } else if (context.error.responseCode === 554) {
            next({error: true, code: 'message_go_spam'})
        } else {
            next({error: true, code: 'register_error'})
        }
    });
    MyUser.afterRemote('create', function (context, user, next) {
        const options = verifyEmailOptions(user);
        user.verify(options, function (err, response) {
            if (err) {
                MyUser.deleteById(user.id);
                return next(err);
            }
            context.result = {code: 'registered'};
            next();
        });
    });
};
 function verifyEmailOptions(user) {
    return {
        to: user.email,
        from: senderAddress,
        html: 'Для подтверждения регистрации перейдите по ссылке <a href="http://localhost:4200/auth/confirm/{token}/{uid}">подтвердить</a>',
        subject: 'Спасибо за регистрацию',
    }
};