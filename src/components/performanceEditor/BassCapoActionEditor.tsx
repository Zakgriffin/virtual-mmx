import { ValueTimeline } from "./ValueTimeline";
import { useContext } from "solid-js";
import { AppContext } from "../../app";
import { range } from "../../helpers/functions";
import { CurveTimelineContainer } from "./CurveTimelineContainer";

export const BassCapoActionEditor = () => {
	const app = useContext(AppContext);

	const capoTimeline = app.performance.stateChange.bass.capo[1];
	const axisValues = range(0, 20.1, 5);

	return (
		<ValueTimeline labels={axisValues}>
			{(valToPixel) => (
				<CurveTimelineContainer
					timeline={capoTimeline}
					shouldShow={() => true}
					colorOf={() => "#ff0000"}
					value={(e) => e.moveFret}
					valToPixel={valToPixel}
					newEventAt={(tick, moveFret) => ({ moveFret, tick })}
				/>
			)}
		</ValueTimeline>
	);
};
