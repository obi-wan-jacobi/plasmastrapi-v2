import CircuitDesignArea from '../entities/CircuitDesignArea';
import CreateGateCommand from '../commands/CreateGateCommand';
import { OnlyIfEntityHas, OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import Gate from '../entities/circuit-elements/Gate';
import GateCreationCaret from '../entities/tools/carets/GateCreationCaret';
import { MOUSE_EVENT } from '../../engine/enums/MOUSE_EVENT';
import MouseEventComponent from '../../engine/components/MouseEventComponent';
import MouseEventSystem, {
    OnMouseEvent,
} from '../../engine/abstracts/systems/MouseEventSystem';
import PoseComponent from '../../engine/components/PoseComponent';
import ShapeComponent from '../../engine/components/ShapeComponent';
import TranslationComponent from '../components/TranslationComponent';
import { getMinMaxShapeBounds, isPointInsideShape, translateShape } from '../../geometry/methods/shapes';

export default class CircuitDesignSystem extends MouseEventSystem {

    @OnMouseEvent(MOUSE_EVENT.MOUSE_MOVE)
    @OnlyIfEntityIsInstanceOf(CircuitDesignArea)
    public onMouseMoveCreateNewElementIfCursorIsInsideDesignArea(component: MouseEventComponent): void {
        this.store.entities.get(GateCreationCaret).first((instance: GateCreationCaret) => {
            if (!instance.gate && this.__isMouseInsideCircuitDesignArea(component)) {
                instance.gate = new CreateGateCommand(this.store).invoke(component.data);
                instance.gate.add(TranslationComponent);
            } else if (instance.gate && !this.__isMouseInsideCircuitDesignArea(component)) {
                instance.gate.unload();
                instance.gate = undefined;
            }
        });
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_MOVE)
    @OnlyIfEntityIsInstanceOf(Gate)
    @OnlyIfEntityHas(TranslationComponent)
    public onMouseMoveConstrainElementToDesignArea(component: MouseEventComponent): void {
        const circuitDesignArea = this.__getCircuitDesignArea();
        const areaPose = circuitDesignArea.get(PoseComponent);
        const areaShape = circuitDesignArea.get(ShapeComponent);
        if (isPointInsideShape(component.data, areaShape.data, areaPose.data)) {
            return;
        }
        const pose = component.entity.get(PoseComponent).data;
        const bounds = getMinMaxShapeBounds(translateShape(areaShape.data, areaPose.data));
        if (pose.x > bounds.maxX) {
            pose.x = bounds.maxX;
        } else if (pose.x < bounds.minX) {
            pose.x = bounds.minX;
        }
        if (pose.y > bounds.maxY) {
            pose.y = bounds.maxY;
        } else if (pose.y < bounds.minY) {
            pose.y = bounds.minY;
        }
        component.entity.get(PoseComponent).mutate(pose);
    }

    private __isMouseInsideCircuitDesignArea(component: MouseEventComponent): boolean {
        let isMouseInsideCircuitDesignArea = false;
        const circuitDesignArea = this.__getCircuitDesignArea();
        isMouseInsideCircuitDesignArea = isPointInsideShape(
                component.data,
                circuitDesignArea.get(ShapeComponent).data,
                circuitDesignArea.get(PoseComponent).data,
            );
        return isMouseInsideCircuitDesignArea;
    }

    private __getCircuitDesignArea(): CircuitDesignArea {
        return this.store.entities.get(CircuitDesignArea).first()!;
    }

}
