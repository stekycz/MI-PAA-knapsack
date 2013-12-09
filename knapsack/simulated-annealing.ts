///<reference path="knapsack.ts"/>

import k = require("./knapsack");

class SimulatedAnnealing extends k.ProblemSolver {
	public _find(items : k.Item[], maxWeight : number) : k.Knapsack {
		var t = 5 * items.length;
		var inner_loop_limit = items.length;
		var solution = new k.Knapsack();
		// var iteration = 0;

		while (t > this.frozen()) {
			var i = 0;
			while (i < inner_loop_limit) {
				var next = this.randomNeighbour(solution, items);
				var cost = solution.getPrice() - next.getPrice(); // Higher price is better
				if (next.getWeight() <= maxWeight && (cost < 0 || this.accept(cost, t))) {
					solution = next;
				}
				i++;
				// console.log(iteration + " " + solution.getPrice());
				// iteration++;
			}
			t = this.cool(t);
		}

		return solution;
	}

	private frozen() : number {
		return 4;
	}

	private randomNeighbour(solution : k.Knapsack, items : k.Item[]) : k.Knapsack {
		var index = Math.floor(Math.random() * items.length);
		var next = solution.clone();
		if (next.contains(items[index])) {
			next.removeItem(items[index]);
		} else {
			next.addItem(items[index]);
		}

		return next;
	}

	private accept(cost : number, t : number) : boolean {
		return Math.random() < Math.exp(-cost / t);
	}

	private cool(t : number) : number {
		return 0.99 * t;
	}
}

export function create() : k.ProblemSolver {
	return new SimulatedAnnealing();
}
