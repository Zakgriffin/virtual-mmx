import { TimelineEvent } from "../concrete";

type ChangeEventListener<E> = (event: TimelineEvent<E>) => void;

type EventChange = "add" | "remove";

export abstract class EventTimeline<E> {
	private changeEventListeners: Record<
		EventChange,
		ChangeEventListener<E>[]
	> = {
		add: [],
		remove: [],
	};

	on(change: EventChange, listener: ChangeEventListener<E>) {
		this.changeEventListeners[change].push(listener);
	}

	triggerChange(change: EventChange, event: TimelineEvent<E>) {
		this.changeEventListeners[change].forEach((l) => l(event));
	}
}

export type TriggerChange<E> = (
	change: EventChange,
	event: TimelineEvent<E>
) => void;
