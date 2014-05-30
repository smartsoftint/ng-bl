var unirest = require('unirest');
var async = require('async');
var utils = require('../utils');

var path = 'http://127.0.0.1:3636/';


exports.getUsers = function(request, response){
  console.log('Get users');

  var objSession = {};
  async.series([
      function(callback){
        unirest.get(path + 'Sentinel/v1.0/Users')
        .headers({ 'Accept': 'application/json' })
        .send(request)
        .end(function (response) {
          //console.log("response " + JSON.stringify(response.body));
            objSession = response.body;
            callback();
          });
      }
    ],
    function(error) {
        if (error) {
            response.send(utils.defineResult("", "ERROR", "", ((error.message == notFound) ? notFound : error)));
        } else {
            response.json(objSession.body);
        }
    }
  );

}

exports.postUsers = function(request, response){
  console.log('Post users');

  console.log(JSON.stringify(request.body));
  var objSession = {};
  async.series([
      function(callback){
        unirest.post(path + 'Sentinel/v1.0/Users')
        .headers({ 'Accept': 'application/json' })
        .type("json")
        .send(JSON.stringify(request.body))
        .end(function (response) {
            objSession = response.body;
            callback();
          });
      }
    ],
    function(error) {
        if (error) {
            response.send(utils.defineResult("", "ERROR", "", ((error.message == notFound) ? notFound : error)));
        } else {
            console.log(JSON.stringify(objSession));
            response.send(objSession);
        }
    }
  );
}

exports.putUsers = function(request, response){
  console.log('Put users');
 // console.log('req 1 ' + JSON.stringify(request.body));
  var objSession = {};
  var objPermissions = request.body.permissions;
 // console.log('req 2 ' + JSON.stringify(request.body.body));
 // console.log('req 3 ' + JSON.stringify(objPermissions));

  async.series([
      function(callback){
        unirest.put(path + 'Sentinel/v1.0/Users')
        .headers({ 'Accept': 'application/json' })
        .type("json")
        .send(JSON.stringify(request.body))
        .end(function (response) {
            objSession = response.body;
            callback();
          });
      }
    ],
    function(error) {
        if (error) {
            response.send(utils.defineResult("", "ERROR", "", ((error.message == notFound) ? notFound : error)));
        } else {
//            console.log("+++++++++++++" + objSession.body);
            response.json(objSession.body);
        }
    }
  );
}

exports.delUsers = function(request, response){
  console.log('delete users');

  var objSession = {};
  async.series([
      function(callback){
        unirest.delete(path + 'Sentinel/v1.0/Users')
        .headers({ 'Accept': 'application/json' })
        .type("json")
        .send(JSON.stringify(request.body))
        .end(function (response) {
            objSession = response.body;
            callback();
          });
      }
    ],
    function(error) {
        if (error) {
            response.send(utils.defineResult("", "ERROR", "", ((error.message == notFound) ? notFound : error)));
        } else {
            response.send(objSession.statusCode);
        }
    }
  );
}



//REST de usuarios por id

exports.getUsersbyId = function(request, response){
  console.log('Get users by id');
 //console.log('id'+ request.params.id);
  //console.log('requestBODY '+ JSON.stringify(request.body.id));

//console.log("request " + request.body);

  var objSession = {};
  async.series([
      function(callback){
        unirest.get(path + 'Sentinel/v1.0/Users/'+ request.body)
        .headers({ 'Accept': 'application/json' })
        .send(request)
        .end(function (response) {
         //console.log('response' + JSON.stringify(objSession));
            objSession = response.body;
            
            callback();
          });
      }
    ],
    function(error) {
        if (error) {
            response.send(utils.defineResult("", "ERROR", "", ((error.message == notFound) ? notFound : error)));
        } else {
            //console.log('response' + JSON.stringify(objSession));
            response.json(objSession.body);
        }
    }
  );
}

exports.postUsersbyId = function(request, response){
  console.log('Post users by id' );
  console.log('POST USER' + request);
  var objSession = {};
  async.series([
      function(callback){
        unirest.post(path + 'Sentinel/v1.0/Users/'+ request.body.id)
        .headers({ 'Accept': 'application/json' })
        .type("json")
        .send(JSON.stringify(request.body))
        //.send(request)
        .end(function (response) {
            objSession = response.body;
            callback();
          });
      }
    ],
    function(error) {
        if (error) {
          response.send(utils.defineResult("", "ERROR", "", ((error.message == notFound) ? notFound : error)));
        } else {
            response.send(objSession);
        }
    }
  );
}

/*
var delUsersbyId = function(request, response){
  console.log('Delete users by id');

  var objSession = {};
  async.series([
      function(callback){
        unirest.delete(path + 'Sentinel/v1.0/Users/'+ request.params.id)
        .headers({ 'Accept': 'application/json' })        
        .send(request)
        .end(function (response) {
            objSession = response.body;
            callback();
          });
      }
    ],
    function(error) {
        if (error) {
            response.send(utils.defineResult("", "ERROR", "", ((error.message == notFound) ? notFound : error)));
        } else {
            response.send(objSession);
        }
    }
  );
}


//REST de usuarios por query
exports.getUsersByQuery = function(request, response){
  console.log('Get users by query');

  var objSession = {};
  async.series([
      function(callback){
        unirest.get(path + 'Sentinel/v1.0/Users/query/by')
        .headers({ 'Accept': 'application/json' })
        .send(request)
        .end(function (response) {
            objSession = response.body;
            callback();
          });
      }
    ],
    function(error) {
        if (error) {
            response.send(utils.defineResult("", "ERROR", "", ((error.message == notFound) ? notFound : error)));
        } else {
            response.send(objSession);
        }
    }
  );
}

exports.delUsersByQuery = function(request, response){
  console.log('Delete users by query');
  
  var objSession = {};
  async.series([
      function(callback){
        unirest.delete(path + 'Sentinel/v1.0/Users/query/by')
        .headers({ 'Accept': 'application/json' })
        .send(request)
        .end(function (response) {
            objSession = response.body;
            callback();
          });
      }
    ],
    function(error) {
        if (error) {
            response.send(utils.defineResult("", "ERROR", "", ((error.message == notFound) ? notFound : error)));
        } else {
            response.send(objSession);
        }
    }
  );
}
*/
