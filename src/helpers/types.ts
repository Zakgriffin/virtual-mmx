import { insertInOrder, removeInOrder } from "./functions";
import { s } from "./solid";

export class SignalArray<T> {
	private values;

	constructor(init?: T[]) {
		this.values = s<T[]>(init ?? []);
	}

	push(item: T) {
		this.values.set([...this.values.v, item]);
	}

	insertInOrder(item: T, check: (t: T) => boolean) {
		insertInOrder(item, check, this.v);
		this.values.set(this.v);
	}

	removeInOrder(check: (t: T) => boolean) {
		removeInOrder(check, this.v);
	}

	get v() {
		return this.values.v;
	}
}
