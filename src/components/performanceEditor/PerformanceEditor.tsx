import { TimelineTabs } from "./TimelineTab";
import { createContext, createDependentEffect } from "solid-js";
import { ScrollContainerStore } from "../scrollContainerStore";
import { PerformanceEditorStore } from "./performanceEditorStore";
import { ScrollableTimeline } from "./ScrollableTimeline";
import { s } from "../../helpers/solid";
import { SpringPhysics } from "../../helpers/springPhysics";

export const PerformanceEditorContext = createContext<{
	perf: PerformanceEditorStore;
	scroll: ScrollContainerStore;
}>();

export const PerformanceEditor = () => {
	const perf = new PerformanceEditorStore();
	const scroll = new ScrollContainerStore({
		x: {
			pixelsPerUnit: s(1),
			visiblePixelRange: s(500),
		},
	});
	const showSpring = new SpringPhysics();

	showSpring.damping = 50;
	showSpring.stiffness = 300;
	showSpring.snapTo(130);

	createDependentEffect(() => {
		showSpring.moveTo(perf.open.v ? 0 : 130);
	}, [() => perf.open.v]);

	return (
		<PerformanceEditorContext.Provider value={{ perf, scroll }}>
			<div
				style={{
					position: "absolute",
					width: "100%",
					bottom: "0px",
					transform: `translateY(${showSpring.value}px)`,
					"pointer-events": "none",
				}}
			>
				<TimelineTabs />
				<ScrollableTimeline />
			</div>
		</PerformanceEditorContext.Provider>
	);
};
