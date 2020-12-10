export type EventObserverListener<E> = (event: E, time?: number) => void;

export class EventObservable<E> {
	private eventListeners: EventObserverListener<E>[] = [];

	triggerEvent(event: E, time?: number) {
		this.eventListeners.forEach((l) => l(event, time));
	}

	addEventListener(listener: EventObserverListener<E>) {
		this.eventListeners.push(listener);
	}
}

class SourceEventObservable<E> {
	recording: boolean;
	input = new EventObservable<E>();
	timeline;

	constructor() {
		this.input.addEventListener((event, time) => {
			if (this.recording) {
				this.timeline.addEvent(event);
			} else {
			}
		});
	}
}
