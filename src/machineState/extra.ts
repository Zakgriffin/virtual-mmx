import { s } from "../helpers/solid";

export class ExtraState {
	readonly mute = {
		bassdrum: s(false),
		hihat: s(false),
		snare: s(false),
		crash: s(false),
		vibraphone: s(false),
		bass: s(false),
	};
	readonly bpm = s(180);
	readonly flywheelConnected = s(true);
}
