var async = require('async');
var unirest = require('unirest');


/*
var mockPermissions = {"body":[{"func":"permiso11","actions":["SELECT","UPDATE","DELETE","INSERT"]},{"func":"permiso22","actions":["INSERT","SELECT","UPDATE"]},{"func":"permiso33","actions":["INSERT","UPDATE"]},{"func":"permiso44","actions":["INSERT","UPDATE"]}]};
var mockSession = {}; 
var mockNewPermission =  {};
*/

var path = 'http://127.0.0.1:3636';

//roles
exports.getPermissionsPerRole = function(request, response){
  console.log('Get permissions per role');
  
  var objSession = {};
  async.series([
      function(callback){
        unirest.get(path + '/Sentinel/v1.0/Roles/'+ request.params.id +'/permissions')
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

exports.postPermissionsPerRole = function(request, response){
  console.log('Post permissions per role');

  var objSession = {};
  async.series([
      function(callback){
        unirest.post(path + '/Sentinel/v1.0/Roles/'+ request.params.id +'/permissions')
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
            response.send(objSession);
        }
    }
  );
}

exports.putPermissionsPerRole = function(request, response){
  console.log('Put permissions per role');
 
  var objSession = {};
  async.series([
      function(callback){
        unirest.put(path + '/Sentinel/v1.0/Roles/'+ request.params.id +'/permissions')
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
            response.send(objSession);
        }
    }
  );

}

exports.delPermissionsPerRole = function(request, response){
  console.log('delete permissions per role');

  //console.log('REQUEST' + JSON.stringify(request.body));
  var objSession = {};
  async.series([
      function(callback){
        unirest.delete(path + '/Sentinel/v1.0/Roles/'+ request.params.id +'/permissions')
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
            response.send(objSession);
        }
    }
  );
}



//usuarios
exports.getPermissionsPerUser = function(request, response){
  console.log('Get permissions per User');

  var objSession = {};
  async.series([
      function(callback){
        unirest.get(path + '/Sentinel/v1.0/Users/'+ request.body +'/permissions')
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

exports.postPermissionsPerUser = function(request, response){
  console.log('Post permissions per User');

  console.log("PERMISSION "+ JSON.stringify(request.body));
  var objSession = {};
  async.series([
      function(callback){
        unirest.post(path + '/Sentinel/v1.0/Users/'+ request.params.id +'/permissions')
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
            response.send(objSession);
        }
    }
  );
}

exports.putPermissionsPerUser = function(request, response){
  console.log('Put permissions per User');

  var objSession = {};
  async.series([
      function(callback){
        unirest.put(path + '/Sentinel/v1.0/Users/'+ request.params.id +'/permissions')
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
            response.send(objSession);
        }
    }
  );
}

exports.delPermissionsPerUser = function(request, response){
  console.log('delete permissions per User');
    
  var objSession = {};
  async.series([
      function(callback){
        unirest.delete(path + '/Sentinel/v1.0/Users/'+ request.params.id +'/permissions')
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
            response.send(objSession);
        }
    }
  );
}


exports.getPermissions = function(request, response){
  console.log('Get all permissions');

  var objSession = {};
  var permissionList = [];
  var permissionResult = [];

  async.series([
      function(callback){
        unirest.get(path + '/Sentinel/v1.0/Permissions')
        .headers({ 'Accept': 'application/json' })
        .type("json")
        .send(request)
        .end(function (response) {
            permissionList = response.body
            //console.log("RES" + JSON.stringify(permissionList));
            callback();
          });
      }
      ,
      function(callback){
            permissionList.forEach(function(permiso) {
              var PermissionElement = {};
              PermissionElement.func = permiso.func;
              PermissionElement.text = permiso.text;
              PermissionElement.url = permiso.func;
              PermissionElement.actions = permiso.actions;              
              permissionResult.push(PermissionElement);
          });
          callback();
      },
      function(callback){
        objSession = [{
                      "field": "permisos",
                      "type": "treeview",
                      "label": "Permisos",
                      "actions": permissionResult
                    }];
          callback();
      }
      
    ],
    function(error) {
        if (error) {
            response.send(utils.defineResult("", "ERROR", "", ((error.message == notFound) ? notFound : error)));
        } else {
            //console.log("response" + permissionList );
            response.json(objSession);
        }
    }
  );
}
