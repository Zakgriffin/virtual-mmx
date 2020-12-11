import { useContext } from "solid-js";
import { AppContext } from "../../app";
import { SpringPhysics } from "../../helpers/springPhysics";

export const HiHat = () => {
	const app = useContext(AppContext);

	const pulse = new SpringPhysics();
	const hihatTimelines =
		app.eventReactionHandler.dropEventObservers.drums.hihat;

	hihatTimelines.addEventListener(animateHit);

	pulse.damping = 20;
	pulse.stiffness = 300;

	function handlePress() {
		hihatTimelines.triggerEvent({});
		animateHit();
	}

	function animateHit() {
		pulse.applyCollision(1);
	}

	return (
		<g
			style={{
				transform: `translate(59.5px, 21.5px) scale(${pulse.value + 1})`,
				cursor: "pointer",
			}}
			onMouseDown={handlePress}
		>
			<circle
				r={19.5}
				fill="rgb(253, 227, 165)"
				stroke="rgb(209, 179, 107)"
				strokeWidth={1}
			/>
			<circle r={2.5} fill="rgb(125, 125, 125)" />
		</g>
	);
};
