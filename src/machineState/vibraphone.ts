import { vibraphoneBars, VibraphoneBarTOFIX } from "../toFutureSchema";
import { Note } from "vmmx-schema";
import { mapArrayToObj } from "../helpers/functions";
import { s, Signal } from "../helpers/solid";

export class VibraphoneState {
	readonly vibratoEnabled = s(true);
	readonly vibratoSpeed = s(1);

	// TODO don't like the repeated <Note> generic...
	readonly notes: Record<VibraphoneBarTOFIX, Signal<Note>> = {
		1: s<Note>("B4"),
		2: s<Note>("C5"),
		3: s<Note>("D5"),
		4: s<Note>("E5"),
		5: s<Note>("F#5"),
		6: s<Note>("G5"),
		7: s<Note>("A5"),
		8: s<Note>("B5"),
		9: s<Note>("C6"),
		10: s<Note>("D6"),
		11: s<Note>("E6"),
	};

	readonly barStates: Record<
		VibraphoneBarTOFIX,
		VibraphoneBarState
	> = mapArrayToObj(vibraphoneBars, (bar) => ({ bar, note: this.notes[bar] }));
}

export interface VibraphoneBarState {
	bar: VibraphoneBarTOFIX;
	note: Signal<Note>;
}
