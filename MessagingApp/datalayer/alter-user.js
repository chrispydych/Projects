var userManager = require('./userManager');
var option=process.argv[2];
var username=process.argv[3];
var password=process.argv[4];
if (option === "-add"){
	if (username  && password){ 
		userManager.addUser(username, password);
	}else{
		console.log("Usage: node alter-user -add <username> <password>");
		process.exit();	
	}
}else if (option === "-update"){
	if (username  && password){ 
		userManager.updateUser(username, password);
	}else{
		console.log("Usage: node alter-user -update <username> <newpassword>");
		process.exit();	
	}
}else if (option === "-check"){
	if (username  && password){ 
		if(userManager.checkUser(username, password)){
			console.log("Username/password found");
		}else{
			console.log("Username/password not found");
		};
	}else{
		console.log("Usage: node alter-user -check <username> <password>");
		process.exit();	
	}
}else{
	console.log("Usage: node alter-user -add|-update|-check <username> <password>");
	process.exit();	
}

