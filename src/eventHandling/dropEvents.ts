import { mapArrayToObj } from "../helpers/functions";
import { bassStrings, drumTypes, vibraphoneBars } from "../toFutureSchema";
import { BassDropE, HiHatDropE } from "./concrete";
import { LoneTimeline } from "./eventTimelines/variations/lone";

export class DropEvents {
	bass = mapArrayToObj(bassStrings, () => new LoneTimeline<BassDropE>());
	drums = mapArrayToObj(drumTypes, (drumType) =>
		drumType === "hihat" ? new LoneTimeline<HiHatDropE>() : new LoneTimeline()
	);
	vibraphone = mapArrayToObj(vibraphoneBars, () => new LoneTimeline());
}
