# CPS 490 - Fall 2018, Dr. Phu Phung
## DataLayer Sample Code
#### Developed by Rakesh S.V. Reddy and Phu H. Phung

## Introduction
This module is written to illustrate how you can implement an object-oriented programming style in Node.js 
as well as how to use in your application. 
The module will allow you to check if a given username/password is found in the database (stored in the users.json file).
You can also add a new user (with username/password) or change the password of an existing user.
The passwords are hashed using the 'bcrypt' module.
You are given the permission to use/revise/extend this module for your Sprint 2. 
If you find any bug, please report to the instructor.

#### Preparation ####
You need to copy this whole folder into the current directory of your project. 
This module uses two external modules: 'bcrypt' and 'input-is', therefore, you need to install those libraries:

	$ npm i -S bcrypt input-is

You can also run the provided `install.sh` script to do the installation.

## Manage the data 

The given script `alter-user.js` allows you to add a new user, change the password of a current user,  or validate a pair of username/password. Usage:

	$ node alter-user -add|-update|-check <username> <password>


## Usage in your Node.js application

In your Node.js application, e.g., ChatServer.js, you can use this module by loading it:

        var jsondatabase = require('./datalayer/userManager');

After that, you can invoke the APIs to do the authentication or manage the users as follows.

### APIs

#### User authentication ####

The `checkUser`  API will check if the given username/password is found in the database: 

        jsondatabase.checkUser(username, password);

return `true` if found; `false` otherwise

#### Add new user ####

The `addUser` API will add the given username and password to the database:

        jsondatabase.addUser(username, password);

return `true` if succeed; `false` otherwise

#### Change password ####

The `updateUser` API with change the password of the given username to the new password given:

        jsondatabase.updateUser(username, newPassword);

return `true` if succeed; `false` otherwise