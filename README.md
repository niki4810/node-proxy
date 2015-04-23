# node-proxy
A simple proxy server in node with logging and cli

# Getting started

- Install `NodeJS` if not already installed. See http://nodejs.org/
- Install `babel-node` : npm install -g babel
- Install `nodemon`:  npm install -g nodemon
- Clone the repo: git clone git@github.com:niki4810/node-proxy.git
- run  `npm install`

# Starting your server

From the root directory of your project

1) Using babel

```
	$ babel-node index.js
```
2) using nodemon

```
   $ nodemon --exec babel-node -- index.js
```

3) using npm start

```
  $ npm start 
```

# Features

## Echo Service

- start the server using `npm start`
- from another terminal tab run `curl http://127.0.0.1:8000 -d "Hello Echo"`


- you can also use verbose option using `-v`

- and pass in a header using `-H`


## Basic proxy

- start the server using `npm start`
- from another terminal tab run `curl -v http://127.0.0.1:8001 -d "Hello From Proxy" -H "x-asdf:Temp Proxy Header"`


## Passing x-destination-url in header
- start the server using `npm start`
- from another terminal tab run `curl -v http://127.0.0.1:8001 -H "x-destination-url:http://www.google.com"`


## CLI

### Passing url option
- start the server using (pass url arg) `nodemon --exec babel-node -- index.js  --url http://www.google.com`
- from another terminal tab run `curl -v http://127.0.0.1:8001`


- you can also open a browser and navigate to http://127.0.0.1:8001`, it should redirect you to google.com

## Logging

### Basic logging
- By default we log to `process.stdout`

### Logging to a file

- start the server using `nodemon --exec babel-node -- index.js --stream /tmp/node-proxy.log`
- from another terminal tab run `curl http://127.0.0.1:8000 -d "Hello Echo"`
- see the contents of log file via `cat /tmp/node-proxy.log`

