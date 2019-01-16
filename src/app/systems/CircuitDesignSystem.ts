import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CircuitDesignArea from '../entities/CircuitDesignArea';
import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent,
} from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import Gate from '../entities/circuit-elements/Gate';
import GateCreationCaret from '../entities/tool-carets/GateCreationCaret';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import ShapeComponent from '../../engine/concretes/components/ShapeComponent';
import TranslationComponent from '../../engine/concretes/components/TranslationComponent';
import { isPointInsideShape } from '../../geometry/methods/shapes';

export default class CircuitDesignSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorCompleteActuationWithButton(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_TRANSLATE)
    @OnlyIfEntityIsInstanceOf(CircuitDesignArea)
    private __onCursorCompleteActuationWithButton(component: CursorEventComponent): void {
        this.store.entities.get(GateCreationCaret).first((instance: GateCreationCaret) => {
            if (!instance.gate && this.__isCursorInsideCircuitDesignArea(component)) {
                instance.gate = this.store.entities.create(Gate, component.data);
                instance.gate.add(TranslationComponent);
            } else if (instance.gate && !this.__isCursorInsideCircuitDesignArea(component)) {
                instance.gate.unload();
                instance.gate = undefined;
            }
        });
    }

    private __isCursorInsideCircuitDesignArea = (component: CursorEventComponent): boolean => {
        let isCursorInsideCircuitDesignArea = false;
        this.store.entities.get(CircuitDesignArea).first((instance) => {
            isCursorInsideCircuitDesignArea = isPointInsideShape(
                component.data,
                instance.get(ShapeComponent).data,
                instance.get(PoseComponent).data,
            );
        });
        return isCursorInsideCircuitDesignArea;
    }

}
