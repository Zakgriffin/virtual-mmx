import { Fret } from "./Fret";
import { String } from "./String";
import { BassDisplayStore } from "./bassDisplay";
import { FretFinger } from "./FretFinger";
import { BassString } from "vmmx-schema";
import { MouseTracker } from "../../helpers/mouseTracker";
import { useContext, createContext, For } from "solid-js";
import { AppContext } from "../../app";
import { values, range } from "../../helpers/functions";
import { BassStringState } from "../../machineState/bass";
import { EventObservable } from "../../eventHandling/eventObserver";
import { BassCapoE } from "../../eventHandling/concrete";

export const BassContext = createContext<{
	bass: BassDisplayStore;
	mouse: MouseTracker;
}>();

export const Bass = () => {
	const app = useContext(AppContext);

	const bass = new BassDisplayStore();
	const mouse = new MouseTracker();
	const stringStates = app.machineState.bass.stringStates;
	const stringObservables = app.eventReactionHandler.stateChangeObservers.bass;

	/** Circle markings for each fret on bass neck */
	const fretDatas = range(1, bass.totalFrets + 1).map((n) => {
		let markings: number[] = [];
		if (n === 12) markings = [1.5, 3.5];
		else if (n % 2 === 1 && ![11, 13, 1].includes(n)) markings = [2.5];
		return {
			fret: n,
			markings,
		};
	});

	// currently hovered bass string or undefined
	const hoveredString = ():
		| [BassStringState, EventObservable<BassCapoE>]
		| undefined => {
		const m = mouse.mousePos.v;
		if (!m) return;
		const percentX = m.x / bass.viewWidth;
		const hoveredStringNumber = Math.ceil(percentX * 4) as BassString;
		return [
			stringStates[hoveredStringNumber],
			stringObservables.capo[hoveredStringNumber],
		];
	};

	// handle mouse wheel scrolling
	function handleWheel(e: WheelEvent) {
		const h = hoveredString();
		if (!h) return;
		const [state, obs] = h;
		obs.triggerEvent({ moveFret: state.capo.v + (e.deltaY > 0 ? 1 : -1) });
	}

	let fretBoardRef!: SVGSVGElement;
	const jsx = (
		<BassContext.Provider value={{ bass, mouse }}>
			<svg
				viewBox={`0 0 ${bass.viewWidth} ${bass.viewHeight}`}
				style={{
					width: bass.viewWidth + "px",
					height: bass.viewHeight + "px",
				}}
				ref={fretBoardRef}
				onWheel={handleWheel}
			>
				<rect
					rx={20}
					ry={6}
					width={bass.viewWidth}
					height={bass.viewHeight}
					fill="rgb(241, 221, 189, 1)"
				/>
				<For each={fretDatas}>
					{(fretData) => (
						<Fret fret={fretData.fret} markings={fretData.markings} />
					)}
				</For>
				<For each={values(stringStates)}>
					{(stringStore) => <String stringStore={stringStore} />}
				</For>
				<FretFinger />
			</svg>
		</BassContext.Provider>
	);
	mouse.setElement(fretBoardRef);
	return jsx;
};
