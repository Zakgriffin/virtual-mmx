import { MuteActionEditor } from "./MuteActionEditor";
import { HiHatOpeningActionEditor } from "./HiHatOpeningActionEditor";
import { BassCapoActionEditor } from "./BassCapoActionEditor";
import { useContext } from "solid-js";
import { PerformanceEditorContext } from "./PerformanceEditor";
import { AppContext } from "../../app";

export const ScrollableTimeline = () => {
	const app = useContext(AppContext);
	const { perf, scroll } = useContext(PerformanceEditorContext);

	const height = 180;
	const tick = app.player.currentTick;

	const actionEditor = () => {
		const action = perf.selectedAction.v;
		if (!action) return;
		if (action === "Muting Levers") {
			return <MuteActionEditor />;
		} else if (action === "Hihat Opening") {
			return <HiHatOpeningActionEditor />;
		} else if (action === "Bass Capo") {
			return <BassCapoActionEditor />;
		}
	};

	function handleWheel(e: WheelEvent) {
		scroll.x.scroll(e.deltaY);
	}

	return (
		<svg
			style={{ width: "100%", "user-select": "none", "pointer-events": "auto" }}
			onWheel={handleWheel}
		>
			<rect width={2000} height={150} fill="#d9d9d9" /> {/*TODO not fixed*/}
			{actionEditor}
			<line
				x1={tick.v}
				x2={tick.v}
				y2={height}
				stroke="#6dcf43"
				strokeWidth={2}
			/>
		</svg>
	);
};
