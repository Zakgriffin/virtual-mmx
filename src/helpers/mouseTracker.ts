import { Point } from "./functions";
import { s } from "./solid";

export class MouseTracker {
	private element?: SVGRectElement | SVGSVGElement;
	mousePos = s<Point | undefined>(undefined);
	scale = s({ x: (val: number) => val, y: (val: number) => val });

	setElement(element: SVGRectElement | SVGSVGElement) {
		this.element = element;

		element.addEventListener("mousemove", (e) =>
			this.mouseMove(e as MouseEvent)
		);
		element.addEventListener("mouseleave", () => this.mousePos.set(undefined));
		// TODO unsubscribe
		element.addEventListener("change", () => console.log("change"));
	}

	private mouseMove(e: MouseEvent) {
		const box = this.element?.getBoundingClientRect();
		if (!box) return;
		const x = this.scale.v.x(e.clientX - box.left);
		const y = this.scale.v.y(e.clientY - box.top);
		this.mousePos.set({ x, y });
	}

	forceUpdate(e: MouseEvent) {
		this.mouseMove(e);
	}
}
