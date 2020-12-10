import { DropEvents } from "../eventHandling/dropEvents";
import {
	EventObserverListener,
	EventObservable,
} from "../eventHandling/eventObserver";
import { EventTimeline } from "../eventHandling/eventTimelines/eventTimeline";
import { StateChangeEvents } from "../eventHandling/performance";
import { mapArrayToObj } from "../helpers/functions";
import { MachineState } from "../machineState/machine";
import { SoundEmitter } from "../soundEmitter/soundEmitter";
import {
	channelGroups,
	bassStrings,
	drumTypes,
	vibraphoneBars,
} from "../toFutureSchema";
import { toneObserve } from "./toneObserve";

export class EventReactionHandler {
	dropEventObservers;
	stateChangeObservers;

	constructor(
		machineState: MachineState,
		soundEmitter: SoundEmitter,
		programDrop: DropEvents,
		performanceDrop: DropEvents,
		stateChange: StateChangeEvents
	) {
		this.dropEventObservers = dropEventObservers(
			soundEmitter,
			programDrop,
			performanceDrop
		);
		this.stateChangeObservers = stateChangeObservers(machineState, stateChange);
	}
}

function eventObservable<E>(setup: {
	programTimeline?: EventTimeline<E>;
	performanceTimeline: EventTimeline<E>;
	listener: EventObserverListener<E>;
}) {
	const observable = new EventObservable<E>();
	observable.addEventListener(setup.listener);
	if (setup.programTimeline) {
		toneObserve(setup.programTimeline, observable.triggerEvent, true);
	}
	toneObserve(setup.performanceTimeline, observable.triggerEvent, false);
	return observable;
}

const stateChangeObservers = (
	machineState: MachineState,
	stateChange: StateChangeEvents
) => ({
	machine: {
		channelMute: mapArrayToObj(channelGroups, (channelGroup) =>
			eventObservable({
				performanceTimeline: stateChange.extra.channelMute[channelGroup],
				listener(event) {
					machineState.extra.mute[channelGroup].set(event.mute);
				},
			})
		),
	},
	vibraphone: {
		vibratoEnabled: eventObservable({
			performanceTimeline: stateChange.vibraphone.vibratoEnabled,
			listener(event) {
				machineState.vibraphone.vibratoEnabled.set(event.enabled);
			},
		}),

		vibratoSpeed: eventObservable({
			performanceTimeline: stateChange.vibraphone.vibratoSpeed,
			listener(event) {
				machineState.vibraphone.vibratoSpeed.set(event.speed);
			},
		}),
	},
	hihat: {
		hatOpen: eventObservable({
			performanceTimeline: stateChange.hihat.hatOpen,
			listener(event) {
				machineState.drums.hihatOpen.set(event.open);
			},
		}),
	},
	bass: {
		capo: mapArrayToObj(bassStrings, (bassString) =>
			eventObservable({
				performanceTimeline: stateChange.bass.capo[bassString],
				listener(event) {
					machineState.bass.capos[bassString].set(event.moveFret);
				},
			})
		),
	},
	hiHatMachine: {
		mode: eventObservable({
			performanceTimeline: stateChange.hiHatMachine.mode,
			listener(event) {
				machineState.hiHatMachine.mode.set(event.mode);
			},
		}),
	},
});

const dropEventObservers = (
	soundEmitter: SoundEmitter,
	programDrop: DropEvents,
	performanceDrop: DropEvents
) => ({
	bass: mapArrayToObj(bassStrings, (bassString) =>
		eventObservable({
			performanceTimeline: performanceDrop.bass[bassString],
			programTimeline: programDrop.bass[bassString],
			listener(event, time) {
				soundEmitter.drop.bass.channels[bassString].triggerStrike(event, time);
			},
		})
	),
	drums: mapArrayToObj(drumTypes, (drumType) =>
		eventObservable({
			performanceTimeline: performanceDrop.drums[drumType],
			programTimeline: programDrop.drums[drumType],
			listener(event, time) {
				soundEmitter.drop.drums.channels[drumType].triggerStrike(event, time);
			},
		})
	),
	vibraphone: mapArrayToObj(vibraphoneBars, (vibraphoneBar) =>
		eventObservable({
			performanceTimeline: performanceDrop.vibraphone[vibraphoneBar],
			programTimeline: programDrop.vibraphone[vibraphoneBar],
			listener(event, time) {
				soundEmitter.drop.vibraphone.channels[vibraphoneBar].triggerStrike(
					event,
					time
				);
			},
		})
	),
});
// function dropEventObservers<E extends EventBase, T>(
// 	instrument: InstrumentName,
// 	channels: T
// ) {
// 	return mapArrayToObj(channels, (channel) =>
// 		eventObservable({
// 			performanceTimeline: performanceDrop[instrument][channel],
// 			programTimeline: programDrop[instrument][channel],
// 			listener(event, time) {
// 				soundEmitter.drop[instrument].channels[channel].triggerStrike(
// 					event,
// 					time
// 				);
// 			},
// 		})
// 	);
// }
