///<reference path="knapsack.ts"/>

import k = require("knapsack");

class SimulatedAnnealing extends k.ProblemSolver {
	public _find(items : k.Item[], maxWeight : number) : k.Knapsack {
		var solution = new k.Knapsack();

		// TODO

		return solution;
	}
}

export function create() : k.ProblemSolver {
	return new SimulatedAnnealing();
}
