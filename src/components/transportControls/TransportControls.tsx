import { PlayPauseButton } from "./PlayPauseButton";
import { RestartButton } from "./RestartButton";
import { RecordButton } from "./RecordButton";
import { useContext } from "solid-js";
import { AppContext } from "../../app";
import { s } from "../../helpers/solid";

export const TransportControls = () => {
	const app = useContext(AppContext);
	const recording = s(false);
	const player = app.player;

	function togglePlay() {
		if (player.running.v) {
			player.pause();
		} else {
			player.play();
		}
	}
	function toggleRecord() {
		recording.set(!recording.v);
	}

	return (
		<div
			style={{
				"background-color": "rgb(225, 225, 225)",
				// border: "1px solid rgb(195, 195, 195)",
				"border-radius": "10px",
				width: "92%",
				height: "92%",
				padding: "10px",
			}}
		>
			<div
				style={{
					display: "flex",
					"background-color": "#ccccccff",
					"border-radius": "8px",
					padding: "5px",
				}}
			>
				<PlayPauseButton togglePlay={togglePlay} running={player.running.v} />
				<RecordButton toggleRecord={toggleRecord} recording={recording.v} />
				<RestartButton restart={player.restart} />
			</div>
		</div>
	);
};
