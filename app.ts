///<reference path='definitions/node.d.ts' />
///<reference path="definitions/node-getopt.d.ts"/>
///<reference path="common.ts"/>
///<reference path="knapsack/knapsack.ts"/>
///<reference path="knapsack/bruteforce.ts"/>
///<reference path="knapsack/priceweight.ts"/>

import common = require("common");
import knapsack = require("knapsack/knapsack");
import bruteforce = require("knapsack/bruteforce");
import priceweight = require("knapsack/priceweight");

var opt = require("node-getopt").create([
	['f', 'filepath=ARG', 'path to file with testing instances'],
	['s', 'strategy=ARG', 'strategy for finding solution'],
	['t', 'test', 'turns correctness testing on'],
	['m', 'messure', 'turns time messure on'],
	['e', 'error=ARG', 'turns error messure on with comparison to solution in given file']
])
.setHelp(
	"Usage: node app.js --filepath=<filepath> --strategy=<strategy>\n" +
	"\n" +
	"  -f, --filepath=ARG  path to file with testing instances\n" +
	"  -s, --strategy=ARG  strategy for finding solution\n" +
	"  -t, --test          turns correctness testing on\n" +
	"  -m, --messure       turns time messure on\n" +
	"  -e, --error=ARG     turns error messure on with comparison to solution in given directory\n"
)
.bindHelp();

var options = opt.parseSystem();

var filepath = common.get_option(options.options.filepath, null);
if (filepath === null) {
	console.info("Missing parameter filepath\n");
	opt.showHelp();
	return 1;
}

var strategy = common.get_option(options.options.strategy, null, function (value : any) : knapsack.ProblemSolver {
	switch (value) {
		case "priceweight":
			return priceweight.create()
			break;
		case "bruteforce":
			return bruteforce.create();
			break;
		default:
			throw new Error("Unknown strategy");
			break;
	}
});
if (strategy === null) {
	console.info("Missing parameter strategy\n");
	opt.showHelp();
	return 1;
}

var outputFormatter = common.get_option(options.options.test, null, function (value : any) : knapsack.OutputFormatter {
	return new knapsack.OutputFormatter();
});

var timer = common.get_option(options.options.messure, null, function (value : any) : knapsack.Timer {
	return new knapsack.SystemTimer();
});

var errorCounter = common.get_option(options.options.error, null, function (value : any) : knapsack.ErrorCounter {
	return new knapsack.ErrorCounter(value);
});

knapsack.run(options.options.filepath, strategy, outputFormatter, timer, errorCounter);
