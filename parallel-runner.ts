///<reference path='definitions/node.d.ts' />
///<reference path="definitions/node-getopt.d.ts"/>

import os = require("os");
import fs = require("fs");
import child_process = require('child_process');

var opt = require("node-getopt").create([
	['i', 'instances=ARG', 'directory with instances'],
	['j', 'jobs=ARG', 'count of parallel jobs'],
	['q', 'quick', 'process only quick jobs']
])
.bindHelp();

var options = opt.parseSystem();

if (!options.options.instances) {
	console.info("Missing parameter instances\n");
	opt.showHelp();
	return 1;
}

var jobs = os.cpus().length;
if (options.options.jobs !== undefined && options.options.jobs !== null && options.options.jobs != "") {
	jobs = parseInt(options.options.jobs);
}

var base_dir = options.options.instances;
var files = fs.readdirSync(base_dir);

if (options.options.quick !== undefined && options.options.quick !== null && options.options.quick != "") {
	files = files.filter(function (item : string) {
		return parseInt(item.trim().replace(/^knap_/, '').replace(/\.inst\.dat$/, '')) <= 20;
	});
}

files.sort(function (a : string, b : string) {
	var num_a = parseInt(a.trim().replace(/^knap_/, '').replace(/\.inst\.dat$/, ''));
	var num_b = parseInt(b.trim().replace(/^knap_/, '').replace(/\.inst\.dat$/, ''));
	return num_b - num_a;
});

var childs = [];

function writeTimes(lines : string[]) {
	for (var i = 0; i < lines.length; i++) {
		console.log(lines[i].trim());
	}
}

var results = [];
function runProcess(filename : string) {
	var command = "node app.js -m -f " + base_dir + "/" + filename;
	var child = child_process.exec(command,
		function (error, stdout, stderr) {
			results.push("" + stdout);
		});
	child.on("exit", function (code : number, signal : string) {
		var index = childs.indexOf(child);
		childs.splice(index, 1);
		if (files.length > 0) {
			runProcess(files.shift());
		}
	});
	child.on("close", function (code : number, signal : string) {
		if (childs.length <= 0) {
			writeTimes(results);
		}
	});
	childs.push(child);
}

for (var i = 0; i < jobs; i++) {
	if (files.length > 0) {
		runProcess(files.shift());
	}
}
