import { SignalArray } from "../../../helpers/types";
import { TimelineEvent } from "../../concrete";
import { EventTimeline } from "../eventTimeline";

export class LoneTimeline<E> extends EventTimeline<E> {
	events = new SignalArray<TimelineEvent<E>>();

	protected eventCanBePlaced(_: E) {
		return true;
	}

	private tickOccupied(tick: number) {
		return this.events.v.find((e) => e.tick === tick);
	}
	private containsEvent(event: E) {
		return this.events.v.find((e) => e === event);
	}
	getAddDifs(event: TimelineEvent<E>): LoneEventDif<E>[] | null {
		if (this.eventCanBePlaced(event) && !this.tickOccupied(event.tick)) {
			return [{ type: "add", event }];
		}
		return null;
	}
	getRemoveDifs(event: TimelineEvent<E>): LoneEventDif<E>[] | null {
		if (this.containsEvent(event)) {
			return [{ type: "remove", event }];
		} else {
			return null;
		}
	}
	getModifyDifs(event: TimelineEvent<E>, mod: Partial<E>) {
		if (this.containsEvent(event)) {
			return [{ type: "modify", event, mod }];
		} else {
			return null;
		}
	}
	applyDifs(difs: LoneEventDif<E>[]): void {
		for (const dif of difs) {
			const { event } = dif;
			switch (dif.type) {
				case "add": {
					this.events.insertInOrder(event, (e) => event.tick > e.tick);
					this.triggerChange("add", event);
					break;
				}
				case "remove": {
					this.events.removeInOrder((e) => e.tick === event.tick);
					this.triggerChange("remove", event);
					break;
				}
				case "modify": {
					Object.assign(event, dif.mod);
					this.triggerChange("remove", event);
					this.triggerChange("add", event);
				}
			}
		}
	}
}

interface LoneEventAddDif<E> {
	type: "add";
	event: TimelineEvent<E>;
}
interface LoneEventRemoveDif<E> {
	type: "remove";
	event: TimelineEvent<E>;
}
interface LoneEventModifyDif<E> {
	type: "modify";
	event: TimelineEvent<E>;
	mod: Partial<E>;
}
type LoneEventDif<E> =
	| LoneEventAddDif<E>
	| LoneEventRemoveDif<E>
	| LoneEventModifyDif<E>;
