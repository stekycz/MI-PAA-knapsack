#!/bin/bash

DIR=results/granularityMoreSmall/$(date "+%Y-%m-%d_%H_%M_%S")

mkdir -p $DIR

make

function messure {
	STRATEGY=$1

	echo "Run time measure for $STRATEGY"
	node parallel-runner.js -i ./gen_zadani/granularityMoreSmall -s $STRATEGY -m > times.dat
	gnuplot graph_3d.gplot && svg2png graph_3d.svg $DIR/graph-$STRATEGY.png
	mv times.dat $DIR/times-$STRATEGY.dat
}

# bruteforce
#messure bruteforce 27 false

# priceweight
messure priceweight # 40 true

# bab
messure bab # 27 false

# dynamic
messure dynamic # 40 false

# fptas
messure fptas # 40 true
