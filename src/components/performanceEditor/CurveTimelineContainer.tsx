import { EventCurve } from "./EventCurve";
import { For, Show } from "solid-js";
import {
	Curve,
	CurveDif,
	CurveTimeline,
} from "../../eventHandling/eventTimelines/variations/curve";
import { mapValue } from "../../helpers/functions";
import { MouseTracker } from "../../helpers/mouseTracker";
import { s } from "../../helpers/solid";
import { TimelineEvent } from "../../eventHandling/concrete";

interface CurveTimelineContainerProps<E> {
	timeline: CurveTimeline<E>;
	shouldShow: (curve: Curve<TimelineEvent<E>>) => boolean;
	colorOf: (curve: Curve<TimelineEvent<E>> | null) => string;
	value: (event: E) => number;
	valToPixel: (value: number) => number;
	newEventAt: (tick: number, value: number) => E;
}

export function CurveTimelineContainer<E>(
	props: CurveTimelineContainerProps<E>
) {
	const hovering = s(false);
	const mouse = new MouseTracker();
	const dragging = s(false);
	const selectedEvent = s<TimelineEvent<E> | undefined>(undefined);
	const curves = props.timeline.curves;

	document.addEventListener("click", () => {
		if (curvesFromSplit()) {
			applySplit();
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Backspace" || e.key === "Delete") {
			removeSelected();
		}
	});

	function removeSelected() {
		if (!selectedEvent) return;
		const difs = props.timeline.getRemoveDifs(selectedEvent.v as E);
		if (!difs) return;
		props.timeline.applyDifs(difs);
		selectedEvent.set(undefined);
	}

	function handleMouseEnter() {
		hovering.set(true);
	}
	function handleMouseLeave() {
		hovering.set(false);
	}

	function setSelected(event: TimelineEvent<E> | undefined) {
		selectedEvent.set(event);
	}

	function setDragging(dragging: boolean) {
		dragging = dragging;
		if (dragging === true) {
			selectedEvent.set(undefined);
		}
	}

	const curvesFromSplit = () => {
		const m = mouse.mousePos.v;
		if (!m || selectedEvent) return null;
		const tick = m.x;
		const pad = 20;
		const val = mapValue(m.y, 150 - pad, pad, 0, 20);

		return props.timeline.getAddDifs(props.newEventAt(tick, val));
	};

	function applySplit() {
		if (!curvesFromSplit || dragging) return;
		props.timeline.applyDifs(curvesFromSplit() as CurveDif<E>[]);
	}

	let wholeRef!: SVGRectElement;
	const jsx = (
		<g>
			<rect
				ref={wholeRef}
				width={9000}
				height={150}
				fill="#0000"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			/>
			<Show when={selectedEvent.v}>
				<circle
					r={12}
					cx={selectedEvent.v?.tick}
					cy={props.valToPixel(props.value(selectedEvent.v!))}
					fill={props.colorOf(null) + "33"}
				/>
			</Show>

			<For each={curves}>
				{(curve, ind) => {
					const i = ind();
					const start = {
						left: i > 0 ? curves[i - 1].start.tick : 0,
						right: curve.end?.tick ?? Infinity,
					};
					const end = {
						left: curve.start.tick,
						right:
							i < curves.length - 1
								? curves[i + 1].start?.tick ?? Infinity
								: Infinity,
					};

					return (
						<EventCurve
							curve={curve}
							bounds={{ start, end }}
							setSelected={setSelected}
							selectedEvent={selectedEvent.v}
							dragging={dragging.v}
							setDragging={setDragging}
							shouldShow={props.shouldShow}
							colorOf={props.colorOf}
							value={props.value}
							valToPixel={props.valToPixel}
						/>
					);
				}}
			</For>

			{curvesFromSplit && mouse.mousePos && !dragging && (
				<>
					<circle
						cx={mouse.mousePos.v?.x}
						cy={mouse.mousePos.v?.y}
						r={8}
						fill={props.colorOf(null) + "33"}
						pointerEvents="none"
					/>
					<For each={curvesFromSplit() || []}>
						{(curveDif) => {
							if (curveDif.type !== "split") return;
							const c = curveDif.curve;
							const y = (event: E) => {
								return props.valToPixel(props.value(event));
							};
							const yAt = y(curveDif.at);

							return (
								<g>
									<line
										x1={c.start.tick}
										y1={y(c.start)}
										x2={curveDif.at.tick}
										y2={yAt}
										stroke={props.colorOf(null) + "33"}
										strokeWidth={3}
										pointerEvents="none"
									/>
									<line
										x1={curveDif.at.tick}
										y1={yAt}
										x2={c.end?.tick ?? 9000} // TODO not fixed
										y2={c.end ? y(c.end) : yAt}
										stroke={props.colorOf(null) + "33"}
										strokeWidth={3}
										pointerEvents="none"
									/>
								</g>
							);
						}}
					</For>
				</>
			)}
		</g>
	);
	mouse.setElement(wholeRef);
	return jsx;
}
