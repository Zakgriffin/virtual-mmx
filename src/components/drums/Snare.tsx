import { useContext } from "solid-js";
import { AppContext } from "../../app";
import { SpringPhysics } from "../../helpers/springPhysics";

export const Snare = () => {
	const app = useContext(AppContext);

	const pulse = new SpringPhysics();
	const snareObserver = app.eventReactionHandler.dropEventObservers.drums.snare;

	snareObserver.addEventListener(animateHit);

	pulse.damping = 20;
	pulse.stiffness = 300;

	function handlePress() {
		snareObserver.triggerEvent({});
		animateHit();
	}

	function animateHit() {
		pulse.applyCollision(1);
	}

	return (
		<g
			style={{
				transform: `translate(53px, 57px) scale(${pulse.value + 1})`,
				cursor: "pointer",
			}}
			onMouseDown={handlePress}
		>
			<circle r={24} fill="rgb(144, 144, 144)" />
			<circle r={22} fill="rgb(51, 51, 51)" />
			<circle r={16.5} fill="rgb(247, 247, 247)" />
		</g>
	);
};
