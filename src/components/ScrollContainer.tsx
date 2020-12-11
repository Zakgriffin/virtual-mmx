import { createMemo, For } from "solid-js";
import { findIndexEnhanced } from "../helpers/functions";
import { s, Signal } from "../helpers/solid";
import { Line } from "./Line";

interface ScrollContainerProps<T> {
	start: Signal<number>;
	span: Signal<number>;
	data: Signal<T[]>;
	getValue(item: T): number;
	children: (e: number) => JSX.Element;
}

export function ScrollContainer<T>(props: ScrollContainerProps<T>) {
	const v = props.getValue;
	const sc = s(1);
	// setInterval(() => {
	//   setS(s() + 0.1);
	// }, 200);
	const scale = createMemo(() => (n: number) => {
		return n * sc.v;
	});

	const dataInit = props.data.v;
	let startIndex =
		findIndexEnhanced(dataInit, (d) => v(d) >= props.start.v) ?? 0;

	let endIndex = Math.max(
		0,
		(findIndexEnhanced(dataInit, (d) => v(d) > props.start.v + props.span.v) ??
			dataInit.length) - 1
	);
	let lastStart = dataInit[startIndex];
	let lastEnd = dataInit[endIndex];

	const visibleData = createMemo(() => {
		const data = props.data.v;

		const end = props.start.v + props.span.v;
		const start = props.start.v;

		const backSearch = (bound: number, index: number) => {
			return (
				(findIndexEnhanced(data, (e) => v(e) < bound, index, "backward") ??
					-1) + 1
			);
		};
		const frontSearch = (bound: number, index: number) => {
			return (
				(findIndexEnhanced(data, (e) => v(e) > bound, index, "forward") ??
					data.length) - 1
			);
		};

		if (start > v(lastStart)) {
			// remove some off front
			startIndex = frontSearch(start, startIndex);
		} else if (start < v(lastStart)) {
			// add some to front
			startIndex = backSearch(start, startIndex);
		}

		if (end > v(lastEnd)) {
			// add some to end
			endIndex = frontSearch(end, endIndex);
		} else if (end < v(lastEnd)) {
			// remove some from end
			endIndex = backSearch(end, endIndex);
		}

		lastStart = data[startIndex];
		lastEnd = data[endIndex];
		return data.slice(startIndex, endIndex + 1);
	});

	return (
		<svg style={{ width: 500, height: 500 }}>
			<rect width={500} height={500} fill="#0003" />
			<Line color="green" at={scale()(props.start.v)} />
			<Line color="purple" at={scale()(props.start.v + props.span.v)} />

			<For each={visibleData()}>
				{(e) => createMemo(() => props.children(scale()(v(e))))}
			</For>
		</svg>
	);
}
