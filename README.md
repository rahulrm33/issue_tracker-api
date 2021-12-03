# Issue Tracker Web API

An issue tracking application based on Nodejs express-framework in back-end , Mongodb in database and redis for caching.Mainly used to track issues posted by users and manage them effectively.

Functionalities :
    *Fully asynchronous.
    *Secured rest api's with deep authentication and authorization to limit access.
    *Compressed responses.
    *Secured HTTP headers.
    *Cache ready (Redis).
    *Can establishe REDIS connection for caching system.
    *User can raise issue and monitor status frequently.
    *Issue model and controller example.
    *Login access with email and password matching with secured hash password.
    *API collection example for Postman..
    *Mailer example with SendGrid/mail after registering with application
    *Ability to refresh token to get access token .
    *JWT Tokens, make requests with a token after login with Authorization header with value Bearer yourToken where yourToken is the signed and encrypted token given in the response from the login process.
 
Tech Used :
    - Nodejs
    - MongoDB
    - Express Framework
    - Redis for Cache
    - Jwt for authendication
    
How to run this code
  Make sure MongoDB and Redis is running on your system in respective port.
  Clone this repository
  Open command line in the cloned folder,
    To install dependencies, run npm install
    To run the application for development, run node index.js
  Open Postman to check all Rest API's 
    http://localhost:3000/v1/auth/register    - To register new user
    http://localhost:3000/v1/auth/login       - To Login into 
    http://localhost:3000/v1/auth/token       - To get renewed access token from 
    http://localhost:3000/v1/user/user/:id    - To get details of user in given Id 
    http://localhost:3000/v1/user/user        - To update user details
    http://localhost:3000/v1/user/user        - To delete user form app
    http://localhost:3000/v1/auth/logout      - To logout user.
    http://localhost:3000/v1/issue/issues/    - Create Issue 
    http://localhost:3000/v1/issue/issues/:id - Get Issue by Id 
    http://localhost:3000/v1/issue/issues     - Get All Issue 
    http://localhost:3000/v1/issue/issues/:id - Update specific issue with ID
    http://localhost:3000/v1/issue/issues/:id - Update A Issue with ID
    http://localhost:3000/v1/issue/issue?status - Get Issue by Query String 
    http://localhost:3000/v1/issue/issue?priority&phase - Get Issue by Query String for priority and phase .
    

