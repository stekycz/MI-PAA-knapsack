QUICK_ITEMS_COUNT = 20
ITEMS_COUNT = 50

# Compilation

all:
	tsc --module commonjs knapsack/knapsack.ts knapsack/bab.ts knapsack/dynamic.ts knapsack/priceweight.ts knapsack/bruteforce.ts common.ts app.ts parallel-runner.ts

# Tests

test-quick: all
	node parallel-runner.js -i ./zadani -s dynamic -d $(QUICK_ITEMS_COUNT) -t ./reseni

test: all
	node parallel-runner.js -i ./zadani -d $(ITEMS_COUNT) -t ./reseni

# Times

time-messure-quick: all
	node parallel-runner.js -i ./zadani -s dynamic -d $(QUICK_ITEMS_COUNT) -m

time-messure: all
	node parallel-runner.js -i ./zadani -s dynamic -d $(ITEMS_COUNT) -m

graph-quick:
	make -s time-messure-quick > times.dat
	gnuplot graph.gplot

graph:
	make -s time-messure > times.dat
	gnuplot graph.gplot

# Errors

error-messure-quick: all
	node parallel-runner.js -i ./zadani -s dynamic -d $(QUICK_ITEMS_COUNT) -e ./reseni

error-messure: all
	node parallel-runner.js -i ./zadani -s dynamic -d $(ITEMS_COUNT) -e ./reseni

error-graph-quick:
	make -s error-messure-quick > errors.dat
	gnuplot error-graph.gplot

error-graph:
	make -s error-messure > errors.dat
	gnuplot error-graph.gplot
