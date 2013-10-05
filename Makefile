all:
	tsc --module commonjs knapsack/knapsack.ts knapsack/bruteforce.ts app.ts

test-quick: all
	node app.js -t -f zadani/knap_4.inst.dat | diff reseni/knap_4.sol.dat -
	node app.js -t -f zadani/knap_10.inst.dat | diff reseni/knap_10.sol.dat -
	node app.js -t -f zadani/knap_15.inst.dat | diff reseni/knap_15.sol.dat -
	node app.js -t -f zadani/knap_20.inst.dat | diff reseni/knap_20.sol.dat -

test: test-quick
	node app.js -t -f zadani/knap_22.inst.dat | diff reseni/knap_22.sol.dat -
	node app.js -t -f zadani/knap_25.inst.dat | diff reseni/knap_25.sol.dat -
	node app.js -t -f zadani/knap_27.inst.dat | diff reseni/knap_27.sol.dat -
	node app.js -t -f zadani/knap_30.inst.dat | diff reseni/knap_30.sol.dat -
	node app.js -t -f zadani/knap_32.inst.dat | diff reseni/knap_32.sol.dat -
	node app.js -t -f zadani/knap_35.inst.dat | diff reseni/knap_35.sol.dat -
	node app.js -t -f zadani/knap_37.inst.dat | diff reseni/knap_37.sol.dat -
	node app.js -t -f zadani/knap_40.inst.dat | diff reseni/knap_40.sol.dat -

messure-quick: all
	node app.js -m -f zadani/knap_4.inst.dat
	node app.js -m -f zadani/knap_10.inst.dat
	node app.js -m -f zadani/knap_15.inst.dat
	node app.js -m -f zadani/knap_20.inst.dat

messure: messure-quick
	node app.js -m -f zadani/knap_22.inst.dat
	node app.js -m -f zadani/knap_25.inst.dat
	node app.js -m -f zadani/knap_27.inst.dat
	node app.js -m -f zadani/knap_30.inst.dat
	node app.js -m -f zadani/knap_32.inst.dat
	node app.js -m -f zadani/knap_35.inst.dat
	node app.js -m -f zadani/knap_37.inst.dat
	node app.js -m -f zadani/knap_40.inst.dat

graph-quick:
	make -s messure-quick > times.dat
	gnuplot graph.gplot

graph:
	make -s messure > times.dat
	gnuplot graph.gplot
