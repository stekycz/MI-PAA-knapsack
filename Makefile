all:
	tsc --module commonjs knapsack/knapsack.ts knapsack/priceweight.ts knapsack/bruteforce.ts app.ts parallel-runner.ts

test: all
	node app.js -t -f zadani/knap_4.inst.dat | diff reseni/knap_4.sol.dat -
	node app.js -t -f zadani/knap_10.inst.dat | diff reseni/knap_10.sol.dat -
	node app.js -t -f zadani/knap_15.inst.dat | diff reseni/knap_15.sol.dat -
	node app.js -t -f zadani/knap_20.inst.dat | diff reseni/knap_20.sol.dat -

messure-quick: all
	node parallel-runner.js -m 20 -i ./zadani

messure:
	node parallel-runner.js -m 27 -i ./zadani

graph-quick:
	make -s messure-quick > times.dat
	gnuplot graph.gplot

graph:
	make -s messure > times.dat
	gnuplot graph.gplot
