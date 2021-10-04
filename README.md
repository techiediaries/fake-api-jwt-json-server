# JSONServer + JWT Auth

A Fake REST API using json-server with JWT authentication. 

Implemented End-points: login,register

## Install

```bash
$ npm install
$ npm run start-auth
```

Might need to run
```
npm audit fix
```

## How to login/register?

You can login/register by sending a POST request to

```
POST http://localhost:8000/auth/login
POST http://localhost:8000/auth/register
```
with the following data 

```
{
  "email": "nilson@email.com",
  "password":"nilson"
}
```

You should receive an access token with the following format 

```
{
   "access_token": "<ACCESS_TOKEN>"
}
```


You should send this authorization with any request to the protected endpoints

```
Authorization: Bearer <ACCESS_TOKEN>
```

Usage:

Login:
```
  let userToken = null;
  axios.post('http://localhost:8000/auth/login',{
    "email": "nilson@email.com",
    "password":"nilson"
  }).then(function (response) {
    console.log (response.data);
    userToken = response.data.access_token;
  }).catch(function (error) {
    console.log(error);
  });
```

Read:
```
  const config = {
     headers: {
        Authorization: "Bearer " + userToken
     }
  };
  axios.get('http://localhost:8000/products',config)
  .then(function (response) {
    console.log (response.data);
  }).catch(function (error) {
    console.log(error);
  });
```

List of APIs:

| API | Usage |
| --- | --- |
| `POST /auth/login` | User Login |
| `POST /auth/register` | Register New User |
| `GET /products` | for getting the products |
| `GET /products/<id>` | for getting a single product by id |
| `POST /products` | for creating a new product |
| `PUT /products/<id>` | for updating a product by id |
| `PATCH /products/<id>` | for partially updating a product by id |
| `DELETE /products/<id>` | for deleting a product by id |


Check out these tutorials:

- [Mocking a REST API Back-End for Your Angular App with JSON-Server and Faker.js](https://www.techiediaries.com/angular-mock-backend)
- [Building a Fake and JWT Protected REST API with json-server](https://www.techiediaries.com/fake-api-jwt-json-server)



