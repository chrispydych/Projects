var fs = require('fs');

var inputIs = require('input-is');

const bcrypt = require('bcryptjs');

const saltRounds = 10;

const usersdb = __dirname +'/users.json';

exports.checkUser = function (username, password) {
	if(!fs.existsSync(usersdb)){
		console.log('userManager.js> No existing "users.json" file under "' + __dirname +'"');
		return false;
	}
	var data = fs.readFileSync(usersdb, 'utf8');
	data = JSON.parse(data);
	if (data.users && data.users[username])
	{
		var salt = data.users[username].salt;
		var hash = bcrypt.hashSync(password, salt);
		if (hash === data.users[username].password) {
        	return true;
		}
	}
	return false;
};

exports.addUser = function (username, password) {
	if(!validateUsername(username) || !validatePassword(password)){
		console.log('userManager.addUser> cannot add user. Username must be at least 3 characters, password must be at least 5 characters');
		return false;
	}
	var data;
	if(!fs.existsSync(usersdb)){
		console.log('userManager.addUser> The "users.json" database file does not exists. Creating a new one under "' + __dirname + '"');
		data = {"users": {}};
		data = JSON.stringify(data);
	}else{
		data = fs.readFileSync(usersdb, 'utf8');
	}
	data = JSON.parse(data);
	//console.log(data);
	if (data.users) {
		if(!data.users[username]){
			var salt = bcrypt.genSaltSync(saltRounds);
			var hash = bcrypt.hashSync(password, salt);
			var newUser = {
				"salt" : salt,
				"password" : hash
			};
    		data.users[username] = newUser;
			fs.writeFileSync(usersdb, JSON.stringify(data), "utf8");
    		if(this.checkUser(username, password)){
      			console.log("userManager.addUser> a new user added '" + username +"'");
      			return true;
			}else{
				console.log("userManager.addUser> cannot add the new user '" + username +"'");
			}
		}else{
				console.log("userManager.addUser> cannot add the new user '" + username +"'. The username exists!");
		}
	}else{
		console.log("userManager.addUser> Something wrongs with the database file");
	}
	return false;
};

exports.updateUser = function (username, newpassword) {
	if(!fs.existsSync(usersdb)){
		console.log('userManager.updateUser> No existing "users.json" file under "' + __dirname +'"');
		return false;
	}
	var data = fs.readFileSync(usersdb, 'utf8');
	data = JSON.parse(data);
	if (data.users) {
		if(data.users[username]){
			var salt = bcrypt.genSaltSync(saltRounds);
			var hash = bcrypt.hashSync(newpassword, salt);
			var updatedUser = {
				"salt" : salt,
				"password" : hash
			};
    		data.users[username] = updatedUser;
			fs.writeFileSync(usersdb, JSON.stringify(data), "utf8");
    		if(this.checkUser(username, newpassword)){
      			console.log("userManager.updateUser> new password updated for user '" + username +"'");
      			return true;
			}else{
				console.log("userManager.updateUser> cannot update the password for user '" + username +"'");
			}
		}else{
				console.log("userManager.updateUser> user '" + username +"' does not exists. Cannot update!");
		}
	}else{
		console.log("userManager.updateUser> Something wrongs with the database file");
	}
	return false;
};

function validateUsername(username){
	//a simple input validation requiring the username must be 3 chars or longer
	return inputIs.min(username,3);

}

function validatePassword(password){
	//a simple input validation requiring the username must be 5 chars or longer
	return inputIs.min(password,5);
	
}
