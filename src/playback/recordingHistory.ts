import { EventObservable } from "../eventHandling/eventObserver";
import { s } from "../helpers/solid";

export class RecordingHandler {
	editingSection: "program" | "performance" = "program";
	public recording = s(false);

	createRecordingHistory<E, BatchUndo>(
		addBatched: (events: E[]) => BatchUndo,
		undoBatched: (undo: BatchUndo) => void,
		observable: EventObservable<E>,
		editingSection: "program" | "performance"
	) {
		return new RecordingHistory(
			observable,
			() => this.recording.v && this.editingSection === editingSection,
			addBatched,
			undoBatched
		);
	}
}

class RecordingHistory<E, BatchUndo> {
	batchRecording = false;

	batchedToAdd: E[] = [];
	history: BatchUndo[] = [];

	undoKeyListener?: (e: KeyboardEvent) => void;

	constructor(
		private observable: EventObservable<E>,
		private recording: () => boolean,
		private addBatched: (events: E[]) => BatchUndo,
		private undoBatched: (undo: BatchUndo) => void
	) {}

	triggerEvent(event: E) {
		this.observable.triggerEvent(event);
		if (this.recording()) {
			this.addRecordEvent(event);
		}
	}

	select() {
		this.undoKeyListener = (e: KeyboardEvent) => {
			if (e.key == "z" && e.ctrlKey) {
				this.undoBatch();
			}
		};
		document.addEventListener("keypress", this.undoKeyListener);
	}

	deselect() {
		if (this.undoKeyListener) {
			document.removeEventListener("keypress", this.undoKeyListener);
		}
	}

	startBatch() {
		this.batchRecording = true;
		this.batchedToAdd = [];
	}
	stopBatch() {
		this.batchRecording = false;
		const undo = this.addBatched(this.batchedToAdd);
		this.history.push(undo);
	}

	addRecordEvent(event: E) {
		this.batchedToAdd.push(event);
	}
	undoBatch() {
		const undo = this.history.pop();
		if (!undo) return;
		this.undoBatched(undo);
	}
}
