import { createSignal } from "solid-js";

export class Signal<T> {
	getCurrent: () => T;
	set: (v: T) => void;

	constructor(val: T) {
		const [getCurrent, set] = createSignal(val);
		this.getCurrent = getCurrent;
		this.set = set;
	}

	get v() {
		return this.getCurrent();
	}
}

export function s<T>(val: T) {
	return new Signal(val);
}
