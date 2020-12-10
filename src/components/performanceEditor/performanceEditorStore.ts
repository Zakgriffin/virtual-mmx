import { s } from "../../helpers/solid";
import { PerformanceAction } from "./other";

export class PerformanceEditorStore {
	performanceActions: PerformanceAction[] = [
		"Muting Levers",
		"Bass Capo",
		"Hihat Opening",
	];

	selectedAction = s<PerformanceAction | undefined>(this.performanceActions[1]);

	setAction(action: PerformanceAction) {
		this.selectedAction.set(action);
	}

	open = s(false);

	show = () => {
		this.open.set(true);
	};
	hide() {
		this.open.set(false);
	}
	toggleShow() {
		this.open.v ? this.hide() : this.show();
	}
}
