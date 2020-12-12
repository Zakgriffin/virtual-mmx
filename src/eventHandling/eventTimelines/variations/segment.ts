import { TimelineEvent } from "../../concrete";
import { LoneTimeline } from "./lone";

export class SegmentTimeline<E> extends LoneTimeline<E> {
	constructor(private value: (event: E) => boolean) {
		super();
	}

	eventCanBePlaced(event: TimelineEvent<E>) {
		for (let i = this.events.v.length; i >= 0; i--) {
			if (this.events.v[i].tick < event.tick) {
				return this.value(this.events.v[i]) == this.value(event);
			}
		}
		return this.value(event);
	}
}
