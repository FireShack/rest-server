# Rest Server template

## What is this?

This is a ready to use server. You will be able to make http request for the endpoints that you want. Feel free of clone it and use it. All this server was coded with node.js, the Javascript runtime enviroment, and Express. You can check all the documentation.

You can access to the link in the description, there you will find the endpoints to request.

## Starting with the project

### Testing

_npm test_ runs **nodemon server.js** so we should use it for testing.

### Running the server

_npm start_ runs **node server.js** so we should run to start the server.

## How to use it?

1. First you need to clone the repository

2. After that, you need to download all packages. [Are detailed here](#dependencies)

3. Once you have all installed, you need to set your enviroment variables, this ones are
   into the **example.env** file. There you can set the port or some connections

4. After that, must run the test script

5. There are a lot of Schemas and DB operations, maybe you want to change all and define
   your own data, but the core is it and using it will save a lot of time!

6. All is ready, you can use your own server

## Some extra information

This "shell" includes validated routes, own middlewares, designed mongo's schemas,
Mongo DB operations with Mongoose (ODM) and some more features. If you want to use it,
you can modify all the data, and change it by your own. To use your own Mongo database,
fill the DB_CNN into the **example.env** file.

The users validation was made with JWT, so you will need to create a user into /api/users.
Note that most of the petitions are validated taking the role, so to that user that you create, asign
an Admin role like there is into the [POSTMAN documentation](#postman-documentation).

I used Mongo Compass to see the DB. More info about [Mongo](https://www.mongodb.com/docs/).

## Endpoints

### Users

- http://localhost:port/api/users (GET)
- http://localhost:port/api/users/:id (GET one)
- http://localhost:port/api/users (POST)
- http://localhost:port/api/users/:id (PUT)
- http://localhost:port/api/users/:id (DELETE)

### Auth

- http://localhost:port/api/auth/login (POST)
- http://localhost:port/api/auth/login/google (POST)

### Categories

- http://localhost:port/api/market (GET)
- http://localhost:port/api/market/categories/:id (GET one)
- http://localhost:port/api/market/categories/create (POST)
- http://localhost:port/api/market/categories/modify/:id (PUT)
- http://localhost:port/api/market/categories/delete/:id (DELETE)

### Products

- http://localhost:port/api/market/products (GET)
- http://localhost:port/api/market/products/create (POST)
- http://localhost:port/api/market/products/modify/:id (PUT)
- http://localhost:port/api/market/products/delete/:id (DELETE)

### Search

- http://localhost:port/api/search/:collection/:params (GET)

### Files

- http://localhost:5000/api/files/:collection/:id (GET)
- http://localhost:5000/api/files/add/:collection/:id (POST)
- http://localhost:5000/api/files/modify/:collection/:id (PUT)
- http://localhost:5000/api/files/delete/:collection/:id (DELETE)

Note that all this routes work with Cloudinary. You must create an account and get the secret key. This must be
declare into your _.env_ file. When the image is uploaded an unique ID is created, then the DB saves the cloudinary
secure_link. That link will be called to GET the image from Cloudinary. All the routes are validated.

In this endpoints, the GET methods charge the user's img, like the profile image. The POST and PUT method, for the moment, works the same. They update the user's image. The DELETE method remove the file uploaded by the user from
Cloudinary.

## POSTMAN documentation

You can test all this rest api endpoints with the available link into the description, or cloning this
repository and starting a node server. I recommends to use POSTMAN to test all the endpoints.
[Here is the POSTMAN documentation](https://documenter.getpostman.com/view/20548561/UyrEgEs5).

## Dependencies

You can execute _npm install_

- Node.js
- Express
- cors
- dotenv
- nodemon (you must have it downloaded global)
- Express-validator
- Bcrypt.js
- Mongoose
- JWT
- Google Auth
- Cloudinary

## Notice

The last update includes a complete files upload functionality, completely tested and validated. This services works with Cloudinary.

Good Code!
