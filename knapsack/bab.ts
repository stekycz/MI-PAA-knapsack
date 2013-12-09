///<reference path="knapsack.ts"/>

import k = require("./knapsack");

class BranchAndBounds extends k.ProblemSolver {

	private _priceSums : number[]

	public _find(items : k.Item[], maxWeight : number) : k.Knapsack {
		this._precomputePricesByDepth(items);
		return this._findRecursive(items, maxWeight, new k.Knapsack(), new k.Knapsack(), 0);
	}

	private _findRecursive(items : k.Item[], maxWeight : number, bestSolution : k.Knapsack, currentSolution : k.Knapsack, depth : number) : k.Knapsack {
		if (items.length <= depth) {
			return currentSolution;
		}

		if (bestSolution.getPrice() <= currentSolution.getPrice() + items[depth].getPrice() + this._priceSums[depth]
			&& currentSolution.getWeight() + items[depth].getWeight() <= maxWeight
		) {
			var solution = currentSolution.clone();
			solution.addItem(items[depth]);
			solution = this._findRecursive(items, maxWeight, bestSolution, solution, depth + 1);
			if (BranchAndBounds._isBetterSolution(solution, bestSolution, maxWeight)) {
				bestSolution = solution.clone();
			}
		}

		if (bestSolution.getPrice() <= currentSolution.getPrice() + this._priceSums[depth]) {
			currentSolution = this._findRecursive(items, maxWeight, bestSolution, currentSolution, depth + 1);
			if (BranchAndBounds._isBetterSolution(currentSolution, bestSolution, maxWeight)) {
				bestSolution = currentSolution.clone();
			}
		}

		return bestSolution;
	}

	private _precomputePricesByDepth(items : k.Item[]) : void {
		this._priceSums = [];
		var sum = 0;
		for (var depth = items.length - 1; 0 <= depth; depth--) {
			this._priceSums.push(sum);
			sum += items[depth].getPrice();
		}
		this._priceSums.reverse();
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
	return new BranchAndBounds();
}
