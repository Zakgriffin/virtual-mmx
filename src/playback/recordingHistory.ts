import { EventObservable } from "../eventHandling/eventObserver";
import { EventTimeline } from "../eventHandling/eventTimelines/eventTimeline";
import { s } from "../helpers/solid";

export class RecordingHandler {
	editingSection: "program" | "performance" = "program";
	public recording = s(false);

	createRecordingHistory<E>(
		timeline: EventTimeline<E>,
		observable: EventObservable<E>,
		editingSection: "program" | "performance"
	) {
		return new RecordingHistory(
			timeline,
			observable,
			() => this.recording.v && this.editingSection === editingSection
		);
	}
}

class RecordingHistory<E, BatchUndo> {
	batchRecording = false;

	batchedToAdd: E[] = [];
	history: BatchUndo[] = [];

	undoKeyListener?: (e: KeyboardEvent) => void;

	constructor(
		private timeline: EventTimeline<E>,
		private observable: EventObservable<E>,
		private recording: () => boolean
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
		const undo = this.timeline.addBatched(this.batchedToAdd);
		this.history.push(undo);
	}

	addRecordEvent(event: E) {
		this.batchedToAdd.push(event);
	}
	undoBatch() {
		const undo = this.history.pop();
		this.timeline.undoBatched(undo);
	}
}
