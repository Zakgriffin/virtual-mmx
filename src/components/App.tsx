import React, { Component, ReactNode } from "react";
import { TransportControls } from "./transportControls/TransportControls";
import { Vibraphone } from "./vibraphone/Vibraphone";
import { Drums } from "./drums/Drums";
import { HiHatMachine } from "./hiHatMachine/HiHatMachine";
import { Bass } from "./bass/Bass";
import { AppStore } from "../stores/app";
import { Provider } from "mobx-react";
import { ProgrammingWheel } from "./programmingWheel/ProgrammingWheel";
import sampleProgram from "../sampleProgram.json";
import { Program } from "vmmx-schema";
import { Crank } from "./crank/Crank";
import { MutingLevers } from "./mutingLevers/MutingLevers";
import { MuteE, CapoE } from "../core/eventTimelines/concrete";
import { VmmxHeader } from "./programmingWheel/VmmxHeader/VmmxHeader";
import { PerformanceEditor } from "./performanceEditor/PerformanceEditor";
import { ToneIndicator } from "./ToneIndicator";

const app = new AppStore();
app.loadProgram(sampleProgram as Program);
const mute = app.performance.eventTimelines.machine.channelMute;

const debugAddMute = (m: boolean, tick: number) => {
	const difs = mute.vibraphone.getAddDifs(new MuteE({ mute: m, tick }));
	if (difs) {
		mute.vibraphone.applyDifs(difs);
	} else {
		console.log("Cant place");
	}
};

debugAddMute(true, 500);
debugAddMute(false, 700);

const capo = app.performance.eventTimelines.bass.capo[1];
const debugAddCapo = (moveFret: number, tick: number) => {
	const difs = capo.getAddDifs(new CapoE({ moveFret, tick }));
	if (difs) {
		capo.applyDifs(difs);
	} else {
		console.log("Cant place");
	}
};

debugAddCapo(0, 100);
debugAddCapo(2, 200);
debugAddCapo(15, 500);
debugAddCapo(8, 640);

export class App extends Component {
	headerPercent = 6;

	render() {
		return (
			<Provider app={app}>
				<div style={{ position: "absolute", width: "100%", height: "100%" }}>
					<VmmxHeader headerPercent={this.headerPercent} />

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "33% 14% 14% 15% 24%",
							gridTemplateRows: "18% 28% 23% 31%",
							height: `${100 - this.headerPercent}%`,
							backgroundColor: "#f3f3f3ff",
						}}
					>
						<GridLayout col="1/4" row="1/4">
							<ProgrammingWheel />
						</GridLayout>
						<GridLayout col="1/2" row="4/5">
							<Vibraphone />
						</GridLayout>
						<GridLayout col="2/3" row="4/5">
							<Drums />
						</GridLayout>
						<GridLayout col="3/4" row="4/5">
							<HiHatMachine />
						</GridLayout>
						<GridLayout col="4/5" row="1/5">
							<Bass />
						</GridLayout>
						<GridLayout col="5/6" row="1/2">
							<MutingLevers />
						</GridLayout>
						<GridLayout col="5/6" row="2/3">
							<Crank />
						</GridLayout>
						<GridLayout col="5/6" row="3/4">
							<></>
						</GridLayout>
						<GridLayout col="5/6" row="4/5">
							<TransportControls />
						</GridLayout>
					</div>
					<PerformanceEditor />
				</div>
			</Provider>
		);
	}
}

interface GridLayoutProps {
	col: string;
	row: string;
	children?: ReactNode;
}

const GridLayout = (props: GridLayoutProps) => (
	<div
		style={{
			display: "flex",
			background: "none",
			padding: "0px",
			border: "#cccccc 1px solid",
			gridColumn: props.col,
			gridRow: props.row,
			alignContent: "center",
			justifyContent: "center",
			alignItems: "center",
			justifyItems: "center",
		}}
	>
		{props.children}
	</div>
);
