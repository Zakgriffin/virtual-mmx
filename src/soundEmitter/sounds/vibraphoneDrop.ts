import { VibraphoneState } from "../../machineState/vibraphone";
import { vibraphoneBars, VibraphoneBarTOFIX } from "../../toFutureSchema";
import { Sampler, Volume, context, Destination } from "tone";
import { mapArrayToObj, values } from "../../helpers/functions";
import { Note } from "vmmx-schema";
import { Signal } from "../../helpers/solid";
import { EmptyE } from "../../eventHandling/concrete";

export class VibraphoneDropSound {
	readonly channels: Record<VibraphoneBarTOFIX, VibraphoneBarDropSound>;

	constructor(vibraphoneState: VibraphoneState) {
		this.channels = mapArrayToObj(
			vibraphoneBars,
			(bar) => new VibraphoneBarDropSound(vibraphoneState.notes[bar])
		);
	}

	onToneLoad() {
		const vibraphoneSampler = new Sampler(
			{
				C5: "C5.wav",
			},
			undefined,
			"./samples/vibraphone/"
		);

		const volume = new Volume(-12);
		vibraphoneSampler.chain(volume, Destination);

		values(this.channels).forEach((c) => c.onToneLoad(vibraphoneSampler));
	}
}

export class VibraphoneBarDropSound {
	private vibraphoneSampler?: Sampler;

	constructor(private note: Signal<Note>) {}

	onToneLoad(sampler: Sampler) {
		this.vibraphoneSampler = sampler;
	}

	playSound(_: EmptyE, time?: number) {
		if (this.vibraphoneSampler?.loaded) {
			this.vibraphoneSampler.triggerAttack(
				this.note.v,
				time ?? context.currentTime
			);
		}
	}
}
