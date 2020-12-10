import { Part } from "tone";
import { EventObserverListener } from "../eventHandling/eventObserver";
import { EventTimeline } from "../eventHandling/eventTimelines/eventTimeline";

export function toneObserve<E>(
	timeline: EventTimeline<E>,
	triggerEvent: EventObserverListener<E>,
	loop: boolean
) {
	const partOptions = {
		loop,
		loopStart: 0,
		// for some reason this only seems to work with ticks
		loopEnd: 240 * 4 * 16 + "i",
	};
	const tonePart = new Part(partOptions);

	timeline.on("add", (event) => {
		tonePart.add(event.tick + "i", event);
	});
	timeline.on("remove", (event) => {
		tonePart.remove(event.tick + "i");
	});
	tonePart.callback = (time, event) => {
		triggerEvent(event, time);
	};

	tonePart.start();
}
