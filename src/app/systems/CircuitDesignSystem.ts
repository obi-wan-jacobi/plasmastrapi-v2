import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CircuitDesignArea from '../entities/CircuitDesignArea';
import CreateGateCommand from '../commands/CreateGateCommand';
import CursorEventComponent from '../../engine/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent,
} from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityHas, OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import Gate from '../entities/circuit-elements/Gate';
import GateCreationCaret from '../entities/tools/carets/GateCreationCaret';
import PoseComponent from '../../engine/components/PoseComponent';
import ShapeComponent from '../../engine/components/ShapeComponent';
import TranslationComponent from '../components/TranslationComponent';
import { getMinMaxShapeBounds, isPointInsideShape, translateShape } from '../../geometry/methods/shapes';

export default class CircuitDesignSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorTranslate(component);
        this.__onCursorTranslateConstrainElementToDesignArea(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_TRANSLATE)
    @OnlyIfEntityIsInstanceOf(CircuitDesignArea)
    private __onCursorTranslate(component: CursorEventComponent): void {
        this.store.entities.get(GateCreationCaret).first((instance: GateCreationCaret) => {
            if (!instance.gate && this.__isCursorInsideCircuitDesignArea(component)) {
                instance.gate = new CreateGateCommand(this.store).invoke(component.data);
                instance.gate.add(TranslationComponent);
            } else if (instance.gate && !this.__isCursorInsideCircuitDesignArea(component)) {
                instance.gate.unload();
                instance.gate = undefined;
            }
        });
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_TRANSLATE)
    @OnlyIfEntityIsInstanceOf(Gate)
    @OnlyIfEntityHas(TranslationComponent)
    private __onCursorTranslateConstrainElementToDesignArea(component: CursorEventComponent): void {
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

    private __isCursorInsideCircuitDesignArea(component: CursorEventComponent): boolean {
        let isCursorInsideCircuitDesignArea = false;
        const circuitDesignArea = this.__getCircuitDesignArea();
        isCursorInsideCircuitDesignArea = isPointInsideShape(
                component.data,
                circuitDesignArea.get(ShapeComponent).data,
                circuitDesignArea.get(PoseComponent).data,
            );
        return isCursorInsideCircuitDesignArea;
    }

    private __getCircuitDesignArea(): CircuitDesignArea {
        return this.store.entities.get(CircuitDesignArea).first()!;
    }

}
