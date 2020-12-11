import { ChannelGroupTOFIX } from "../../toFutureSchema";
import { StackedTimeline } from "./StackedTimelines";
import { useContext } from "solid-js";
import { AppContext } from "../../app";
import { keys } from "../../helpers/functions";
import { CurveTimelineContainer } from "./CurveTimelineContainer";

export const MuteActionEditor = () => {
	const app = useContext(AppContext);

	const timelines = app.performance.stateChange.extra.channelMute;
	const colors: Record<ChannelGroupTOFIX, string> = {
		bass: "#85200c",
		vibraphone: "#1155cc",
		bassdrum: "#bf9000",
		hihat: "#ff3300",
		snare: "#9900ff",
		crash: "#00ff00",
	};

	return (
		<StackedTimeline labels={keys(timelines)}>
			{(label) => (
				// <CurveTimelineContainer
				// 	timeline={timelines[label]}
				// 	shouldShow={(c) => c.start.mute}
				// 	colorOf={() => colors[label]}
				// 	value={() => 1}
				// 	valToPixel={() => 0}
				// 	newEventAt={(tick) => new MuteE({ mute: true, tick })}
				// />
				<div />
			)}
		</StackedTimeline>
	);
};
