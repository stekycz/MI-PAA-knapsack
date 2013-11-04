#!/bin/bash

DIR=results/$(date "+%Y-%m-%d_%H_%M_%S")

mkdir $DIR

make

function messure {
	STRATEGY=$1
	MAX_ITEMS=$2
	FIND_ERRORS=$3

	echo "Run time messure for $STRATEGY"
	node parallel-runner.js -i ./zadani -s $STRATEGY -d $MAX_ITEMS -m > times.dat
	gnuplot graph.gplot && svg2png graph.svg $DIR/graph-$STRATEGY.png
	mv times.dat $DIR/times-$STRATEGY.dat

	if $FIND_ERRORS; then
		echo "Run error messure for $STRATEGY"
		node parallel-runner.js -i ./zadani -s $STRATEGY -d $MAX_ITEMS -e ./reseni > errors.dat
		gnuplot error-graph.gplot && svg2png error-graph.svg $DIR/error-graph-$STRATEGY.png
		mv errors.dat $DIR/errors-$STRATEGY.dat
	fi
}

# bruteforce
#messure bruteforce 27 false

# priceweight
#messure priceweight 40 true

# bab
#messure bab 27 false

# dynamic
#messure dynamic 40 false

# fptas
#messure fptas 40 true
