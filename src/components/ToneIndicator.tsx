import { useContext } from "solid-js";
import { AppContext } from "../app";

export const ToneIndicator = () => {
	const app = useContext(AppContext);
	const loaded = app.soundEmitter.toneLoaded;

	return (
		<div
			style={{
				position: "absolute",
				background: loaded.v ? "lime" : "red",
				fontSize: 12,
				padding: 5,
				borderRadius: 8,
				transition: "0.5s",
				userSelect: "none",
			}}
		>
			{loaded.v ? "Tone Loaded" : "Tone Not Loaded"}
		</div>
	);
};
