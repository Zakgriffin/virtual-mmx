import { VibraphoneChannel, BassString } from "vmmx-schema";

import { global } from "../contexts/StoreContext";
import { Note } from "vmmx-schema";
import {
	defaultVibraphoneTuning,
	defaultBassTuning,
} from "./playback/constants";

export function range(start: number, stop: number, step?: number) {
	if (step === undefined) step = 1;

	let result: number[] = [];
	if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
		return result;
	}

	for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
		result.push(i);
	}

	return result;
}

export function mapValue(
	n: number,
	start1: number,
	stop1: number,
	start2: number,
	stop2: number
) {
	return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

export function insertInOrder<T>(item: T, arr: T[]) {
	let i;
	for (i = 0; i < arr.length && arr[i] < item; i++);
	arr.splice(i, 0, item);
}
export function removeInOrder<T>(testFunc: (item: T) => boolean, arr: T[]) {
	let i;
	for (i = 0; i < arr.length && !testFunc(arr[i]); i++);
	arr.splice(i, 1);
}

export function arrToPolyLine(points: number[][]) {
	let res = "";
	for (let point of points) {
		res += point[0] + "," + point[1] + " ";
	}
	return res;
}

export function vibraphoneChannelToNote(channel: VibraphoneChannel): Note {
	return (
		global.program.state.vibraphone.notes[channel] ||
		defaultVibraphoneTuning[channel]
	);
}

export function bassStringToNote(bassString: BassString): Note {
	return (
		global.program.state.bass.tuning[bassString] ||
		defaultBassTuning[bassString]
	);
	// const noteVal =
	// 	(NoteNames[regularTuning] as number) +
	// 	(this.program.state.bass.capos[bassString] || 0);
	// return NoteNames[noteVal];
}
