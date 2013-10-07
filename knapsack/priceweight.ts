///<reference path="knapsack.ts"/>

import k = require("knapsack");

class PriceWeight extends k.ProblemSolver {
	public _find(items : k.Item[], maxWeight : number) : k.Knapsack {
		items.sort(function (a : k.Item, b : k.Item) {
			return (b.getPrice() / b.getWeight()) - (a.getPrice() / a.getWeight());
		});
		var solution = new k.Knapsack();

		for (var i = 0; i < items.length; i++) {
			if (solution.getWeight() + items[i].getWeight() <= maxWeight) {
				solution.addItem(items[i]);
			}
		}

		return solution;
	}
}

export function create() : k.ProblemSolver {
	return new PriceWeight();
}
