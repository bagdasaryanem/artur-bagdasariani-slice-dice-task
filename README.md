## Running the app

```bash
$ docker-compose up
```

This projects runs on http://localhost:8000/graphql.

This setup supports hot reloading, so any changes in code will update container in real-time.

## Tests

```bash
$ npm run test
```

Project is done using Graphql so you can use Graphql playground to test the API.

# Resolvers

## SignUp

```graphql
mutation {
  signUp(
    authCredentialsDto: { email: "test1@gmail.com", password: "qwerty1234" }
  ) {
    accessToken
  }
}
```

## SignIn

```graphql
mutation {
  signIn(
    authCredentialsDto: { email: "test1@gmail.com", password: "qwerty1234" }
  ) {
    accessToken
  }
}
```

# After signing in, use token to access the protected routes

You should pass this object into HTTP Headers in Graphql playground.

```json
{
  "Authorization": "Bearer <token>"
}
```

## Create Employee

```graphql
mutation {
  createEmployee(
    createEmployeeDto: {
      name: "Abhishek"
      salary: 145000
      currency: "USD"
      department: "Engineering"
      sub_department: "Platform"
    }
  ) {
    name
    salary
    department
    onContract
  }
}
```

## Remove Employee

```graphql
mutation {
  removeEmployee(id: 11)
}
```

## Find SS, where type can be "onContract", "eachDepartment", "nestedDepartments" or "null"

```graphql
query {
  findSS(type: onContract) {
    department
    sub_department
    min
    max
    mean
  }
}
```
