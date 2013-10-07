///<reference path='definitions/node.d.ts' />
///<reference path="definitions/node-getopt.d.ts"/>
///<reference path="common.ts"/>

import os = require("os");
import fs = require("fs");
import child_process = require('child_process');
import common = require("common");

var opt = require("node-getopt").create([
	['i', 'instances=ARG', 'directory with instances'],
	['s', 'strategy=ARG', 'strategy for finding solution'],
	['j', 'jobs=ARG', 'count of parallel jobs'],
	['d', 'difficulty=ARG', 'count of maximum items in one instance'],
	['t', 'test=ARG', 'turns correctness testing on'],
	['m', 'messure', 'turns time messure on'],
	['e', 'error=ARG', 'turns error messure on']
])
.setHelp(
	"Usage: node app.js --instances=<instances> --strategy=<strategy>\n" +
	"\n" +
	"  -i, --instances=ARG   directory with instances\n" +
	"  -s, --strategy=ARG    strategy for finding solution\n" +
	"  -j, --jobs=ARG        count of parallel jobs\n" +
	"  -d, --difficulty=ARG  count of maximum items in one instance\n" +
	"  -t, --test=ARG        turns correctness testing on (using given path as directory with corrent results)\n" +
	"  -m, --messure         turns time messure on\n" +
	"  -e, --error=ARG       turns error messure on (using given path as directory with optimal prices)\n"
)
.bindHelp();

var options = opt.parseSystem();

var base_dir = common.get_option(options.options.instances, null);
if (base_dir === null) {
	console.info("Missing parameter instances\n");
	opt.showHelp();
	return 1;
}

var strategy = common.get_option(options.options.strategy, "bruteforce");

var jobs = common.get_option(options.options.jobs, os.cpus().length, function (value : any) {
	return parseInt(value);
});

var files = fs.readdirSync(base_dir);
var max_items = common.get_option(options.options.difficulty, null);
if (max_items !== null) {
	files = files.filter(function (item : string) : boolean {
		return common.parse_items_count(item) <= max_items;
	});
}

var test = common.get_option(options.options.test, null);
var time_messure = common.get_option(options.options.messure, false, function (value : any) : boolean {
	return true;
});
var error_messure = common.get_option(options.options.error, null);

files.sort(function (a : string, b : string) : number {
	var num_a = common.parse_items_count(a);
	var num_b = common.parse_items_count(b);
	return num_b - num_a;
});

function writeLines(lines : string[]) : void {
	lines.sort(function (a : string, b : string) : number {
		var num_a = parseInt(a.split(/\s+/).shift());
		var num_b = parseInt(b.split(/\s+/).shift());
		return num_a - num_b;
	});
	for (var i = 0; i < lines.length; i++) {
		console.log(lines[i].trim());
	}
}

function build_command(filename : string) : string {
	var command = "node app.js -f " + base_dir + "/" + filename + " -s " + strategy;
	if (time_messure) {
		command += " -m";
	} else if (error_messure) {
		command += " -e " + error_messure + "/knap_" + common.parse_items_count(filename) + ".sol.dat";
	} else if (test) {
		command += " -t | diff " + test + "/knap_" + common.parse_items_count(filename) + ".sol.dat -";
	}

	return command;
}

var results = [];
var childs = [];

function bindEvents(child : child_process.ChildProcess) : void {
	child.on("exit", function (code : number, signal : string) : void {
		var index = childs.indexOf(child);
		childs.splice(index, 1);
		runProcess();
	});
	child.on("close", function (code : number, signal : string) : void {
		if (childs.length <= 0) {
			writeLines(results);
		}
	});
}

function runProcess() : void {
	if (files.length <= 0) {
		return;
	}
	var filename = files.shift();
	var command = build_command(filename);
	var child = child_process.exec(command,
		function (error, stdout, stderr) : void {
			results.push("" + stdout);
		});
	bindEvents(child);
	childs.push(child);
}

for (var i = 0; i < jobs; i++) {
	runProcess();
}
