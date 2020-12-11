import { GroupLever } from "./GroupLever";
import { Connector } from "./Connector";
import { ChannelGroupTOFIX } from "../../toFutureSchema";
import { useContext, For } from "solid-js";
import { AppContext } from "../../app";
import { entries, range } from "../../helpers/functions";

export const MutingLevers = () => {
	const app = useContext(AppContext);

	const mute = app.machineState.extra.mute;
	const channelMute =
		app.eventReactionHandler.stateChangeObservers.extra.channelMute;

	const muteOf = (channelGroup: ChannelGroupTOFIX) => ({
		observable: channelMute[channelGroup],
		current: () => mute[channelGroup].v ?? false,
	});

	const levers = {
		B: muteOf("bass"),
		H: muteOf("hihat"),
		S: muteOf("snare"),
		K: muteOf("bassdrum"),
		C: muteOf("crash"),
		V: muteOf("vibraphone"),
	};
	// setMuted: (muted: boolean) => {
	// 	timelines[channelGroup].triggerEvent(
	// 		new MuteE({ mute: muted, tick: -1 })
	// 	);

	// },
	return (
		<svg
			viewBox={`-150 -50 ${300} ${100}`}
			style={{
				width: "100%",
				height: "100%",
			}}
		>
			<For each={range(0, 5)}>{(offset) => <Connector offset={offset} />}</For>

			<For each={entries(levers)}>
				{([char, { observable, current }], offset) => (
					<GroupLever
						offset={offset()}
						char={char}
						current={current}
						observable={observable}
					/>
				)}
			</For>
		</svg>
	);
};
