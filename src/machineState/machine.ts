import { BassState } from "./bass";
import { DrumsState } from "./drums";
import { ExtraState } from "./extra";
import { HiHatMachineState } from "./hiHatMachine";
import { VibraphoneState } from "./vibraphone";

export class MachineState {
	readonly bass = new BassState();
	readonly drums = new DrumsState();
	readonly vibraphone = new VibraphoneState();
	readonly extra = new ExtraState();
	readonly hiHatMachine = new HiHatMachineState();
}
