///<reference path="knapsack.ts"/>

import k = require("knapsack");

class BranchAndBounds extends k.ProblemSolver {

	public _find(items : k.Item[], maxWeight : number) : k.Knapsack {
		return this._findRecursive(items, maxWeight, new k.Knapsack());
	}

	private _findRecursive(items : k.Item[], maxWeight : number, knapsack : k.Knapsack) : k.Knapsack {
		if (items.length < 1) {
			return knapsack;
		}

		var withElement = new k.Knapsack();
		var withoutElement = new k.Knapsack();

		withElement.setItems(knapsack.getItems());
		withoutElement.setItems(knapsack.getItems());

		withElement.addItem(items[0]);

		if (BranchAndBounds._canFitToMaxWeight(items.slice(1), maxWeight, withElement)) {
			withElement = this._findRecursive(items.slice(1), maxWeight, withElement);
		}

		if (!BranchAndBounds._canHaveHigherPrice(withElement, withoutElement, items.slice(1), maxWeight)) {
			return withElement;
		}

		if (BranchAndBounds._canFitToMaxWeight(items.slice(1), maxWeight, withoutElement)) {
			withoutElement = this._findRecursive(items.slice(1), maxWeight, withoutElement);
		}

		if (BranchAndBounds._isBetterSolution(withElement, withoutElement, maxWeight)) {
			return withElement;
		} else {
			return withoutElement;
		}
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

	private static _canHaveHigherPrice(knapsack : k.Knapsack, solution : k.Knapsack, items : k.Item[], maxWeight : number) : boolean {
		return knapsack.getPrice() < solution.getPrice() + BranchAndBounds._countMaximumPossiblePriceRise(items, maxWeight, solution);
	}

	private static _countMaximumPossiblePriceRise(items : k.Item[], maxWeight : number, knapsack : k.Knapsack) : number {
		var price_sum = 0;
		for (var i = 0; i < items.length; i++) {
			if (knapsack.getWeight() + items[i].getWeight() <= maxWeight) {
				price_sum += items[i].getPrice();
			}
		}
		return price_sum;
	}

	private static _canFitToMaxWeight(items : k.Item[], maxWeight : number, knapsack : k.Knapsack) : boolean {
		for (var i = 0; i < items.length; i++) {
			if (knapsack.getWeight() + items[i].getWeight() <= maxWeight) {
				return true;
			}
		}
		return false;
	}

}

export function create() : k.ProblemSolver {
	return new BranchAndBounds();
}
