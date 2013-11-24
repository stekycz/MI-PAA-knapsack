///<reference path="knapsack.ts"/>
///<reference path="dynamic.ts"/>

import k = require("knapsack");
import d = require("dynamic");

class DynamicFptas extends d.Dynamic {

	public _find(items : k.Item[], maxWeight : number) : k.Knapsack {
		items = this._omitBitsInPrices(items);
		return super._find(items, maxWeight);
	}

	private _omitBitsInPrices(items : k.Item[]) : k.Item[] {
		var error = this._countError(items, 0.03);
		for (var i = 0; i < items.length; i++) {
			var price = items[i].getPrice();
			price = this._omitBitsInPrice(price, error);
			items[i].setPrice(price);
		}
		return items;
	}

	private _omitBitsInPrice(price : number, error : number) : number {
		var mask = -1 << error;
		return price & mask;
	}

	private _countError(items : k.Item[], percentage : number) : number {
		var sum = 0;
		for (var i = 0; i < items.length; i++) {
			sum += items[i].getPrice();
		}
		var error = Math.ceil(this._log((percentage * sum) / items.length, 2));
		return error;
	}

	private _log(n : number, base : number) : number {
		return Math.log(n) / Math.log(base);
	}

}

export function create() : k.ProblemSolver {
	return new DynamicFptas();
}
