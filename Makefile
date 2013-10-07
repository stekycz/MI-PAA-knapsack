QUICK_ITEMS_COUNT = 20
ITEMS_COUNT = 27

all:
	tsc --module commonjs knapsack/knapsack.ts knapsack/priceweight.ts knapsack/bruteforce.ts common.ts app.ts parallel-runner.ts

test-quick: all
	node parallel-runner.js -i ./zadani -d $(QUICK_ITEMS_COUNT) -t ./reseni

test: all
	node parallel-runner.js -i ./zadani -d $(ITEMS_COUNT) -t ./reseni

messure-quick: all
	node parallel-runner.js -i ./zadani -d $(QUICK_ITEMS_COUNT) -m

messure: all
	node parallel-runner.js -i ./zadani -d $(ITEMS_COUNT) -m

graph-quick:
	make -s messure-quick > times.dat
	gnuplot graph.gplot

graph:
	make -s messure > times.dat
	gnuplot graph.gplot
