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

http.createServer((req, res) => {
    console.log(`Request received at: ${req.url}`)
    for (let header in req.headers) {
    	res.setHeader(header, req.headers[header])
	}
    req.pipe(res)
    process.stdout.write('\n\n\n' + JSON.stringify(req.headers))
	req.pipe(process.stdout)
}).listen(8000)


http.createServer((req, res) => {
	console.log(`Proxying request to: ${destinationUrl + req.url}`)
			
	var url = destinationUrl;
	if(req.headers['x-desination-url']) {
		url = req.headers['x-desination-url'];
	}

	let options = {
    	headers: req.headers,
    	url: url + req.url
	}

	request(options).pipe(res)
	options.method = req.method
	// Log the proxy request headers and content in our server callback
	let downstreamResponse = req.pipe(request(options))
	process.stdout.write(JSON.stringify(downstreamResponse.headers))
	downstreamResponse.pipe(process.stdout)
	downstreamResponse.pipe(res)
}).listen(8001)