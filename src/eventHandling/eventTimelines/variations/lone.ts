import { TimelineEvent } from "../../concrete";
import { EventTimeline } from "../eventTimeline";

export class LoneTimeline<E> extends EventTimeline<E> {
	events: TimelineEvent<E>[] = [];

	protected eventCanBePlaced(_: E) {
		return true;
	}

	private tickOccupied(tick: number) {
		return this.events.find((e) => e.tick === tick);
	}
	private containsEvent(event: E) {
		return this.events.find((e) => e === event);
	}
	getAddDifs(event: E, tick: number): LoneEventDif<E>[] | null {
		if (this.eventCanBePlaced(event) && !this.tickOccupied(tick)) {
			return [{ type: "add", event }];
		}
		return null;
	}
	getRemoveDifs(event: E): LoneEventDif<E>[] | null {
		if (this.containsEvent(event)) {
			return [{ type: "remove", event }];
		} else {
			return null;
		}
	}
	getModifyDifs(event: E, mod: Partial<E>) {
		if (this.containsEvent(event)) {
			return [{ type: "modify", event, mod }];
		} else {
			return null;
		}
	}
	applyDifs(difs: LoneEventDif<E>[]): void {
		// 	for (const dif of difs) {
		// 		const { event } = dif;
		// 		switch (dif.type) {
		// 			case "add": {
		// 				insertInOrder(event, (e) => event.tick > e.tick, this.events);
		// 				this.triggerChange("add", event);
		// 				break;
		// 			}
		// 			case "remove": {
		// 				removeInOrder((e) => e.tick === event.tick, this.events);
		// 				this.triggerChange("remove", event);
		// 				break;
		// 			}
		// 			case "modify": {
		// 				Object.assign(event, dif.mod);
		// 				this.triggerChange("remove", event);
		// 				this.triggerChange("add", event);
		// 			}
		// 		}
		// 	}
	}
}

interface LoneEventAddDif<E> {
	type: "add";
	event: E;
}
interface LoneEventRemoveDif<E> {
	type: "remove";
	event: E;
}
interface LoneEventModifyDif<E> {
	type: "modify";
	event: E;
	mod: Partial<E>;
}
type LoneEventDif<E> =
	| LoneEventAddDif<E>
	| LoneEventRemoveDif<E>
	| LoneEventModifyDif<E>;
