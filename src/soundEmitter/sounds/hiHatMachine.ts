import { Sampler, context, Volume, Destination } from "tone";
import { HiHatMachineModeE } from "../../eventHandling/concrete";
import { Signal } from "../../helpers/solid";
import { HiHatMachineState } from "../../machineState/hiHatMachine";
import { HiHatMachineMode } from "../../toFutureSchema";

// TODO like... all of this
export class HiHatMachineSound {
	hiHatMachineSample?: Sampler;
	mode: Signal<HiHatMachineMode>;

	constructor(hiHatMachineState: HiHatMachineState) {
		this.mode = hiHatMachineState.mode;
	}

	changeMode(_: HiHatMachineModeE, time?: number) {
		if (this.hiHatMachineSample?.loaded) {
			this.hiHatMachineSample.triggerAttack("A1", time ?? context.currentTime);
		}
	}

	onToneLoad() {
		const hiHatMachineSample = new Sampler({
			A1: `./samples/drums/hihat.wav`,
		});
		this.hiHatMachineSample = hiHatMachineSample;

		const volume = new Volume(-12);
		hiHatMachineSample.chain(volume, Destination);
	}
}
