1)clone this app from github
2)install the dependencies using "npm install"
3)start the mogoshell using "mongod --port 27017 --dbpath eg:'c:/data'"
4)go to root directory this app in terminal and type "npm started"
5)if you are getting "server started " and "mongoDB connected " then you can proceed with below methods
6)use post-method "http://localhost:5000/user/signup" in postman to register/signup a user
7)use post-method "http://localhost:5000/user/signin" and fill your given credential to signin
8)use post-method "http://localhost:5000/user/update/:id" for update the user field
9)use delete-method "http://localhost:5000/user/delete/:id" for delete the particular user with id
10)use get-method "http://localhost:5000/user/list" for generating the list of all users
11)Login with credential for generating the token
12)"update" and "list" route is protected
