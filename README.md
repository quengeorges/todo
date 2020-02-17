[![CircleCI](https://circleci.com/gh/ntibi/teaching_todo.svg?style=svg)](https://app.circleci.com/github/ntibi/teaching_todo/pipelines)
# simple todo app

## installation
requirements:
- [node](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [mongodb](https://docs.mongodb.com/manual/administration/install-community/)

install required nodejs modules with `npm install`

start mongodb `systemctl start mongod`

## running the app
start with `npm start`

env config:
- `PORT=4000`
- `DB=mongodb://localhost/todo`
