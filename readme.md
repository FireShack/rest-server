# Rest Server template

## What is this?

This is a ready to use server. You will be able to make http request for the endpoints that you want. Feel free of clone it and use it. All this server was coded with node.js, the Javascript runtime enviroment, and Express. You can check all the documentation.

You can access to the link in the description, there you will find the endpoints to request.

## Some information

This "shell" includes validated routes, own middlewares, designed mongo's schemas,
Mongo DB operations with Mongoose (ODM) and some more features. If you want to use it,
you can modify all the data, and change it by your own. To use your own Mongo database,
fill the DB_CNN into the **example.env** file.

## How to use it?

1. First you need to clone the repository

2. After that, you need to download all packages (are detailed at last)

3. Once you have all installed, you need to set your enviroment variables, this ones are
   into the **example.env** file. There you can set the port or some connections

4. There are a lot of Schemas and DB operations, maybe you want to change all and define
   your own data, but the core is it and using it will save a lot of time!

5. All is ready, you can use your own server

## Endpoints

### Users

http://localhost:port/api/users/ (GET)
http://localhost:port/api/users/:id (GET one)
http://localhost:port/api/users/ (POST)
http://localhost:port/api/users/:id (PUT)
http://localhost:port/api/users/:id (DELETE)

### Auth

http://localhost:port/api/auth/login (POST)
http://localhost:port/api/auth/login/google (POST)

### Categories

http://localhost:port/api/market (GET)
http://localhost:port/api/market/categories/:id (GET one)
http://localhost:port/api/market/categories/create (POST)
http://localhost:port/api/market/categories/modify/:id (PUT)
http://localhost:port/api/market/categories/delete/:id (DELETE)

### Products

http://localhost:port/api/market/products (GET)
http://localhost:port/api/market/products/create (POST)
http://localhost:port/api/market/products/modify/:id (PUT)
http://localhost:port/api/market/products/delete/:id (DELETE)

### Search

http://localhost:port/api/search/:collection/:params (GET)

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

## Notice

The last update includes new schemas, connections to DB, routes, controllers and a lot functionalities like
the search option or the refs to categories and products.

Good Code!
