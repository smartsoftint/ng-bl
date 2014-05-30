var async = require('async');
var unirest = require('unirest');

var path = 'http://127.0.0.1:3636/';


exports.getRoles = function(request, response){
  console.log('Get Roles');
  
  var objSession = {};
  async.series([
      function(callback){
        unirest.get(path + 'Sentinel/v1.0/Roles')
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

exports.postRoles = function(request, response){
  console.log('Post Roles');

 console.log("REQUEST " + JSON.stringify(request.body));
  var objSession = {};
  async.series([
      function(callback){
        unirest.post(path + 'Sentinel/v1.0/Roles')
        .headers({ 'Accept': 'application/json' })
        .type("json")
        .send(JSON.stringify(request.body))
        .end(function (response) {
            console.log("RESPONSE " + JSON.stringify(response.body));
            objSession = response.body;
            callback();
          });
      }
    ],
    function(error) {
        if (error) {
            response.send(utils.defineResult("", "ERROR", "", ((error.message == notFound) ? notFound : error)));
        } else {
            console.log("OBJ_SESSION " + JSON.stringify(objSession));
            response.send(objSession);
        }
    }
  );

}

exports.putRoles = function(request, response){
  console.log('Put Roles');
 console.log("REQUEST " + JSON.stringify(request.body));
  var objSession = {};
  async.series([
      function(callback){
        unirest.put(path + 'Sentinel/v1.0/Roles')
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
          console.log("OBJ_SESSION " + JSON.stringify(objSession));
            response.send(objSession);
        }
    }
  );

}

exports.delRoles = function(request, response){
  console.log('Delete Roles');

  //console.log("REQUEST " + JSON.stringify(request.body));
  var objSession = {};
  async.series([
      function(callback){
        unirest.delete(path + 'Sentinel/v1.0/Roles')
        .headers({ 'Accept': 'application/json' })
        .type("json")
        .send(JSON.stringify(request.body))
        .end(function (response) {
            objSession = response.body;
            //console.log("OBJ_Session " + JSON.stringify(response.body));
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


//REST de roles por id

exports.getRolesbyId = function(request, response){
  console.log('Get Roles by id');

  var objSession = {};
  async.series([
      function(callback){
        unirest.get(path + 'Sentinel/v1.0/Roles/'+ request.body.id)
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

exports.postRolesbyId = function(request, response){
  console.log('Post Roles by id');

  //console.log("REQUEST " + JSON.stringify(request.body));
  var objSession = {};
  async.series([
      function(callback){
        unirest.post(path + 'Sentinel/v1.0/Roles/'+ request.body.id)
        .headers({ 'Accept': 'application/json' })
        .type("json")
        .send(JSON.stringify(request.body))
        .end(function (response) {
            //console.log("RESPONSE " + JSON.stringify(response.body));
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

exports.delRolesbyId = function(request, response){
  console.log('Delete Roles by id');

  var objSession = {};
  async.series([
      function(callback){
        unirest.delete(path + 'Sentinel/v1.0/Roles/'+ request.params.id)
        .headers({ 'Accept': 'application/json' })
        //.type("json")
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


exports.getAllRoles = function(request, response){
  console.log('Get Roles');
  
  var rolesList = [];
  var rolesResult = [];
  var objSession = [];
  async.series([
      function(callback){
        unirest.get(path + 'Sentinel/v1.0/Roles')
        .headers({ 'Accept': 'application/json' })
        .send(request)
        .end(function (response) {
            rolesList = response.body.body;
            callback();
          });
      },
      function(callback){
            rolesList.forEach(function(role) {
              var roleElement = {};
              roleElement.value = role.id;
              roleElement.text = role.description;
              rolesResult.push(roleElement);
          });
          callback();
      },
      function(callback){
        objSession = [{
                      "field": "roles",
                      "type": "checklist",
                      "label": "Roles",
                      "data": rolesResult
                    }
                  ];
          callback();
      }
    ],
    function(error) {
        if (error) {
            response.send(utils.defineResult("", "ERROR", "", ((error.message == notFound) ? notFound : error)));
        } else {
            response.json(objSession);
        }
    }
  );

}
