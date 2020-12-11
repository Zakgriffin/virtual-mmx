import { VibraphoneBar } from "./VibraphoneBar";
import { createContext, useContext, For } from "solid-js";
import { VibraphoneDisplayStore } from "./vibraphoneDisplay";
import { TranslateGroup } from "../Translate";
import { AppContext } from "../../app";
import { values } from "../../helpers/functions";

export const VibraphoneContext = createContext<{
	vibra: VibraphoneDisplayStore;
}>();

export const Vibraphone = () => {
	const app = useContext(AppContext);
	const vibra = new VibraphoneDisplayStore();
	const barStates = app.machineState.vibraphone.barStates;

	return (
		<VibraphoneContext.Provider value={{ vibra }}>
			<svg
				viewBox={`0 0 ${vibra.wholeWidth} ${vibra.height}`}
				style={{
					width: "100%",
					height: "100%",
				}}
			>
				<TranslateGroup y={() => vibra.height / 2}>
					<For each={values(barStates)}>
						{(barStore) => <VibraphoneBar barStore={barStore} />}
					</For>
				</TranslateGroup>
			</svg>
		</VibraphoneContext.Provider>
	);
};
