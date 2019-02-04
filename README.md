## Prerequisites
Should have Docker and git installed

## How to Launch the client

- Clone the current repository locally
- Run this command to build the docker image: docker build -t eventclient . 
- Run this command to launch the container  : docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 4200:4200 --rm eventclient
- Navigate to http://localhost:4200/

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Unit Test

Because of time constraint all the test has been done manually. There is no Jasmine unit test or Protractor integration test
