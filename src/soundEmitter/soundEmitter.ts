import { values } from "../helpers/functions";
import { s } from "../helpers/solid";
import { MachineState } from "../machineState/machine";
import { BassDropSound } from "./sounds/bassDrop";
import { DrumsDropSound } from "./sounds/drumsDrop";
import { HiHatMachineSound } from "./sounds/hiHatMachine";
import { MutingLeverSound } from "./sounds/mutingLever";
import { VibraphoneDropSound } from "./sounds/vibraphoneDrop";

export class SoundEmitter {
	readonly drop: {
		bass: BassDropSound;
		drums: DrumsDropSound;
		vibraphone: VibraphoneDropSound;
	};
	readonly state: {
		hiHatMachine: HiHatMachineSound;
		mutingLever: MutingLeverSound;
	};

	toneLoaded = s(false);

	constructor(machineState: MachineState) {
		this.drop = {
			bass: new BassDropSound(machineState.bass),
			drums: new DrumsDropSound(machineState.drums),
			vibraphone: new VibraphoneDropSound(machineState.vibraphone),
		};
		this.state = {
			hiHatMachine: new HiHatMachineSound(machineState.hiHatMachine),
			mutingLever: new MutingLeverSound(),
		};

		this.scheduleToneLoad();
	}

	private scheduleToneLoad() {
		window.addEventListener("mousedown", this.runAllToneLoad, { once: true });
	}

	private runAllToneLoad = () => {
		values(this.drop).forEach((i) => i.onToneLoad());
		values(this.state).forEach((i) => i.onToneLoad());
		this.toneLoaded.set(true);
		console.log("Tone Instruments Loaded");
	};
}

export interface Sound {
	/** Invoked when user first interacts with page */
	onToneLoad(): void;
}

// export interface DropInstrumentSound<
// 	E extends EventBase,
// 	Channel extends ObjectKey
// > extends Sound {
// 	channels: Record<Channel, DropInstrumentChannelSound<E>>;
// }

// export interface DropInstrumentChannelSound<E extends EventBase> extends Sound {
// 	triggerStrike: EventObserverListener<E>;
// }
