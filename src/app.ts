import { createContext } from "solid-js";
import { Program } from "./eventHandling/program";
import { Performance } from "./eventHandling/performance";
import { MachineState } from "./machineState/machine";
import { EventReactionHandler } from "./playback/eventReactionHandler";
import { SoundEmitter } from "./soundEmitter/soundEmitter";
import { Player } from "./playback/player";
import MidiInstrumentUse from "./midiInstrumentUse";

export const AppContext = createContext<AppStore>();

export class AppStore {
	// React to events
	machineState = new MachineState();
	soundEmitter = new SoundEmitter(this.machineState);

	// Storage for events
	program = new Program();
	performance = new Performance();

	// Drives event firing with Tone.js
	player = new Player(this.machineState.extra.bpm, this.program.metadata.tpq);

	eventReactionHandler = new EventReactionHandler(
		this.machineState,
		this.soundEmitter,
		this.program.programDrop,
		this.performance.manualDrop,
		this.performance.stateChange
	);

	midiInstrumentUse = new MidiInstrumentUse();

	setupTesting() {
		console.log("unimplemented");
	}
}
