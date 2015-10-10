
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Require used libraries
require('should-http');
var request   = require('supertest-as-promised');
var chai = require('chai');
chai.use(require('chai-json-schema'));

// Requrire custom utils/others
var TargetObjectSchema = require('./../schema/targetObject.js');
var util = require('./util.js');
var constants = require('./constants.js');
var authentication = require('./../domain_objects/authentication.js');


describe('Sanity tests', function(){
    describe('Activity resource', function(){

        var authorizationString; // = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVjOTI5ODc0MTI2NmM4MjFkMWMyMGU3IiwicGFzc3dvcmQiOiI3MTk5NmE4OTAwN2IwZDMwNWZhZmZjYmNkM2ZiZTgxZCIsImlhdCI6MTQ0NDQ3NzQyMCwiZXhwIjoxNDQ0NTYzODIwfQ.kmL5RcD37ml6nVJnOvHwd_7Y8xe0J0lbqMAvLbQe54w';
        var apiUrl = constants.get('BASE_URL');
        var user = constants.get('USER');
        var password = constants.get('PASSWORD');

        // Extending default mocha timeout to 1 min for this suite
        this.timeout(60000);

        request = request(apiUrl);

        beforeEach(function(done){

            if (!authorizationString)
                return authentication.getToken(apiUrl, user, password, function(err, token){
                    if (err) return done(new Error(err));
                    authorizationString = 'Bearer ' + token;
                    done();
                });
            done();
        });

        describe('Detailed info', function(){

    		it('should return "target_object" with correct schema', function(done){
                request
                    .get('/activity')
                    .set('Authorization', authorizationString)
                    .expect(200)
                    .then(function(response){
                        var activities = response.body.data;
                        activities.forEach(function(activity){
                            activity.should.be.an.Object();
                            activity.target_object.should.be.an.Object();
                            chai.expect(activity.target_object).to.be.jsonSchema(TargetObjectSchema);
                        });
                        done();
                    })
                    .catch(done);
            });

        });

        describe('Summary info', function(){

    		it('should return "activity_type" as string', function(done){
                request
                    .get('/activity/summary')
                    .set('Authorization', authorizationString)
                    .expect(200)
                    .then(function(response){
                        var activitySummaries = response.body.data;
                        activitySummaries.forEach(function(activitySummary){
                            activitySummary.activity_type.should.be.String();
                        });
                        done();
                    })
                    .catch(done);
            });

    		it('should return "amount" as number greather or equal to 0', function(done){
                request
                    .get('/activity/summary')
                    .set('Authorization', authorizationString)
                    .expect(200)
                    .then(function(response){
                        var activitySummaries = response.body.data;
                        activitySummaries.forEach(function(activitySummary){
                            activitySummary.amount.should.be.Number();
                            activitySummary.amount.should.be.greaterThanOrEqual(0);
                        });
                        done();
                    })
                    .catch(done);
            });
        });
    });
});
