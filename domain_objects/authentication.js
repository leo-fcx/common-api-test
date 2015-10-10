var request   = require('supertest');

module.exports = {
    getToken: function(host, user, password, cb){
        request(host)
            .post('/authenticate')
            .send({
                email: user,
                password: password
            })
            .end(function(err, res){
                if (err || res.statusCode == 401)
                    return cb('Cannot get TOKEN for user: ' + user + ' (host: ' + host + ')');

                cb(undefined, res.body.token);
            });
    }
}
