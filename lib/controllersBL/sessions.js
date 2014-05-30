var unirest = require('unirest');
var async = require('async');
var utils = require('../utils');
//var crypto = require('crypto');

var Cryptr = require("cryptr");



var path = 'http://127.0.0.1:3636/';
var path_BL = 'http://127.0.0.1:8600/';



/*
function createSessionId(user,password){
   var date = new Date();
   var shasum = crypto.createHash('sha1');
   var tempStr = date.getSeconds() + password + date.getMinutes() + user + date.getDate() + date.getHours() + (Math.random(1258)).toString();
   
   shasum.update(tempStr);
   var d = shasum.digest('hex');

   return d;
}
*/

function createSessionId(jsonSession) {
    //console.log("ENCRIPTAR");
    var ip = jsonSession.ip;
    cryptr = new Cryptr(ip);
    var encryptedString = cryptr.encrypt(JSON.stringify(jsonSession));
    return encryptedString;
    /*
    //desencriptar
    var encryptedString1 = cryptr.decrypt(encryptedString);
    console.log("desencryptedString " + encryptedString1);
    */
}



exports.createSession= function(request,response){
    var usrname  =  request.body.usrname;
    var password =  request.body.password;
    console.log('createSession() invoked' + request);
    sessionData = {};

    /* for demo propouse.... MUST change with DB data!! */
    /*
         crear un string que concatene segundo,clave, minuto, usuario,  minuto,dia,hora + random*1--1000
         aplicar algun hash*md5, sha1, whiverpool, des]

    */
    //request.session.data.sUser.push() 

    if( ((usrname == 'asegreda') && (password == 'wertyuiop')) || ((usrname == 'sbrenes') && (password == '123')) ){
        sessionData = {
            "status":200,
            "body":{
                   "sessionID":1345960490495034,
                   "firstName":"Juan Andres",
                   "lastName": "Segreda Johanning",
                   "menu":{
                        "CR": {
                          "subItems": [
                            {
                              "identy": "Herramientas",
                              "subItems": [
                                {
                                  "identy": "Perfiles",
                                  "action": "profiles"
                                },
                                {
                                  "identy": "Reglas",
                                  "action": "Rules"
                                },
                                {
                                  "identy": "RiesgoTransacciones",
                                  "action": "TransactionRisk"
                                },
                                {
                                  "identy": "EstadisticasUso",
                                  "action": "UseStatistics"
                                },
                                {
                                  "identy": "NivelRiesgo",
                                  "action": "RiskLevel"
                                }
                              ]
                            },
                            {
                              "identy": "Consultas",
                              "subItems": [
                                {
                                  "identy": "Generales",
                                  "action": "Generals"
                                },
                                {
                                  "identy": "Excepciones",
                                  "action": "Exceptions"
                                },
                                {
                                  "identy": "Reportes",
                                  "action": "Reports"
                                },
                                {
                                  "identy": "Transacciones",
                                  "action": "Transactions"
                                }
                              ]
                            },
                            {
                              "identy": "Investigacion",
                              "subItems": [
                                {
                                  "identy": "ExpedienteExcepciones",
                                  "action": "ExpeExepciones"
                                },
                                {
                                  "identy": "InvestigacionTrans",
                                  "action": "Invest"
                                }
                              ]
                            }
                          ]
                        },
                        "Security": {
                          "subItems": [
                            {
                              "identy": "secAdmin",
                              "subItems": [
                                {
                                  "identy": "Users",
                                  "action": "users"
                                },
                                {
                                  "identy": "Rols",
                                  "action": "rols"
                                }
                              ]
                            },
                            {
                              "identy": "My Account",
                              "subItems": [
                                {
                                  "identy": "ChangePsw",
                                  "actionType": "ChgPassword",
                                  "action": "profiles"
                                }
                              ]
                            }
                          ]
                        }
                    }
             }
        };
    }else{
       sessionData = {'status' : 404};
    }

    response.json(sessionData);
}





//crear menu
/*
var getMenu = function(object){
  var menu = {};
  menu = {
    "status":200,
    "body" : {
        "session": object.session,
        "idUser": object.id,
        "user": object.user,
        "firstName": object.name,
        "lastName": "lastName",
        "menu": {
        }
    } 
  }

 //response.json(menu);
  return menu;
};
*/

/*
var loginSession = function (request, response){
    var sessionData = {};
    var objSession = request.body;

    console.log("REQUEST" + JSON.stringify(objSession));
    async.series([
        function(callback){
            unirest.post(path_BL + 'users/' + request.body.id + '/g')
            .headers({ 'Accept': 'application/json' })
            .type("json")
            .send(request)
            .end(function (response) {
              console.log("RESP "+JSON.stringify(response.body.body));            
                //var nameUser = response.body.name;
                //var user = response.body.user;
                callback();
              });
          }
        ],
        function(error) {
            if (error) {
                response.send(utils.defineResult("", "ERROR", "", ((error.message == notFound) ? notFound : error)));
            } else {
                response.send(utils.defineResult("200", "OK", getMenu(objSession), ""));
            }
        }
    );

}
*/


exports.create =  function(request, response){
  console.log('Login');
  
  var objSession = {};
  var session = "";
  var menu = {};
  //console.log("request " + JSON.stringify(request.body));

  async.series([
      function(callback){
        unirest.post(path + 'Sentinel/v1.0/login')
        .headers({ 'Accept': 'application/json' })
        .type("json")
        .send(JSON.stringify(request.body))
        .end(function (response) {
            objSession = response.body;
            //console.log("objSession " + JSON.stringify(response.body.body));
            callback();
          });
      },
      function(callback){
        if(objSession.statusCode != 200) return callback(error);

        var jsonSession = {"ip": request.body.ip,"sessionId" : objSession.body.session, "user": objSession.body.user};
        //console.log("objSession " + JSON.stringify(jsonSession));
        session = createSessionId(jsonSession);
        callback();
      },
      function(callback){
          menu = {
            "status": "200",
            "body": {
              "sessionID": session,
              "idUser": objSession.body.id,
              "user": objSession.body.user,
              "firstName": objSession.body.name,
              "lastName": objSession.body.lastName,
              "menu": {
                "CR": {
                  "subItems": [
                    {
                      "identy": "Herramientas",
                      "subItems": [
                        {
                          "identy": "Perfiles",
                          "action": "profiles"
                        },
                        {
                          "identy": "Reglas",
                          "action": "Rules"
                        },
                        {
                          "identy": "RiesgoTransacciones",
                          "action": "TransactionRisk"
                        },
                        {
                          "identy": "EstadisticasUso",
                          "action": "UseStatistics"
                        },
                        {
                          "identy": "NivelRiesgo",
                          "action": "RiskLevel"
                        }
                      ]
                    },
                    {
                      "identy": "Consultas",
                      "subItems": [
                        {
                          "identy": "Generales",
                          "action": "Generals"
                        },
                        {
                          "identy": "Excepciones",
                          "action": "Exceptions"
                        },
                        {
                          "identy": "Reportes",
                          "action": "Reports"
                        },
                        {
                          "identy": "Transacciones",
                          "action": "Transactions"
                        }
                      ]
                    },
                    {
                      "identy": "Investigacion",
                      "subItems": [
                        {
                          "identy": "ExpedienteExcepciones",
                          "action": "ExpeExepciones"
                        },
                        {
                          "identy": "InvestigacionTrans",
                          "action": "Invest"
                        }
                      ]
                    }
                  ]
                },
                "Security": {
                  "subItems": [
                    {
                      "identy": "secAdmin",
                      "subItems": [
                        {
                          "identy": "Users",
                          "action": "users"
                        },
                        {
                          "identy": "Rols",
                          "action": "rols"
                        }
                      ]
                    },
                    {
                      "identy": "My Account",
                      "subItems": [
                        {
                          "identy": "ChangePsw",
                          "actionType": "ChgPassword",
                          "action": "profiles"
                        }
                      ]
                    }
                  ]
                }
              }
            }
          };
          callback();
      }
    ],
    function(error) {
        if (error) {
            response.send(utils.defineResult("", "ERROR", "", ((error.message == notFound) ? notFound : error)));
        } else {
            //console.log("object" + objSession);
           // getMenu(objSession, response);
           // loginSession(objSession, response);
            response.json(menu);
        }
    }
  );
}


exports.delete =  function(request, response){
  console.log('Logout');
 
  var objSession = {};
  async.series([
      function(callback){
        unirest.delete( path + 'Sentinel/v1.0/logout')
        .headers({ 'Accept': 'application/json' })
        .type("json")
        .send(JSON.stringify(request.body))
        //.send(objMock)
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


exports.activeSessions =  function(request, response){
  console.log('Active sessions');

  var objSession = {};
  async.series([
      function(callback){
        unirest.get(path + 'Sentinel/v1.0/Users/'+ request.params.id +'/sessions')
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

exports.inactiveSessions =  function(request, response){
  console.log('Inactive sessions');
  var objSession = {}; 
  
  async.series([
      function(callback){
        unirest.delete(path + 'Sentinel/v1.0/Users/'+ request.params.id +'/sessions')
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


/*
var listUser = function(objetoParam){
  var cant;
  async.series([
    function(callback){
        unirest.get(path + 'Sentinel/v1.0/Users/')
        .headers({'Accept': 'application/json'})
        .send(request)
        .end(function(response){
            objSession = response.body;
            callback();
        })
    }
    ])
}


var listPermission = function(objetoParam){
  var cant;
  async.series([
   
    function(callback){
        unirest.get(path + 'Sentinel/v1.0/Users/')
        .headers({'Accept': 'application/json'})
        .send(request)
        .end(function(response){
            objSession = response.body;
            callback();
        })
    }
    ])
}
*/

