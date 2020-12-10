import { Sampler, context } from "tone";
import { DrumsDropE, HiHatDropE } from "../../eventHandling/concrete";
import { mapArrayToObj, values } from "../../helpers/functions";
import { DrumsState } from "../../machineState/drums";
import { drumTypes, DrumTypeTOFIX } from "../../toFutureSchema";

export class DrumsDropSound {
	channels: Record<DrumTypeTOFIX, DrumsTypeDropSound>;

	constructor(drumsState: DrumsState) {
		this.channels = mapArrayToObj(drumTypes, (type) =>
			type === "hihat" ? new DrumsTypeDropSound(type) : new HiHatDropSound(type)
		);
	}

	onToneLoad() {
		values(this.channels).forEach((s) => s.onToneLoad());
	}
}

class DrumsTypeDropSound {
	protected drumSampler?: Sampler;

	constructor(private drum: DrumTypeTOFIX) {}

	triggerStrike(_: DrumsDropE, time?: number) {
		if (this.drumSampler?.loaded) {
			this.drumSampler.triggerAttack("A1", time ?? context.currentTime);
		}
	}

	onToneLoad() {
		this.drumSampler = new Sampler({
			A1: `./samples/drums/${this.drum}.wav`,
		}).toDestination();
	}
}

class HiHatDropSound extends DrumsTypeDropSound {
	triggerStrike(event: HiHatDropE, time?: number) {
		if (this.drumSampler?.loaded) {
			this.drumSampler.triggerAttack("A1", time ?? context.currentTime);
		}
	}
}
