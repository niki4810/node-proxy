# node-proxy
A simple proxy server in node with logging and cli

# Getting started

- Install `NodeJS` if not already installed. See http://nodejs.org/
- Install `babel-node` : `npm install -g babel`
- Install `nodemon`:  `npm install -g nodemon`
- Clone the repo: `git clone git@github.com:niki4810/node-proxy.git`
- run  `npm install`

# Starting your server

From the root directory of your project

1) Using babel

```
	$ babel-node index.js
```
![alt tag](https://raw.githubusercontent.com/niki4810/node-proxy/gh-pages/images/1-babel-node.gif)

2) using nodemon

```
   $ nodemon --exec babel-node -- index.js
```
![alt tag](https://raw.githubusercontent.com/niki4810/node-proxy/gh-pages/images/2-nodemon-start.gif)

3) using npm start

```
  $ npm start 
```
![alt tag](https://raw.githubusercontent.com/niki4810/node-proxy/gh-pages/images/3-npm-start.gif)

# Features

## Echo Service

- start the server using `npm start`
- from another terminal tab run `curl http://127.0.0.1:8000 -d "Hello Echo"`
- you can also use verbose option using `-v`
- and pass in a header using `-H`

![alt tag](https://raw.githubusercontent.com/niki4810/node-proxy/gh-pages/images/4-echo.gif)


## Basic proxy

- start the server using `npm start`
- from another terminal tab run `curl -v http://127.0.0.1:8001 -d "Hello From Proxy" -H "x:asdf:Temp Proxy Header"`
![alt tag](https://raw.githubusercontent.com/niki4810/node-proxy/gh-pages/images/5-basic-proxy.gif)

## Passing x-destination-url in header
- start the server using `npm start`
- from another terminal tab run `curl -v http://127.0.0.1:8001 -H "x-destination-url:http://www.google.com"`
![alt tag](https://raw.githubusercontent.com/niki4810/node-proxy/gh-pages/images/6-x-destination-url.gif)


## CLI

### Passing url option
- start the server using (pass url arg) `nodemon --exec babel-node -- index.js  --url http://www.google.com`
- from another terminal tab run `curl -v http://127.0.0.1:8001`
![alt tag](https://raw.githubusercontent.com/niki4810/node-proxy/gh-pages/images/7-cli-url.gif)

- you can also open a browser and navigate to http://127.0.0.1:8001`, it should redirect you to google.com
![alt tag](https://raw.githubusercontent.com/niki4810/node-proxy/gh-pages/images/7-1-cli-url-test-in-browser.gif)

## Logging

### Basic logging
- By default we log to `process.stdout`
![alt tag](https://raw.githubusercontent.com/niki4810/node-proxy/gh-pages/images/8-basic-logging.gif)

### Logging to a file

- start the server using `nodemon --exec babel-node -- index.js --stream /tmp/node-proxy.log`
- from another terminal tab run `curl http://127.0.0.1:8000 -d "Hello Echo"`
- see the contents of log file via `cat /tmp/node-proxy.log`
![alt tag](https://raw.githubusercontent.com/niki4810/node-proxy/gh-pages/images/9-logging-to-a-file.gif)


## Extra

1) Utilized `chalk` (https://www.npmjs.com/package/chalk) to add colors to log statements
![alt tag](https://raw.githubusercontent.com/niki4810/node-proxy/gh-pages/images/extra-chalk.gif)

2) Adding documentation flags
Temperoraly code checked into this branch `chore-adding-documentation-to-args`
![alt tag](https://raw.githubusercontent.com/niki4810/node-proxy/gh-pages/images/documentation-flags.gif)