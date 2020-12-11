import { Signal } from "../helpers/solid";
import { ScrollContainerStore } from "./scrollContainerStore";

interface ScrollProps {
	scroll: ScrollContainerStore;
	children: JSX.Element;
}

export const ScrollBody = (props: ScrollProps) => {
	const x = props.scroll.x;
	const y = props.scroll.y;
	return (
		<g
			transform={`translate(
				${-x.toPixel(x.visibleLeast.v)}, 
				${-y.toPixel(y.visibleLeast.v)}
			)`}
		>
			{props.children}
		</g>
	);
};

interface ScrollByProps {
	scroll: ScrollContainerStore;
	axis: "x" | "y";
	by: () => number;
	children: JSX.Element;
}

export const TranslateOnScroll = (props: ScrollByProps) => {
	const translateBy =
		props.axis === "x"
			? (x: number) => `translate(${x}, 0)`
			: (y: number) => `translate(0, ${y})`;
	const axis = props.scroll[props.axis];

	return (
		<g transform={translateBy(props.by() * axis.pixelsPerUnit.v)}>
			{props.children}
		</g>
	);
};
