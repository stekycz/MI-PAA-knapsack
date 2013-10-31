///<reference path="knapsack.ts"/>

import k = require("knapsack");

export class Dynamic extends k.ProblemSolver {

	public _find(items : k.Item[], maxWeight : number) : k.Knapsack {
		var weights = Dynamic._generateWeights(items, maxWeight);
		var solution = Dynamic._findBestSolution(weights, maxWeight);

		return solution;
	}

	private static _generateWeights(items : k.Item[], maxWeight : number) : Object {
		var previous_column = {};
		previous_column[0] = new k.Knapsack();
		var weights = {};

		for (var i = 0; i < items.length; i++) {
			for (var price in previous_column) {
				// Without item
				weights[price] = Dynamic._getBestKnapsack(previous_column[price], weights[price], previous_column[price].clone(), maxWeight);

				// With item
				var knapsack = previous_column[price].clone();
				knapsack.addItem(items[i]);
				var new_price = knapsack.getPrice();
				weights[new_price] = Dynamic._getBestKnapsack(previous_column[new_price], weights[new_price], knapsack, maxWeight);
			}
			previous_column = weights;
			weights = {};
		}

		return previous_column;
	}

	private static _getBestKnapsack(previous : k.Knapsack, current : k.Knapsack, knapsack : k.Knapsack, maxWeight : number) : k.Knapsack {
		var exists = current || previous;
		if (!exists || knapsack.getWeight() < exists.getWeight()) {
			return knapsack;
		}

		return exists.clone();
	}

	private static _findBestSolution(solutions : Object, maxWeight : number) : k.Knapsack {
		var keys = Object.keys(solutions);
		keys = keys.filter(function (a : string) {
			return solutions[a].getWeight() <= maxWeight;
		});
		keys.sort(function (a : string, b : string) {
			return parseInt(b) - parseInt(a);
		});
		return solutions[keys[0]] || new k.Knapsack();
	}

}

export function create() : k.ProblemSolver {
	return new Dynamic();
}
