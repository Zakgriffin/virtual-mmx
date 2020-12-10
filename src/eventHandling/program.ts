import { s } from "../helpers/solid";
import { DropEvents } from "./dropEvents";

export class Program {
	readonly metadata = new ProgramMetadata();
	readonly programDrop = new DropEvents();

	load(program: Program) {
		// recursiveSetSignal(this, program);
	}
}

// function recursiveSetSignal<
// 	T extends Record<string | number, unknown>,
// 	U extends Record<string | number, unknown>
// >(target: U, source: T) {
// 	for (let [key, sourceVal] of entries(source)) {
// 		const targetVal = target[key];
// 		if (targetVal instanceof Signal) {
// 			targetVal.set(sourceVal);
// 		} else if (!(targetVal instanceof Function)) {
// 			recursiveSetSignal(targetVal as T, sourceVal as U);
// 		}
// 	}
// }

class ProgramMetadata {
	readonly title = s("Untitled");
	readonly author = s("Unknown Author");
	readonly tpq = s(240); // TODO interface in schema shouldn't force 240
	readonly version = s("0.1.0-beta");
	readonly length = s(61440);
	readonly procrastination = s(69420);
}

// loadProgram(program: Program) {
// 	// TODO this needs to be fixed up
// 	program.dropEvents.forEach((event) => {
// 		// TODO schema should use "drums" instead of "drum"
// 		const kind: "bass" | "drums" | "vibraphone" =
// 			event.kind === "drum" ? "drums" : event.kind;

// 		if (kind == "bass") {
// 			const e = event as BassDropEvent;
// 			this.dropEventTimelines[kind][e.string].addFromJSONEvent(
// 				new BassDropE(event)
// 			);
// 		} else if (kind == "drums") {
// 			const e = event as DrumDropEvent;
// 			this.dropEventTimelines[kind][e.drum].addFromJSONEvent(
// 				((event as unknown) as HihatEvent).closed !== undefined
// 					? new HiHatDropE(event)
// 					: new DropE(event)
// 			); // TODO need something for open hat
// 		} else if (kind == "vibraphone") {
// 			const e = event as VibraphoneDropEvent;
// 			// TODO schema "channel" should be called "bar"
// 			this.dropEventTimelines[kind][e.channel].addFromJSONEvent(
// 				new VibraphoneDropE(event)
// 			);
// 		}
// 	});

// 	// TODO gonna have to deal with this when using dynamic bpm
// 	this.state.machine.bpm(program.state.machine.bpm);
// 	this.metadata.tpq = program.metadata.tpq;
// }
