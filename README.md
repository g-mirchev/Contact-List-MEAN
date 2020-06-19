# ContactlistMean

This project was created using MongoDB, Express, Angular JS v9 and Node.js v12 (MEAN).

NOTE: I'm still working on this project after the deadline. If you would like to see any of the changes I make, check out my second branh `FrontendReworkAndExtras`. If you would like to see those changes merged and deployed live, let me know :).

When registering a new user, you do not need to use a real e-mail, as long as it looks like one. eg: `someone@email.com`

Or you can log in with the example account on the live app 

https://contact-list-gm.herokuapp.com

```
email:      user@demo.com
password:   12345678

```

## Prerequisites

To run this project on local server you will need a MongoDB account as well as [npm](https://docs.npmjs.com/) and [Angular CLI](https://angular.io/cli) installed on your machine.

## Development server

In the root directory create `.env` file and set the following properties:

```
MONGODB_URI=<Link to your MongoDB database>
JWT_SECRET=<Any string you like>
JWT_EXP=60m
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

## From start to deployment in 2 weeks

I started by doing some reasearch about the MEAN stack and how to best structure my project directory.

I followed [this tutorial](https://devcenter.heroku.com/articles/mean-apps-restful-api) to help me get started with the mean stack, and to prepare the project for deployment on Heroku. I provisioned a MongoDB database on my Heroku deploy using mLab and set up a connection using mongoose in `express-app/models/db.js`.

I created a concatcs schema and model inside `express-app/models/contact.js`. and a controller to perform CRUD operations in `express-app/controllers/contactController.js`. After two days of reading and googling I had a working 'RESTful' API. I later added a router class to handle the http requests.

I used Angular CLI to create the view app. I seperated my files so all my backend logic is in `express-app` and all the frontend logic is in `angular-app`, with `server.js`, `angular.json`, amd `package.json` in the root directory, to make building and deploying the app easier.

I generated `contact.service.ts`, `contact-list.component.ts` and `contact-details.component.ts`. I used bootstrap to help me set up a quick skeleton of what I wanted the view to look like - a list of contact cards and a form to edit or create a new contact on the side, which would only appear when needed. Getting started with Angular was challenging but after almost a full day of readig tutorials, examples on github and the skeleton code generated by the CLI, I started to get an idea of how the framework works and how I want to go about this project. Writing the actual template and component logic fealt a bit like Vue.js.

By the end of week one I had a 'RESTful' api running on Express with MongoDB and an Angular service to consume it. Well at least on localhost.

I followed [this tutorial series](http://www.codaffection.com/mean-stack-article/mean-stack-user-registration-backend/) to get started on adding infividual user login. I started with the backend by defining a user schema and model which had email validation against a regular expression and a pre-save function that would hash the user password. I implemented the controller to save a new user if valication passes and mapped the funcion to an endpoint in the router. I then followed the tutorial series to implement a register form `sign-up.component.ts` (the first child of the component `user.component.ts`) and the service to call the API `user.service.ts`. I styled my components similar to the ones shown in the tutorial as I really liked the layout and some detail, but added my own touch to it so it doesn't look like a direct copy paste. I now had a working registration form.

Next I started working on implementing `JWT authentication`. It took me a day and half to do this for both the front and back end. For the backend I added a function in `user.js` that generates a JWT token signed with the user ID a secret and expiration time. I made `passport.js` which contains the local authentication strategy. I added a function in `userController.js` to authenticate a user and give him a token if he passes. I then proceeded to make the component `sign-in.component.ts`, the second child of `user.component.ts`. I used Angular's routing module to set up parent and child routes and the appropriate redirects. 

Now it was time to implement protecrted links. I made `jwtHelper.js` which intercepts requests that require authorization, and verifies the token. I imported that functionality in the router and made everything but the `/login` and `/register` routes private. On the front end I created an authentication guard `auth.guard.ts` and interceptor which uses `HttpClientModule`. I encountered an error as my `contact.service.ts` was using `HttpModule` up until that point. After fixing the error and a couple more that sprouted after it I had working user authentication and authorization using a non plaintext method.

Now it was time for my favorite part. Styling! Originally I made the contacts page with bootstrap and almost no scss. It was time to minimize the use of bootstrap and write my own stylesheets. I spent about two days styling and touching up. During that time I added frontend amd backend validation for the `contact-details.component`, and also ensured a user can't go back to the login or register pages while already registered. I had a lot of fun. The app was finally ready to deploy! Or so I thought. 

I set up my `package.json` and deployed my app on Heroku. I got the green flags from the console and followed the link to my app. All was working well except that when I refreshed the page, or manually type in the url my browser responded with a plaintext message from the server. I spent two days googling various ways on how to fix this error. In the end I managed to fix it partially by adding a wildcard route `'**'` to my Angular router that redirects to an existing component, made a function in the backend, that returns the view `index.html` from the build directory `/dist/` if a route is hit that is not registered as an endpoint. Finally I had to ensure that Heroku build the Angular app ahead of time by adding this line under scripts `"postinstall": "ng build --aot --configuration=production --output-path dist"`  to my `package.json`. This fixed the error but only partially as when I type in a url which is a registered endpoint, it still returns a plaintext response instead of a view.