QUICK_ITEMS_COUNT = 20
ITEMS_COUNT = 27

all:
	tsc --module commonjs knapsack/knapsack.ts knapsack/priceweight.ts knapsack/bruteforce.ts common.ts app.ts parallel-runner.ts

test-quick: all
	node parallel-runner.js -i ./zadani -d $(QUICK_ITEMS_COUNT) -t ./reseni

test: all
	node parallel-runner.js -i ./zadani -d $(ITEMS_COUNT) -t ./reseni

time-messure-quick: all
	node parallel-runner.js -i ./zadani -d $(QUICK_ITEMS_COUNT) -m

time-messure: all
	node parallel-runner.js -i ./zadani -d $(ITEMS_COUNT) -m

error-messure-quick: all
	node parallel-runner.js -i ./zadani -s priceweight -d $(QUICK_ITEMS_COUNT) -e ./reseni

error-messure: all
	node parallel-runner.js -i ./zadani -d $(ITEMS_COUNT) -e ./reseni

graph-quick:
	make -s messure-quick > times.dat
	gnuplot graph.gplot

graph:
	make -s messure > times.dat
	gnuplot graph.gplot

error-graph-quick:
	make -s error-messure-quick > errors.dat
	gnuplot error-graph.gplot

error-graph:
	make -s error-messure > errors.dat
	gnuplot error-graph.gplot
