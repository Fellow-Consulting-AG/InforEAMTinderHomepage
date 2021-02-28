const http = require("http");
const https = require("https");

const args = process.argv;

const localPort = args[2] || process.env.npm_package_config_proxy_local_port;
const remoteHost = args[3] || process.env.npm_package_config_proxy_remote_host;
const remotePort = args[4] || process.env.npm_package_config_proxy_remote_port;

if (localPort && remoteHost && remotePort) {
	startProxy(localPort, remoteHost, remotePort);
} else {
	printUsageAndExit();
}

function printUsageAndExit() {
	console.log("Usage:");
	console.log("node proxy <locaPort> \"<remoteHost>\" <remotePort>");
	console.log("Example:");
	console.log("node proxy 8083 \"domain.server.com\" 80");
	process.exit();
}

function startProxy(localPort, remoteHost, remotePort) {
	console.log(`Starting proxy http://localhost:${localPort} -> https://${remoteHost}:${remotePort}`);

	const server = http.createServer(function (request, response) {

		const options = {
			hostname: remoteHost,
			port: remotePort,
			path: request.url,
			method: request.method,
			headers: request.headers,
			rejectUnauthorized: false
		};

		try {
			const proxyRequest = https.request(options);
			proxyRequest.on("response", function (proxyResponse) {
				try {
					proxyResponse.on("data", function (chunk) {
						response.write(chunk, "binary");
					});
					proxyResponse.on("end", function () {
						response.end();
					});
					proxyResponse.on("error", function (e) {
						console.log("Request error: " + e);
					});
					response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
				} catch (ex) {
					console.log(ex);
				}
			});
			request.on("data", function (chunk) {
				try {
					proxyRequest.write(chunk, "binary");
				} catch (ex) {
					console.log(ex);
				}
			});
			request.on("end", function () {
				try {
					proxyRequest.end();
				} catch (ex) {
					console.log(ex);
				}
			});
		} catch (ex) {
			console.log(ex);
		}
	});

	server.on("clientError", function (e) {
		console.log("Client error: " + e);
	});

	process.on("uncaughtException", function (e) {
		console.log("Uncaught exception: " + e);
	});

	server.listen(localPort);
}
