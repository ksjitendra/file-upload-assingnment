
## Description

This project is a mini file management system with having the features like authentication and file management. 
## Project setup

```bash
$ npm install
```

copy the .evn.example to .env

```bash
$ cp .env.example .env
```

## Create database and make connection with the project
- Create a database in postgres and provide connection details in the .env file 
- import the sql tables in the db given in the root directory on project / Sync database by uncommenting the sync function in the database provider file.


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

- Project will start on localhost:30001
