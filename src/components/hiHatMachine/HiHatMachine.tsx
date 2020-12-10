import { HiHatMachineMode } from "../../toFutureSchema";
import { ModeSelector } from "./ModeSelector";
import { HiHatMachineBrass } from "./HiHatMachineBrass";
import { SpringPhysics } from "../../helpers/springPhysics";
import { s } from "../../helpers/solid";

const hatRotation: Record<HiHatMachineMode, number> = {
	beat: -30,
	beatAndOffbeat: -20,
	offbeat: -10,
	offbeatAndSixteenth: 0,
	sixteenth: 10,
	sixteenthAndTriplet: 20,
	triplet: 30,
	off: 45,
};

export const HiHatMachine = () => {
	// Will move to store
	const currentMode = s<HiHatMachineMode>("beat");
	const rotationSpring = new SpringPhysics();

	rotationSpring.stiffness = 800;
	rotationSpring.damping = 100;
	rotationSpring.snapTo(hatRotation[currentMode.v]);

	function select(mode: HiHatMachineMode) {
		currentMode.set(mode);
		let rot = hatRotation[mode];
		if (mode === "off" && rotationSpring.value < 0) rot = -rot;
		rotationSpring.moveTo(rot);
	}

	return (
		<div
			style={{
				display: "grid",
				"place-items": "center",
				transform: "translate(0px, 85px)", // TODO temp fix
			}}
		>
			<div style={{ position: "relative", width: "80%" }}>
				<ModeSelector currentMode={currentMode} selectMode={select} />
				<HiHatMachineBrass angle={rotationSpring.value} />
			</div>
		</div>
	);
};
