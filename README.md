# dash.js
Dash.js: Dash+Express.js. Dash runs within a Express.js app.

## Installation
The best solution is to run the solution in a `virtualenv`. This will install all requirements for both python Dash and express.

```sh
python -m venv env
npm install
```

## Run
To start the server
```sh
npm start
```
Then go to [ http://localhost:9000](http://localhost:9000) you should see a static html paged server by Express with Dash embedded!

<img width="1549" alt="schermata 2019-03-05 alle 20 06 06" src="https://user-images.githubusercontent.com/163333/53830432-b4047480-3f82-11e9-8a2d-0835e791c672.png">


## How it works?
The express app implments a http proxy that intercepts Dash callbacks and render back to Express. See `lib/proxy.js` for the basic implementation.
