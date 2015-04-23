let http = require('http')
let request = require('request')
let through = require('through')
let fs = require('fs')
let argv = require('yargs')
    .default('host', '127.0.0.1')
    .argv
let scheme = 'http://'

// Get the --port value
// If none, default to the echo server port, or 80 if --host exists
let port = argv.port || argv.host === '127.0.0.1' ? 8000 : 80

let destinationUrl = argv.url || scheme + argv.host + ':' + port

let logStream = argv.stream ? fs.createWriteStream(argv.stream) : process.stdout

http.createServer((req, res) => {
    logStream.write(`Request received at: ${req.url}`)
    for (let header in req.headers) {
    	res.setHeader(header, req.headers[header])
	}
    req.pipe(res)
    logStream.write('\n\n\nEcho:' + JSON.stringify(req.headers) + '\n')
	req.pipe(process.stdout)
}).listen(8000)

http.createServer((req, res) => {
	logStream.write(`\nProxying request to: ${destinationUrl + req.url}\n`)			
	var url = destinationUrl + req.url;	
	if(req.headers['x-desination-url']) {
		url = req.headers['x-desination-url'];
	}

	let options = {
		method: req.method,
    	headers: req.headers,
    	url: url
	}

	logStream.write('\n\n\nProxy Request:\n' + JSON.stringify(req.headers))
  	req.pipe(logStream)
	
	through(req, logStream, {autoDestroy: false})

	// Log the proxy request headers and content in our server callback
	let downstreamResponse = req.pipe(request(options))
	downstreamResponse.pipe(res)
	logStream.write('\n\n\nDownstream Response:\n' + JSON.stringify(downstreamResponse.headers))
	through(downstreamResponse, logStream, {autoDestroy: false})	
}).listen(8001)