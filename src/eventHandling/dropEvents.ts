import { mapArrayToObj } from "../helpers/functions";
import { bassStrings, vibraphoneBars } from "../toFutureSchema";
import { BassDropE, EmptyE, HiHatDropE } from "./concrete";
import { LoneTimeline } from "./eventTimelines/variations/lone";

export class DropEvents {
	bass = mapArrayToObj(bassStrings, () => new LoneTimeline<BassDropE>());
	drums = {
		hihat: new LoneTimeline<HiHatDropE>(),
		bassdrum: new LoneTimeline<EmptyE>(),
		snare: new LoneTimeline<EmptyE>(),
		crash: new LoneTimeline<EmptyE>(),
	};

	vibraphone = mapArrayToObj(vibraphoneBars, () => new LoneTimeline<EmptyE>());
}

// mapArrayToObj(drumTypes, (drumType) =>
// drumType === "hihat"
// 	? new LoneTimeline<HiHatDropE>()
// 	: new LoneTimeline<EmptyE>());
