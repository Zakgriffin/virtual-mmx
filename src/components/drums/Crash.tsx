import React from "react";
import { DrumsComponent } from "../storeComponents";
import { ForcePulse } from "../../core/helpers/pulse";
import { computed, action } from "mobx";

class Crash_ extends DrumsComponent {
	pulse = new ForcePulse();

	componentDidMount() {
		this.crashTimelines.addJointEventListener(this.animateHit);

		this.pulse.tension = 1;
	}

	@computed get crashTimelines() {
		return this.app.jointTimelines.drums.crash;
	}

	handlePress = () => {
		this.crashTimelines.performance.triggerEvent();
		this.animateHit();
	};

	@action.bound animateHit() {
		this.pulse.applyCollision(4);
	}

	render() {
		return (
			<g
				style={{
					transform: `translate(50px, 91px) rotate(${this.pulse.x}deg)`,
				}}
				onMouseDown={this.handlePress}
			>
				<ellipse
					rx={34}
					ry={8}
					fill="rgb(253, 227, 165)"
					stroke="rgb(209, 179, 107)"
					strokeWidth={1}
				/>

				<rect
					x={-4}
					y={-2}
					width={8}
					height={4}
					rx={2}
					fill="rgb(111, 111, 111)"
				/>
			</g>
		);
	}
}
export const Crash = DrumsComponent.sync(Crash_);
