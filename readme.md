# Trivia Scorecard


### Create User
curl -i -X POST -H 'Content-Type: application/json' -d '{ "name":"Daniel", "isAdmin": false}' http://localhost:3000/users