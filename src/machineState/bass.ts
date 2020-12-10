import { BassString, Note } from "vmmx-schema";
import { mapArrayToObj } from "../helpers/functions";
import { s, Signal } from "../helpers/solid";
import { BassStringTOFIX, bassStrings } from "../toFutureSchema";

export type BassCaposState = Record<BassString, Signal<number>>;
export type BassTuningState = Record<BassString, Signal<Note>>;
export type BassStringsState = Record<BassStringTOFIX, BassStringState>;

export class BassState {
	readonly capos: BassCaposState = {
		// TODO should use Record and prevent optional in schema
		1: s(0),
		2: s(0),
		3: s(0),
		4: s(0),
	};
	readonly tuning: BassTuningState = {
		// TODO should use Record and prevent optional in schema
		1: s<Note>("E2"),
		2: s<Note>("A2"),
		3: s<Note>("D3"),
		4: s<Note>("G3"),
	};

	readonly stringStates: BassStringsState = mapArrayToObj(
		bassStrings,
		(string) => ({
			string,
			tuning: this.tuning[string],
		})
	);
}

export interface BassStringState {
	string: BassStringTOFIX;
	tuning: Signal<Note>;
}
