
var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var bodyParser = require('body-parser');

var currentSession = require('./lib/controllersBL/sessions');
var currentUser = require('./lib/controllersBL/users');
var currentRole = require('./lib/controllersBL/roles');
var currentPermision = require('./lib/controllersBL/permissions');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.get('/', function(req, res) {
  var welcome = 'Bussines Logic NG - Prototipo<br/><br/>Servicios expuestos :<br/><br/>';
  
  welcome += '  ROLES <br/>';
  welcome += '/roles/getList<br/>';
  welcome += '/roles/edit<br/>';
  welcome += '/roles/delete<br/>';
  welcome += '/roles/create<br/>';
  welcome += '/roles/get<br/>';

  welcome += '<br/>  USERS <br/>';
  welcome += '/users/getList<br/>';
  welcome += '/users/create<br/>';
  welcome += '/users/delete<br/>';
  welcome += '/users/edit<br/>';
  welcome += '/users/get<br/>';

  welcome += '<br/>  SESSIONS <br/>';
  welcome += '/session/createSession<br/>';
  welcome += '/session/deleteSession<br/>';

  res.send(welcome);
});


//manejo de sessiones
app.post('/session/createSession', currentSession.createSession);
app.post('/session/create', currentSession.create);
app.post('/session/deleteSession', currentSession.delete);


//manejo de usuarios
app.post('/users/getList', currentUser.getUsers);
app.post('/users/create', currentUser.putUsers);
app.post('/users/delete', currentUser.delUsers);
app.post('/users/edit', currentUser.postUsers);
app.post('/users/get', currentUser.getUsersbyId);


//manejo de roles
app.post('/roles/getList', currentRole.getRoles);
app.post('/roles/create', currentRole.putRoles);
app.post('/roles/delete', currentRole.delRoles);
app.post('/roles/edit', currentRole.postRoles);
app.post('/roles/get', currentRole.getRolesbyId);
app.post('/users/getRoles', currentRole.getAllRoles);

app.post('/reglas/getList', getReglas);

//MOCK
/*
function getPermisos(request,response){
  console.log('getPermisos() invoked MOCK');

  response.json([
    {
      "field"   : "permisos",
      "type"    : "treeview",
      "label"   : "Permisos",
      "actions"   : [
        {
          "func"    : "p1" ,  
          "text"  : "Permiso 1",
          "url"   : "",
          "actions" :[
              {"func": "a" ,  "text" : "permiso a", "url" : ""},
              {"func": "b" ,  "text" : "permiso b", "url" : ""} 

          ]
        },
        {
          "func": "p2" ,  
          "text" : "Permiso 2",
          "url"   : "",
          "actions" :[
              {
                "func": "2a" ,  
                "text" : "permiso 2a",
                "url" : "",
                "actions" :[
                  {"func": "a.1" ,  "text" : "a.1", "url" : ""},
                  {"func": "a.2" ,  "text" : "a.2", "url" : ""},
                  {
                    "func": "a.4" , 
                    "text" : "a.4",
                    "url" : "",
                    "actions" :[
                      {"func": "a.4.1" ,  "text" : "a.4.1", "url" : ""},
                      {
                        "func": "a42" ,
                        "text" : "a42",
                        "url" : "",
                        "actions" :[
                          {"func": "a.4.2.1" ,  "text" : "a.4.2.1", "url" : ""},
                          {"func": "a.4.2.2" ,  "text" : "a.4.2.2", "url" : ""}
                        ]
                      }
                    ]
                  } 
                ]
              }
          ]
        }
      ]
    }
  ]);
}
*/
function getReglas(request,response){
    console.log('getReglas invoked');   
    response.json([
        {
         "id"   : 001,
         "name"   : "Regla 1",
         "description" : "Descripcion de la regla 1",
         "status" : "Active"
        },
        {
         "id"   : 002,
         "name"   : "Regla 2",
         "description" : "Descripcion de la regla 2",
         "status" : "Inactive"
        },
        {
         "id"   : 003,
         "name"   : "Regla 3",
         "description" : "Descripcion de la regla 3",
         "status" : "Active"
        },
        {
         "id"   : 004,
         "name"   : "Regla 4",
         "description" : "Descripcion de la regla 4",
         "status" : "Inactive"
        },
        {
         "id"   : 005,
         "name"   : "Regla 5",
         "description" : "Descripcion de la regla 5",
         "status" : "Active"
        },
        {
         "id"   : 70,
         "name"   : "Regla 70",
         "description" : "Descripcion de la regla 70",
         "status" : "Active"
        },
        {
         "id"   : 10,
         "name"   : "Regla 10",
         "description" : "Descripcion de la regla 10",
         "status" : "Active"
        },
        {
         "id"   : 30,
         "name"   : "Regla 30",
         "description" : "Descripcion de la regla 30",
         "status" : "Inctive"
        }
    ]);
}


//app.post('/users/getP', currentPermision.getPermissionsPerUser);
app.post('/users/getPermisos', currentPermision.getPermissions);
//app.post('/users/getP', getPermisos);




/*
//manejo de permisos
app.post('/roles/:id/permissions/g', currentPermision.getPermissionsPerRole);
app.post('/roles/:id/permissions/p', currentPermision.postPermissionsPerRole);
app.post('/roles/:id/permissions/pt', currentPermision.putPermissionsPerRole);
app.post('/roles/:id/permissions/d', currentPermision.delPermissionsPerRole);




app.post('/users/:id/permissions/p', currentPermision.postPermissionsPerUser);
app.post('/users/:id/permissions/pt', currentPermision.putPermissionsPerUser);
app.post('/users/:id/permissions/d', currentPermision.delPermissionsPerUser);

*/

 
server.listen(8600, function() {
    console.log("Nodo ejecutandose en el puerto 8600")
});
       
