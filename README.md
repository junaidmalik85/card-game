# **CARD GAME BACKEND SERVER**

### **Setup Instructions**

- Git clone repo
- Install Node.js version **14.17.6**
- Install ts-node version **8.10.2**
- Inside repo run command **npm install**
- Create a **.env** file inside app root directory (check file format for details)
- Run command **npm start** to start the server
- Run command **npm run lint** to check/fix for linting issues
- Logs can be found in **/logs** folder.

### **.ENV file format**

```
PORT=3000
ENV=local
```
### **Server Directory Structure**
The server is build using Node.js using express.js framework.\
Using typescript\
**Model-Routes-Controllers-Services Directory Structure**\
For modular code structure the logic is divided into these directories and files.
```
├───models
│   ├───Users.js
├───routes
│   ├───users.js
├───services
│   ├───users.js
├───controllers
│   ├───users.js

```
- **Models** - The schema definition of the Model
- **Routes** - The API routes maps to the Controllers
- **Controllers** - The controllers handles all the logic behind validating request parameters, query, Sending Responses with correct codes.
- **Services** - The services contains the database queries and returning objects or throwing errors

### **Additional Directory Structure**
**middlewares** - Use to add middleware functionality into the application.\
Logging is added using morgan + winston pacakges.

### **API Documentation**

To get details for each avaiable API please use documenetation.\
Documentation can found on server path **/api-docs/**
- localhost: http://localhost:3000/api-docs/

Docmentation is created using swagger plugin.