import { Peg } from "./Peg";
import { For, useContext } from "solid-js";
import { ProgrammingWheelContext } from "./ProgrammingWheel";
import { TranslateOnScroll } from "../Scroll";
import { LoneTimeline } from "../../eventHandling/eventTimelines/variations/lone";
import { EmptyE } from "../../eventHandling/concrete";

interface ChannelPegsProps {
	timeline: LoneTimeline<EmptyE>;
}

export const ChannelPegs = (props: ChannelPegsProps) => {
	const { scroll } = useContext(ProgrammingWheelContext);
	// const visiblePegs = scroll.y.visibleArrayOf(props.timeline.events, (e) =>
	// 	e ? e.tick() : 0
	// );

	return (
		<>
			<For each={props.timeline.events.v}>
				{(peg) => (
					<MaybeRenderedPeg pegTick={peg.tick} timeline={props.timeline} />
				)}
			</For>
			<TranslateOnScroll scroll={scroll} axis="y" by={scroll.y.total}>
				<For each={props.timeline.events.v}>
					{(peg) => (
						<MaybeRenderedPeg pegTick={peg.tick} timeline={props.timeline} />
					)}
				</For>
			</TranslateOnScroll>
		</>
	);
};

interface MaybeRenderedPegProps {
	pegTick: number;
	timeline: LoneTimeline<EmptyE>;
}

export const MaybeRenderedPeg = (props: MaybeRenderedPegProps) => {
	const { wheel, scroll } = useContext(ProgrammingWheelContext);

	function removePeg() {
		const t = props.timeline;
		const event = t.events.v.find((e) => e.tick === props.pegTick);
		if (!event) return;
		const difs = t.getRemoveDifs(event);
		if (!difs) return;
		t.applyDifs(difs);
	}
	function activeDivision() {
		return props.pegTick % wheel.ticksPerNoteSubdivision() === 0;
	}

	return (
		<TranslateOnScroll scroll={scroll} axis="y" by={() => props.pegTick}>
			<Peg
				pegTick={props.pegTick}
				activeDivision={activeDivision()}
				spawnsEvent={true}
				click={removePeg}
			/>
		</TranslateOnScroll>
	);
};
