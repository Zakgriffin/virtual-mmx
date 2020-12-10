import { createEffect } from "solid-js";
import { context, Transport } from "tone";
import { s, Signal } from "../helpers/solid";

export class Player {
	running = s(false);
	currentTick = s(0);

	constructor(bpm: Signal<number>, tpq: Signal<number>) {
		this.updateCurrentTickLoop();

		createEffect(() => (Transport.bpm.value = bpm.v));
		createEffect(() => (Transport.PPQ = tpq.v));
	}

	updateCurrentTickLoop = () => {
		requestAnimationFrame(this.updateCurrentTickLoop);
		this.currentTick.set(Transport.ticks);
	};

	play() {
		this.running.set(true);
		if (context.state !== "running") {
			context.resume();
		}
		Transport.start();
	}

	pause() {
		this.running.set(false);
		Transport.pause();
	}

	restart() {
		Transport.position = 0;
	}
}
