var app = require('express')();
var fs=require('fs');
var server = require('http').Server(
	//{	key: fs.readFileSync('cps490fa18-team0.key'),
  	//	cert: fs.readFileSync('cps490fa18-team0.crt')},
    app);
var session = require("express-session")({
    secret: "$()F!*",
    resave: true,
    saveUninitialized: true,
 	cookie: {maxAge: 24*60*60*1000}
  }),
  sharedsession = require("express-socket.io-session"); 
var inputIs = require('input-is');
var xssFilters = require('xss-filters');

// Attach session
app.use(session);
// Share session with io sockets
app.get('/', function (request, response) {
	//Testing: display the session information 	
	if (request.session.requests) {
    	request.session.requests++
  	} else {
    	request.session.requests = 1
  	}
	console.log('# of requests in the current session: ' + request.session.requests );
  	response.sendFile(__dirname + '/messenger-client.html');
});

server.listen(8080);
console.log("chatserver is listening at port 8080");

var io = require('socket.io'); 
var socketio = io.listen(server);
socketio.set('origins', '*:*');
socketio.use(sharedsession(session,{autoSave:true}));



var chats = [];
var Users = [];
var IDs  = [];
var userList = [];
var chatID = Math.random().toString(36).replace('0.', "");

console.log("socketio is listening on http server 8080");
socketio.on("connection", function (client) {
    console.log("New socketio client is connected, clientID= " + client.id);
    if(client.handshake.session.authenticated) {
        client.authenticated=true;
        client.username = client.handshake.session.username;
        client.emit("authenticated");
    }
	client.on("register",function(username,password){
		if(DataLayer.addUser(username,password)){
			console.log("Lab 3 - [Phu Phung] Debug: Username '" + username +"' is added to the database.");
			client.emit("register okay");
			alert("Lab 3 - [Chris Pydych] Debug: Username '" + username +"' is added to the database.");
		}else{
			console.log("Lab 3 - [Phu Phung] Debug: ERROR: Username '" + username +"' CANNOT be added to the database.");
			client.emit("register failed");
		}
	});    
    //login in event     
	client.on("login", function(username,password){
		//validate user inputs
		if(!validateInput(username) || !validateInput(password)){
			client.emit("invalid input");
			return;
		}
		if(DataLayer.checklogin(username,password)){
			client.authenticated=true;
			client.emit("authenticated");
			client.username = username;
			var msg= client.username + " has joint the room with password " + password;
			console.log(msg);
			client.handshake.session.authenticated = client.authenticated;
			client.handshake.session.username = client.username;
        	client.handshake.session.save();

		}else{

			client.emit("invalid login");
			console.log("invalid login");
			
		}
	});

    client.on("logout", function(username,password){
            client.authenticated = false;
            var msg = client.username + " has logged out";
            console.log(msg)
            client.handshake.session.authenticated = client.authenticated;
            client.handshake.session.username = "";
                client.disconnect();
	});
	
    client.on("chat", function(msg){
    //client must be authenticated to send/recieve message 
        if(!client.authenticated){
            client.emit("not authenticated");
            var msg = client.username + "has not been authenticated!";
            console.log(msg); 
            return;
        }
        var data = client.username + "says: " +msg;
        console.log(data);
        data = xssFilters.inHTMLData(data);
        socketio.sockets.emit("message", data);
	});
    
    client.on("typing", function(msg){
        var data = client.username + " is typing";
        console.log(data);
        socketio.sockets.emit("typing", data);
	});
	
    client.on("addtoChat", function(username){
    if (username in userList){
        Users[username];
        console.log(Users);
    }
    else{
        client.emit("nosuer");//error to the user that the client does not ecxist on the server
    }
	});

    //makes group needs a name and users 
    client.on("createChat", function(msg){
        //console.log(newChatUsers);
        //makes random room id
        var user = chats[chatID].users;
        //name refers to the groupname on frontend 
        chats[chatID] = { users: Users}; 
        
        for(user in Users){
            var clientID = IDs[Users[user]];
            client.broadcast.to(clientID).emit("addChat", chatID);
        }
    client.emit("addChat", chatID);
    
	});

    client.on("chatMessage", function(msg, chatID){
        var user = chats[chatID].users;
        var data = client.username + "says: " +msg;
        for (user in Users){
            var userID = IDs[user[user]];
            if(client.username !== user[Users] && socketio.sockets.sockets[userID].authenticated){
                data = xssFilters.inHTMLData(data);
                client.broadcast.to(userID).emit("chatMessage", chatID, data);
            }
        }
	});

    client.on("getChatName", function (chatID){
    var ID = chats[chatID].name;
    client.emit("chatID", ID, chatID);
	});
});
        
 

function emittoAuthenticatedClients(type,data){
    var connectedClients = socketio.sockets.sockets;
    for(var socketId in connectedClients){
          var client = connectedClients[socketId];
         if(client.authenticated){
            data = xssFilters.inHTMLData(data);
            client.emit(type,data);
            var logmsg= "sent to " + client.username + " with ID=" + socketId;
            console.log(logmsg);
        }
      }
}

function validateInput(input){
    if(input == ""){
        return false;
    }
    else{
        return true;
    }
    if (inputIs.min(input,3)){
        return true;
    }
    else{
        return false;
	}
}    
var jsondatabase = require('./datalayer/userManager');
var DataLayer = {
	info: 'Data Layer Implementation for Messenger',
	checklogin(username,password){	
		return jsondatabase.checkUser(username,password);
	},
	addUser(username,password){
		return jsondatabase.addUser(username,password);
	}
}
