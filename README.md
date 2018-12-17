# BasicNats

NATS implementation for logging api calls using express middleware.
technology used: Nodejs, express, mongoDb, NATS

How to Start:
  1) go to project folder from terminal.
  2) run command  npm i
  3) run node app.js
  
 
commands to use docker images of nats and mongo:

docker run --name mongo -v /home/ubuntu/mongo/db:/data/db -d -p 27017:27017 mongo:latest

docker run -p 4222:4222 -p 8222:8222 -p 6222:6222 --name gnatsd -ti nats:latest
