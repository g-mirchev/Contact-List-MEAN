# ContactlistMean

This project was created using MongoDB, Express, Angular JS v9 and Node.js v12 (MEAN).

## Prerequisites

To run this project on local server you will need a MongoDB account as well as [npm](https://docs.npmjs.com/) and [AngularCLI] (https://angular.io/cli) installed on your machine.

## Development server

In the root directory create .env file and set the following properties:

```
MONGODB_URI=<Link to your MongoDB database>
JWT_SECRET=<Any string you like>
JWT_EXP-60m
PORT=8080
```

Note that if you select a different port you will also have to change the `apiBaseUrl` property in `angular-app/src/environments/environment.ts` to match the port you selected.

In the root folder use node package manager to install all dependencies.

```
npm install
```

To then start the express app use:

```
node server.js
```

In a seperate terminal start the angular app using:

```
ng serve
```

The app should start at: `http://localhost:4200/`.



