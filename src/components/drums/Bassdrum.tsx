import { useContext } from "solid-js";
import { AppContext } from "../../app";
import { SpringPhysics } from "../../helpers/springPhysics";

export const Bassdrum = () => {
	const app = useContext(AppContext);

	const pulse = new SpringPhysics();
	const bassdrumObserver =
		app.eventReactionHandler.dropEventObservers.drums.bassdrum;

	bassdrumObserver.addEventListener(animateHit);

	pulse.damping = 20;
	pulse.stiffness = 300;

	function handlePress() {
		bassdrumObserver.triggerEvent({});
	}

	function animateHit() {
		pulse.applyCollision(2);
	}

	return (
		<g
			style={{
				transform: `translate(27.3px, 35.3px) scale(${pulse.value + 1})`,
				cursor: "pointer",
			}}
			onMouseDown={handlePress}
		>
			<circle r={12} fill="rgb(195, 195, 195)" />
			<circle r={10} fill="rgb(247, 247, 247)" />
			<circle r={1.6} fill="rgb(99, 99, 99)" />
		</g>
	);
};
