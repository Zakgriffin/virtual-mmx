import { s } from "../helpers/solid";
import { HiHatMachineMode } from "../toFutureSchema";

export class HiHatMachineState {
	readonly mode = s<HiHatMachineMode>("beat");
}
