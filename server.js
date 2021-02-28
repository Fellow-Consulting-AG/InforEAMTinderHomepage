const browserSync = require("browser-sync").create();

function printUsageAndExit() {
	console.log("Usage:");
	console.log("node server <port> \"<path>\"");
	console.log("Examples:");
	console.log("node server");
	console.log("node server 8080 \"../\"");
	console.log("node server 80 \"C:/Web/MyApplication\"");
	process.exit();
}

function commandLineOptions() {
	const [port, path] = process.argv.slice(2);
	return { port, path };
}

function packageConfigOptions() {
	return {
		port: process.env.npm_package_config_server_port,
		path: process.env.npm_package_config_server_path,
	}
}

function portFromPackageConfig() {
	const { port } = packageConfigOptions();
	if (port) {
		assertValidPort(port);
		return port;
	}
}

function portFromArguments() {
	const { port } = commandLineOptions();
	if (port) {
		assertValidPort(port);
		return port;
	}
}

function assertValidPort(port) {
	if (!port || !Number.isInteger(Number(port))) {
		console.error(`Error: Port '${port}' is invalid.`);
		printUsageAndExit();
	}
}

function pathFromPackageConfig() {
	return packageConfigOptions().path;
}

function pathFromArguments() {
	return commandLineOptions().path;
}

const port = portFromArguments() || portFromPackageConfig() || 8080;
const path = pathFromArguments() || pathFromPackageConfig() || "./Widgets";

browserSync.init({
	server: path,
	watch: true,
	port: port,
	open: false,
	ui: false,
	ignore: [
		"**/*.ts",
		"**/*.js.map",
	],
}, (err, instance) => {
	if (err) {
		console.error("Server exited with error:");
		console.error(err);
		process.exit(1);
	}
	if (instance.getOption("port") != port) {
		// Browser-Sync will automatically use another port if the one provided is unavailable.
		// This is a useful feature, but it may cause problems if other scripts and debuggers
		// depend on the explicitly set port.
		console.error(`Error: Port ${port} is not available.`);
		process.exit(1);
	}
	console.log("Press Ctrl+C to stop");
});
