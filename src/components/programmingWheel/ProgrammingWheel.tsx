import { ProgramGrid } from "./ProgramGrid";
import { PegPlacer } from "./PegPlacer";
import { PlaybackHead } from "./PlaybackHead";
import { ProgrammingWheelDisplayStore } from "./programmingWheelDisplay";
import { GearSide } from "./GearSide";
import { BottomBar } from "./bottomBar/BottomBar";
import { useContext, createContext } from "solid-js";
import { ScrollContainerStore } from "../scrollContainerStore";
import ResizeObserver from "resize-observer-polyfill";
import { AppContext } from "../../app";
import { mapValue } from "../../helpers/functions";
import { MouseTracker } from "../../helpers/mouseTracker";
import { s } from "../../helpers/solid";
import { ScrollBody } from "../Scroll";

export const ProgrammingWheelContext = createContext<{
	wheel: ProgrammingWheelDisplayStore;
	scroll: ScrollContainerStore;
	mouse: MouseTracker;
}>();

export const ProgrammingWheel = () => {
	const app = useContext(AppContext);

	const pixelsPerTick = s(0.2);
	const mouse = new MouseTracker();
	const wheel = new ProgrammingWheelDisplayStore(app);
	const scrollPixelsPerUnitWidth = s(0);
	const scroll = new ScrollContainerStore({
		x: {
			pixelsPerUnit: scrollPixelsPerUnitWidth,
			visiblePixelRange: wheel.visiblePixelWidth,
		},
		y: {
			pixelsPerUnit: s(pixelsPerTick.v),
			visiblePixelRange: wheel.visiblePixelHeight,
			total: wheel.totalTicks,
		},
		circular: true,
	});
	// const scrollSpring = new SpringPulse();
	mouse.scale.set({
		x: scroll.x.fromPixel,
		y: (v) => scroll.y.fromPixel(v) + scroll.y.visibleLeast.v,
	});

	// scrollSpring.damping = 30;
	// scrollSpring.stiffness = 300;

	function handleScroll(e: WheelEvent) {
		if (e.shiftKey) {
			const factor = mapValue(e.deltaY, -10, 10, 1.1, 0.9);
			scroll.y.zoom(factor, mouse.mousePos.v?.y ?? 0);
		} else {
			switch (e.deltaMode) {
				// All non firefox browsers return delta in pixels
				case WheelEvent.DOM_DELTA_PIXEL:
					scroll.y.scroll(e.deltaY);
					break;
				case WheelEvent.DOM_DELTA_LINE:
					// Why, firefox, why? -.-
					// The * 30 is just a rough guess on my pc, maybe we need a more
					// intelligent way to calculate the value
					// (e.g. the one from https://stackoverflow.com/a/37474225)
					scroll.y.scroll(e.deltaY * 30);
					break;
				case WheelEvent.DOM_DELTA_PAGE:
					// Use hardcoded value this is really fucked up to calculate.
					// See above link why.
					scroll.y.scroll(100);
			}
		}
		mouse.forceUpdate(e);
	}

	let mouseRef!: SVGSVGElement;
	const jsx = (
		<ProgrammingWheelContext.Provider value={{ wheel, scroll, mouse }}>
			<div
				style={{
					display: "grid",
					width: "100%",
					height: "100%",
					"place-items": "center",
				}}
			>
				<div
					style={{
						display: "grid",
						height: "90%",
						width: "90%",
						"grid-template-rows": "1fr 12fr 1fr",
					}}
				>
					<div style={{ background: "#ccc" }}></div>
					<div
						style={{ display: "grid", "grid-template-columns": "1fr 18fr 1fr" }}
					>
						<GearSide />
						<svg
							style={{ width: "100%", height: "100%" }}
							onWheel={handleScroll}
							ref={mouseRef}
						>
							<MovingWindow />
						</svg>
						<GearSide />
					</div>
					<BottomBar />
				</div>
			</div>
		</ProgrammingWheelContext.Provider>
	);

	mouse.setElement(mouseRef);
	new ResizeObserver(() => {
		// this API sucks and doesn't work right
		const box = mouseRef.getBoundingClientRect();
		wheel.visiblePixelWidth.set(box.width);
		wheel.visiblePixelHeight.set(box.height);
		scrollPixelsPerUnitWidth.set(
			wheel.visiblePixelWidth.v / wheel.displayChannels.length
		);
	}).observe(mouseRef);

	return jsx;
};

const MovingWindow = () => {
	const { scroll } = useContext(ProgrammingWheelContext);

	return (
		<ScrollBody scroll={scroll}>
			<ProgramGrid />
			<PegPlacer />
			<PlaybackHead />
			<line x2={scroll.x.visiblePixelRange.v} stroke="red" />
		</ScrollBody>
	);
};
