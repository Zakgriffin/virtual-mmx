import { Sampler, context, Volume, Destination } from "tone";
import { MuteE } from "../../eventHandling/concrete";

export class MutingLeverSound {
	mutingLeverSample?: Sampler;

	playSound(_: MuteE, time?: number) {
		if (this.mutingLeverSample?.loaded) {
			this.mutingLeverSample.triggerAttack("A1", time ?? context.currentTime);
		}
	}

	onToneLoad() {
		const mutingLeverSample = new Sampler(
			{
				A1: "flip.wav",
			},
			undefined,
			"./samples/mutingLever/"
		);
		this.mutingLeverSample = mutingLeverSample;

		const volume = new Volume(-12);
		mutingLeverSample.chain(volume, Destination);
	}
}
