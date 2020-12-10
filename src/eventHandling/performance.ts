import { mapArrayToObj } from "../helpers/functions";
import { s } from "../helpers/solid";
import { channelGroups, bassStrings } from "../toFutureSchema";
import {
	BassCapoE,
	BpmE,
	FlywheelConnectedE,
	HiHatMachineModeE,
	HiHatOpenE,
	MuteE,
	VibraphoneVibratoEnabledE,
	VibraphoneVibratoSpeedE,
} from "./concrete";
import { DropEvents } from "./dropEvents";
import { CurveTimeline } from "./eventTimelines/variations/curve";
import { LoneTimeline } from "./eventTimelines/variations/lone";
import { SegmentTimeline } from "./eventTimelines/variations/segment";

export class Performance {
	metadata = new PerformanceMetadata();
	manualDrop = new DropEvents();
	stateChange = new StateChangeEvents();
}

export class PerformanceMetadata {
	title = s("Untitled");
	author = s("Unknown Author");
}

export class StateChangeEvents {
	bass = {
		capo: mapArrayToObj(
			bassStrings,
			() =>
				new CurveTimeline<BassCapoE>(
					(e) => e.moveFret,
					() => true
				)
		),
	};
	hihat = {
		hatOpen: new LoneTimeline<HiHatOpenE>(),
	};
	vibraphone = {
		vibratoEnabled: new SegmentTimeline<VibraphoneVibratoEnabledE>(
			(e) => e.enabled
		),
		vibratoSpeed: new LoneTimeline<VibraphoneVibratoSpeedE>(),
	};
	extra = {
		channelMute: mapArrayToObj(
			channelGroups,
			() => new SegmentTimeline<MuteE>((e) => e.mute)
		),
		bpm: new CurveTimeline<BpmE>(
			(e) => e.bpm,
			() => true
		),
		flywheelConnected: new SegmentTimeline<FlywheelConnectedE>(
			(e) => e.connected
		),
	};
	hiHatMachine = {
		mode: new LoneTimeline<HiHatMachineModeE>(),
	};
}
