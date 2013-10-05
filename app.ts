///<reference path='definitions/node.d.ts' />
///<reference path="definitions/node-getopt.d.ts"/>
///<reference path="knapsack/knapsack.ts"/>
///<reference path="knapsack/bruteforce.ts"/>

import knapsack = require("knapsack/knapsack");
import bruteforce = require("knapsack/bruteforce");
var opt = require("node-getopt").create([
	['f', 'filepath=ARG', 'path to file with testing instances'],
	['t', 'test', 'turns correctness testing on'],
	['m', 'messure', 'turns time messure on'],
	['h', 'help', 'display this help']
])
.setHelp(
	"Usage: node app.js --filepath=<filepath> [-h]\n" +
	"\n" +
	"  -f, --filepath=ARG  path to file with testing instances\n" +
	"  -t, --test          turns correctness testing on" +
	"  -m, --messure       turns time messure on" +
	"  -h, --help          display this help"
)
.bindHelp();

var options = opt.parseSystem();

if (!options.options.filepath || options.options.filepath == "") {
	console.info("Missing argument filepath\n");
	opt.showHelp();
	return 1;
}

var timer = null;
var outputFormatter = null;

if (options.options.test) {
	outputFormatter = new knapsack.OutputFormatter();
}
if (options.options.messure) {
	timer = new knapsack.SystemTimer();
}

knapsack.run(options.options.filepath, bruteforce.create(), outputFormatter, timer);
