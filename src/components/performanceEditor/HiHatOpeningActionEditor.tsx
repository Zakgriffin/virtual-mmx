import { useContext } from "solid-js";
import { AppContext } from "../../app";
import { range } from "../../helpers/functions";

export const HiHatOpeningActionEditor = () => {
	const app = useContext(AppContext);

	const timeline = app.performance.stateChange.hihat.hatOpen;
	const axisValues = range(0, 60, 10);

	return <g>{/* <LabelAxis axisValues={this.axisValues} /> */}</g>;
};
