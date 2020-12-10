import { NoteNames, Note } from "vmmx-schema";

export default class MidiInstrumentUse {
	constructor() {
		this.start();
	}

	onNote: (note: Note) => void = () => {}; // temp empty function

	start() {
		if (navigator.requestMIDIAccess) {
			navigator
				.requestMIDIAccess()
				.then(this.onMIDISuccess, this.onMIDIFailure);
		}
	}

	onMIDISuccess = (midiAccess: WebMidi.MIDIAccess) => {
		midiAccess.inputs.values();
		for (const input of Array.from(midiAccess.inputs.values())) {
			input.onmidimessage = (midiMessage) => {
				if (midiMessage.data[0] == 144) {
					const note = NoteNames[midiMessage.data[1]] as Note;
					this.onNote(note);
				}
			};
		}
	};

	onMIDIFailure() {
		console.log("Could not access your MIDI devices.");
	}
}
