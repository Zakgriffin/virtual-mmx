import { HiHatMachineMode } from "../toFutureSchema";

export type EmptyE = Record<string, unknown>;

export type TimelineEvent<E> = {
	tick: number;
	id: number;
} & E;

let untakenId = 0;
export function timelineEvent<E>(event: E, tick: number): TimelineEvent<E> {
	return Object.assign({ tick, id: untakenId++ }, event);
}

// export class DropTimeline<E extends DropE> extends LoneTimeline<E> {}
// export class DropE extends EventBase {}

// export class BassDropTimeline extends DropTimeline<BassDropE> {}
// export class BassDropE extends DropE {
// 	fret?: number;

// 	constructor(data: { fret?: number; tick: number }) {
// 		super(data.tick);
// 		this.fret = data.fret;
// 	}
// }

export interface BassDropE {
	fret?: number;
}

// export type DrumsDropTimeline = HiHatDropTimeline | DropTimeline<DropE>;
// export type DrumsDropE = HiHatDropE | DropE;
// export class HiHatDropE extends DropE {
// 	hatOpen?: number;

// 	constructor(data: { hatOpen?: number; tick: number }) {
// 		super(data.tick);
// 		this.hatOpen = data.hatOpen;
// 	}
// }
export interface HiHatDropE {
	hatOpen?: number;
}
// export class HiHatDropTimeline extends DropTimeline<HiHatDropE> {}

// export class VibraphoneDropTimeline extends DropTimeline<VibraphoneDropE> {}
// export class VibraphoneDropE extends DropE {}

// Mute
// export class MuteTimeline extends SegmentTimeline<MuteE> {
// 	value(event: MuteE) {
// 		return event.mute;
// 	}
// }
// export class MuteE extends EventBase {
// 	mute: boolean;

// 	constructor(data: { mute: boolean; tick: number }) {
// 		super(data.tick);
// 		this.mute = data.mute;
// 	}
// }
export interface MuteE {
	mute: boolean;
}

// VibraphoneEnabled
// export class VibraphoneVibratoEnabledEventTimeline extends SegmentTimeline<
// 	VibraphoneVibratoEnabledE
// > {
// 	value(event: VibraphoneVibratoEnabledE): boolean {
// 		return event.enabled;
// 	}
// }

// VibraphoneVibratoSpeed
// export class VibraphoneVibratoSpeedTimeline extends CurveTimeline<
// 	VibraphoneVibratoSpeedE
// > {
// 	value(event: VibraphoneVibratoSpeedE): number {
// 		return event.speed;
// 	}
// 	eventCanBePlacedOnCurve(
// 		_: VibraphoneVibratoSpeedE,
// 		_2: Curve<VibraphoneVibratoSpeedE> | null
// 	): boolean {
// 		return true;
// 	}
// }
// export class VibraphoneVibratoSpeedE extends EventBase {
// 	speed: number;

// 	constructor(data: { speed: number; tick: number }) {
// 		super(data.tick);
// 		this.speed = data.speed;
// 	}
// }

export interface VibraphoneVibratoSpeedE {
	speed: number;
}
// VibraphoneVibratoEnabled
// export class VibraphoneVibratoEnabledTimeline extends DropTimeline<
// 	VibraphoneVibratoEnabledE
// > {}
// export class VibraphoneVibratoEnabledE extends EventBase {
// 	enabled: boolean;

// 	constructor(data: { enabled: boolean; tick: number }) {
// 		super(data.tick);
// 		this.enabled = data.enabled;
// 	}
// }
export interface VibraphoneVibratoEnabledE {
	enabled: boolean;
}

// BassCapo
// export class BassCapoTimeline extends CurveTimeline<BassCapoE> {
// 	value(event: BassCapoE): number {
// 		return event.moveFret;
// 	}
// 	eventCanBePlacedOnCurve(
// 		event: BassCapoE,
// 		curve: Curve<BassCapoE> | null
// 	): boolean {
// 		return true;
// 	}
// }
// export class BassCapoE extends EventBase {
// 	moveFret: number;

// 	constructor(data: { moveFret: number; tick: number }) {
// 		super(data.tick);
// 		this.moveFret = data.moveFret;
// 	}
// }
export interface BassCapoE {
	moveFret: number;
}

// HiHatMachineMode
// export class HiHatMachineModeTimeline extends LoneTimeline<HiHatMachineModeE> {}
// export class HiHatMachineModeE extends EventBase {
// 	mode: HiHatMachineMode;

// 	constructor(data: { mode: HiHatMachineMode; tick: number }) {
// 		super(data.tick);
// 		this.mode = data.mode;
// 	}
// }
export interface HiHatMachineModeE {
	mode: HiHatMachineMode;
}

// HiHatOpen
// export class HiHatOpenTimeline extends LoneTimeline<HiHatOpenE> {}
// export class HiHatOpenE extends EventBase {
// 	open: number;

// 	constructor(data: { open: number; tick: number }) {
// 		super(data.tick);
// 		this.open = data.open;
// 	}
// }
export interface HiHatOpenE {
	open: number;
}

// Bpm
// export class BpmTimeline extends LoneTimeline<BpmE> {}
// export class BpmE extends EventBase {
// 	bpm: number;

// 	constructor(data: { bpm: number; tick: number }) {
// 		super(data.tick);
// 		this.bpm = data.bpm;
// 	}
// }
export interface BpmE {
	bpm: number;
}

// FlywheelConnected
// export class FlywheelConnectedTimeline extends LoneTimeline<BpmE> {}
// export class FlywheelConnectedE extends EventBase {
// 	connected: boolean;

// 	constructor(data: { connected: boolean; tick: number }) {
// 		super(data.tick);
// 		this.connected = data.connected;
// 	}
// }
export interface FlywheelConnectedE {
	connected: boolean;
}
