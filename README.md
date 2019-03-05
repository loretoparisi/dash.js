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

## How it works?
The express app implments a http proxy that intercepts Dash callbacks and render back to Express. See `lib/proxy.js` for the basic implementation.
