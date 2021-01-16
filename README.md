# JSONServer + JWT Auth
[Forked from](https://github.com/techiediaries/fake-api-jwt-json-server)

A Fake REST API using json-server with JWT authentication. 
Implemented End-points: 
- register
- login
- use API only with Authentication token

## TODO - CHANGES
- [x] Login is checking if the user exists and returns Authentication token
- [ ] README updated

## Install
```bash
$ npm i
```

Might need to run
```bash
$ npm audit fix
```

## Run
```bash
$ npm start
```

added dev mode:

```bash
$ npm run dev
```

## How to register?
You can register by sending a POST request to
```
POST http://localhost:3000/auth/login
POST http://localhost:3000/auth/register
```

with the following data in body
```
{
  "email": "nilson@email.com",
  "password":"nilson"
}
```

- You should receive an access token with the following format 
```json
{
   "access_token": "<ACCESS_TOKEN>"
}
```

## How to Login?
- Use `Basic Auth` and send username and password in the headers. 
- You should receive an access token with the following format 
```json
{
   "access_token": "<ACCESS_TOKEN>"
}
```

## How to use API?
Send the authorization with any request to the protected endpoints

```
Authorization: Bearer <ACCESS_TOKEN>
```

## Webgraphy
Check out these tutorials:
- [Mocking a REST API Back-End for Your Angular App with JSON-Server and Faker.js](https://www.techiediaries.com/angular-mock-backend)
- [Building a Fake and JWT Protected REST API with json-server](https://www.techiediaries.com/fake-api-jwt-json-server)
- [Angular 9 Tutorial: Build an Example App with Angular CLI, Angular Router, HttpClient & Angular Material](https://www.shabang.dev/angular-tutorial-build-an-example-app-with-angular-cli-router-httpclient-and-angular-material/)



