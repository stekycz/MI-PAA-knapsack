///<reference path="knapsack.ts"/>

import k = require("knapsack");

class BruteForce extends k.ProblemSolver {
	public _find(items : k.Item[], maxWeight : number) : k.Knapsack {
		var combinations = BruteForce._countCombinations(items.length);
		var solution = new k.Knapsack();
		var knapsack = new k.Knapsack();

		for (var i = 0; i < combinations; i++) {
			var j = items.length - 1;
			while (knapsack.contains(items[j]) && j > 0) {
				knapsack.removeItem(items[j]);
				j--;
			}
			knapsack.addItem(items[j]);

			if (BruteForce._isBetterSolution(knapsack, solution, maxWeight)) {
				solution.setItems(knapsack.getItems());
			}
		}

		return solution;
	}

	private static _countCombinations(itemsCount : number) : number {
		var combinations = 0;
		if (itemsCount > 0) {
			combinations = 2;
		}
		for (var i = 1; i < itemsCount; i++) {
			combinations *= 2;
		}
		return combinations;
	}

	private static _isBetterSolution(knapsack : k.Knapsack, solution : k.Knapsack, maxWeight : number) : boolean {
		return knapsack.getWeight() <= maxWeight && (
			knapsack.getPrice() > solution.getPrice()
			|| (
				knapsack.getPrice() == solution.getPrice()
				&& (
				    knapsack.getItems().length > solution.getItems().length
				    || knapsack.getWeight() > solution.getWeight()
				)
			)
		);
	}
}

export function create() : k.ProblemSolver {
	return new BruteForce();
}
