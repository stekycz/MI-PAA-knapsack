///<reference path='definitions/node.d.ts' />
///<reference path="definitions/node-getopt.d.ts"/>
///<reference path="knapsack/knapsack.ts"/>
///<reference path="knapsack/bruteforce.ts"/>
///<reference path="knapsack/priceweight.ts"/>

import knapsack = require("knapsack/knapsack");
import bruteforce = require("knapsack/bruteforce");
import priceweight = require("knapsack/priceweight");
var opt = require("node-getopt").create([
	['f', 'filepath=ARG', 'path to file with testing instances'],
	['s', 'strategy=ARG', 'selects strategy for finding solution'],
	['t', 'test', 'turns correctness testing on'],
	['m', 'messure', 'turns time messure on'],
	['h', 'help', 'display this help']
])
.setHelp(
	"Usage: node app.js --filepath=<filepath>\n" +
	"\n" +
	"  -f, --filepath=ARG  path to file with testing instances\n" +
	"  -s, --strategy=ARG  selects strategy for finding solution (bruteforce by default)" +
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

var strategy = bruteforce.create();
if (options.options.strategy) {
	switch (options.options.strategy) {
		case "priceweight":
			strategy = priceweight.create()
			break;
		case "bruteforce":
			break;
		default:
			throw new Error("Unknown strategy");
			break;
	}
}

knapsack.run(options.options.filepath, strategy, outputFormatter, timer);
