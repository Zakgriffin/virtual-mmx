import { Sampler, Volume, Destination, PitchShift, context } from "tone";
import { mapArrayToObj, values } from "../../helpers/functions";
import { createEffect } from "solid-js";
import { BassDropE } from "../../eventHandling/concrete";
import { Signal } from "../../helpers/solid";
import { BassStringState, BassState } from "../../machineState/bass";
import { bassStrings, BassStringTOFIX } from "../../toFutureSchema";

export class BassDropSound {
	channels: Record<BassStringTOFIX, BassStringDropSound>;

	constructor(bassState: BassState) {
		const { stringStates, capos } = bassState;
		this.channels = mapArrayToObj(
			bassStrings,
			(string) => new BassStringDropSound(stringStates[string], capos[string])
		);
	}

	onToneLoad() {
		values(this.channels).forEach((s) => s.onToneLoad());
	}
}

export class BassStringDropSound {
	private bassSampler?: Sampler;

	constructor(
		private stringState: BassStringState,
		private capo: Signal<number>
	) {}

	onToneLoad() {
		const notes = [
			"A#2",
			"A#3",
			"A#4",
			"A#5",
			"C#2",
			"C#3",
			"C#4",
			"C#5",
			"E2",
			"E3",
			"E4",
			"E5",
			"G2",
			"G3",
			"G4",
			"G5",
		];
		this.bassSampler = new Sampler(
			mapArrayToObj(notes, (note) => note + ".wav"),
			undefined,
			"./samples/bass/"
		);

		const volume = new Volume(-10);
		const pitchShifter = new PitchShift();

		createEffect(() => {
			pitchShifter.pitch = this.capo.v;
		});
		this.bassSampler.chain(volume, pitchShifter, Destination);
	}

	triggerStrike(event: BassDropE, time?: number) {
		if (this.bassSampler?.loaded) {
			this.bassSampler.triggerAttack(
				this.stringState.tuning.v,
				time ?? context.currentTime
			);
		}
	}
}
