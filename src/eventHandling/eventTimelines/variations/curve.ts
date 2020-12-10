import { EventTimeline, TriggerChange } from "../eventTimeline";

interface CurveHandle {
	tick: number
	value: number
}

interface CurveChange {
	type: 'bezier'
	handleStart: CurveHandle,
	handleEnd: CurveHandle
}

export class CurveTimeline<E> extends EventTimeline<E> {
	curves: Curve<E>[] = [];

	constructor(
		private value: (event: E) => number,
		private eventCanBePlacedOnCurve: (
			event: E,
			curve: Curve<E> | null
		) => boolean
	) {
		super();
	}

	getAddDifs(event: E): LoneEventDif<E>[] | null {}
	getRemoveDifs(event: E): LoneEventDif<E>[] | null {}
	getModifyDifs(event: E, mod: Partial<E>) {}
	getModifyCurveDifs(curve: Curve, CurveChange: CurveChange) {}


	insertKeyEvent(event: E): CurveDif<E>[] | null {
		for (let i = 0; i < this.curves.length; i++) {
			const curve = this.curves[i];
			const encloses = curve.encloses(event);
			if (encloses === "onEdge") {
				// can't have two events in same location
				return null;
			} else if (encloses === "within") {
				// event sits between existing curve, split the curve
				if (!this.eventCanBePlacedOnCurve(event, curve)) return null;

				return [{ type: "split", curve, at: event, index: i }];
			}
		}
		if (this.eventCanBePlacedOnCurve(event, null)) {
			return [
				{
					type: "add",
					curvePoints: { start: event, end: null },
					index: 0,
				},
			];
		}
		return null;
	}

	getRemoveCurveDifs(curve: Curve<E>): CurveRemoveDif<E>[] | null {
		for (let i = 0; i < this.curves.length; i++) {
			if (curve === this.curves[i]) {
				return this.onRemoveCurve({ type: "remove", curve, index: i });
			}
		}
		return null;
	}
	getModifyEventDifs(
		curve: Curve<E>,
		event: E,
		mod: Partial<E>
	): CurveModifyDif<E> | null {
		const i = this.curves.indexOf(curve);
		if (i === -1) {
			return null;
		}
		curve.s;
		return { type: "modify", mod };
	}

	applyDifs(curveDifs: CurveDif<E>[]) {
		for (const dif of curveDifs) {
			switch (dif.type) {
				case "modify": {
					dif.curve.modifyEvent(dif.mod);
					break;
				}
				case "add": {
					const p = dif.curvePoints;
					const newCurve = new Curve(p.start, p.end, this.triggerChange);
					this.curves.splice(dif.index, 0, newCurve);
					break;
				}
				case "remove": {
					dif.curve.removeAllEvents();
					this.curves.splice(dif.index, 1);
					const toLinkRight =
						dif.index < this.curves.length ? this.curves[dif.index] : null;
					const toLinkLeft = dif.index > 0 ? this.curves[dif.index - 1] : null;
					if (toLinkLeft) {
						if (toLinkRight) {
							toLinkLeft.end = toLinkRight.start;
						} else {
							toLinkLeft.end = null;
						}
					}
					break;
				}
				case "split": {
					this.curves.splice(dif.index, 1, ...dif.curve.splitAt(dif.at));
					break;
				}
			}
		}
	}
}

type Intersection = "within" | "outside" | "onEdge";

interface CurvePoints<E extends EventBase> {
	start: E;
	end: E | null;
}

export class Curve<E extends EventBase> implements CurvePoints<E> {
	id: number;
	static currentId = 0;
	private triggerChange: TriggerChange<E>;

	constructor(
		public start: E,
		public end: E | null,
		triggerChange: TriggerChange<E>
	) {
		this.start = start;
		this.end = end;
		this.id = Curve.currentId++;

		this.triggerChange = triggerChange;
		triggerChange("add", start);
	}

	encloses(event: E): Intersection {
		const endTick = this.end ? this.end.tick : Infinity;
		const startTick = this.start.tick;
		if (event.tick < startTick || event.tick > endTick) {
			return "outside";
		} else if (event.tick === startTick || event.tick === endTick) {
			return "onEdge";
		} else {
			return "within";
		}
	}
	splitAt(event: E): Curve<E>[] {
		return [
			new Curve(this.start, event, this.triggerChange),
			new Curve(event, this.end, this.triggerChange),
		];
	}

	removeAllEvents() {
		// TODO this is gonna get a lot longer
		this.triggerChange("remove", this.start);
	}

	modifyEvent(dif: Partial<EventBase>) {
		// TODO logic for manipulating curve
		Object.assign(this.start, dif);
		// modify
		this.triggerChange("remove", this.start);
		this.triggerChange("add", this.start);
	}
}

interface CurveAddDif<E extends EventBase> {
	type: "add";
	curvePoints: CurvePoints<E>;
	index: number;
}
interface CurveRemoveDif<E extends EventBase> {
	type: "remove";
	curve: Curve<E>;
	index: number;
}
interface CurveModifyDif<E extends EventBase> {
	type: "modify";
	curve: Curve<E>;
	mod: Partial<E>;
}
interface CurveSplitDif<E extends EventBase> {
	type: "split";
	curve: Curve<E>;
	at: E;
	index: number;
}
type CurveDif<E extends EventBase> =
	| CurveModifyDif<E>
	| CurveAddDif<E>
	| CurveRemoveDif<E>
	| CurveSplitDif<E>;

class B {
	a: number = 9;
}
class A<B> {}
