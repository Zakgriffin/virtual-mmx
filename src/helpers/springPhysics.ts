import { s } from "./solid";

export class SpringPhysics {
	stiffness = 100; // kg/s^2
	damping = 0; // kg/s
	mass = 1;

	private x = s(0);
	private velocity = 0;
	private restingValue = 0;

	private tolerance = 0.001;

	private updating = false;
	private lastTime = 0;

	get value() {
		return this.x.v;
	}

	private startUpdating() {
		if (this.updating) return;
		this.updating = true;
		this.update(this.lastTime);
	}

	private update = (timeMillis: number) => {
		const time = timeMillis / 1000;
		const timeDelta = 1 / 60; // time - this.lastTime; -> TODO using animationFrame times had issues
		this.lastTime = time;
		const displaced = this.x.v - this.restingValue;
		const f = -displaced * this.stiffness;
		const damp = this.damping * this.velocity;
		const a = (f - damp) / this.mass;
		this.velocity += a * timeDelta;
		this.x.set(this.x.v + this.velocity * timeDelta);
		if (
			Math.abs(this.velocity) > this.tolerance ||
			Math.abs(displaced) > this.tolerance
		) {
			requestAnimationFrame(this.update);
		} else {
			this.x.set(this.restingValue);
			this.updating = false;
		}
	};

	applyCollision(impulse: number) {
		this.velocity += impulse / this.mass;
		this.startUpdating();
	}

	moveTo(restingValue: number) {
		this.restingValue = restingValue;
		this.startUpdating();
	}

	snapTo(restingValue: number) {
		const offset = this.x.v - this.restingValue;
		this.restingValue = restingValue;
		this.x.set(restingValue + offset);
		this.startUpdating();
	}
}
