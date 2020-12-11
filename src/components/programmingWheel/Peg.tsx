import { useContext } from "solid-js";
import { mapValue } from "../../helpers/functions";
import { ProgrammingWheelContext } from "./ProgrammingWheel";

interface PegProps {
	pegTick: number;
	activeDivision: boolean;
	spawnsEvent: boolean;
	click?: () => void;
}

export const Peg = (props: PegProps) => {
	const { wheel, scroll } = useContext(ProgrammingWheelContext);

	function w() {
		return 10;
	}
	function h() {
		const hNormal = scroll.y.toPixel(wheel.ticksPerNoteSubdivision()) - 5;
		return Math.min(20, Math.max(hNormal, 5));
	}
	function shift() {
		const offset = wheel.pegOffsetFunction()(props.pegTick);
		const end = scroll.x.toPixel(1) - w();
		return mapValue(offset, 0, 1, 0, end);
	}

	return (
		<rect
			width={w()}
			height={h()}
			fill={props.activeDivision ? "#ccc" : "#ccc9"}
			x={shift()}
			rx={3}
			style={{ cursor: "pointer" }}
			onClick={props.click}
		/>
	);
};
