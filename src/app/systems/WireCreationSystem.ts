import { MOUSE_EVENT } from '../../engine/enums/MOUSE_EVENT';
import CreateWireCommand from '../commands/CreateWireCommand';
import MouseEventComponent from '../../engine/components/MouseEventComponent';
import MouseEventSystem, {
    OnMouseEvent, OnMouseIntersection,
} from '../../engine/abstracts/systems/MouseEventSystem';
import Entity, { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import InputTerminal from '../entities/circuit-elements/InputTerminal';
import { Optional } from '../../framework/types/Optional';
import OutputTerminal from '../entities/circuit-elements/OutputTerminal';
import Wire from '../entities/circuit-elements/Wire';
import WireCreationCaret from '../entities/tools/carets/WireCreationCaret';

export default class WireCreationSystem extends MouseEventSystem {

    public once(component: MouseEventComponent): void {
        this.__onMouseDownWithInputTerminal(component);
        this.__onMouseDownWithOutputTerminal(component);
        this.__onMouseUpWithInputTerminal(component);
        this.__onMouseUpWithOutputTerminal(component);
        this.__onMouseClickWithCaret(component);
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_DOWN)
    @OnlyIfEntityIsInstanceOf(OutputTerminal)
    @OnMouseIntersection
    private __onMouseDownWithOutputTerminal(component: MouseEventComponent): void {
        const output = component.entity as OutputTerminal;
        const caret = this.store.entities.create(WireCreationCaret, { x: component.data.x, y: component.data.y });
        const wire = this.store.entities.create(Wire, { head: caret, tail: output });
        caret.wire = wire;
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_DOWN)
    @OnlyIfEntityIsInstanceOf(InputTerminal)
    @OnMouseIntersection
    private __onMouseDownWithInputTerminal(component: MouseEventComponent): void {
        const input = component.entity as InputTerminal;
        const caret = this.store.entities.create(WireCreationCaret, { x: component.data.x, y: component.data.y });
        const wire = this.store.entities.create(Wire, { head: input, tail: caret });
        caret.wire = wire;
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_UP)
    @OnlyIfEntityIsInstanceOf(InputTerminal)
    @OnMouseIntersection
    private __onMouseUpWithInputTerminal(component: MouseEventComponent): void {
        const caret = this.__findAnyExistingCaret();
        if (!caret) {
            return;
        }
        this.__createNewWireIfNotDuplicated({ head: component.entity, tail: caret.wire.tail });
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_UP)
    @OnlyIfEntityIsInstanceOf(OutputTerminal)
    @OnMouseIntersection
    private __onMouseUpWithOutputTerminal(component: MouseEventComponent): void {
        const caret = this.__findAnyExistingCaret();
        if (!caret) {
            return;
        }
        this.__createNewWireIfNotDuplicated({ head: caret.wire.head, tail: component.entity });
    }

    private __findAnyExistingCaret(): Optional<WireCreationCaret> {
        let caret: Optional<WireCreationCaret>;
        const caretCollection = this.store.entities.get(WireCreationCaret);
        if (caretCollection.length > 1) {
            throw new Error(`Memory leak detected: more than one instance of ${WireCreationCaret.name} was found`);
        }
        caretCollection.forEach((instance: WireCreationCaret) => {
            caret = instance;
        });
        return caret;
    }

    private __createNewWireIfNotDuplicated({ head, tail}: { head: Entity, tail: Entity }): void {
        if (!(head instanceof InputTerminal) || !(tail instanceof OutputTerminal)) {
            return;
        }
        const isDuplicated = !!this.store.entities.get(Wire).find((wire: Wire) => {
            return wire.head === head && wire.tail === tail;
        });
        if (!isDuplicated) {
            new CreateWireCommand(this.store).invoke({ head, tail });
        }
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_CLICK)
    @OnlyIfEntityIsInstanceOf(WireCreationCaret)
    private __onMouseClickWithCaret(component: MouseEventComponent): void {
        component.entity.unload();
    }

}
