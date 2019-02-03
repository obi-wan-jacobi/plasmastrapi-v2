import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CreateWireCommand from '../commands/CreateWireCommand';
import Entity, { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import InputComponent from '../../engine/components/InputComponent';
import InputSystem, {
    OnCursorIntersection, OnInputEvent,
} from '../../engine/abstracts/systems/InputSystem';
import InputTerminal from '../entities/circuit-elements/InputTerminal';
import { Optional } from '../../framework/types/Optional';
import OutputTerminal from '../entities/circuit-elements/OutputTerminal';
import Wire from '../entities/circuit-elements/Wire';
import WireCreationCaret from '../entities/tools/carets/WireCreationCaret';

export default class WireCreationSystem extends InputSystem {

    public once(component: InputComponent): void {
        this.__onCursorBeginActuationWithInputTerminal(component);
        this.__onCursorBeginActuationWithOutputTerminal(component);
        this.__onCursorEndActuationWithInputTerminal(component);
        this.__onCursorEndActuationWithOutputTerminal(component);
        this.__onCursorCompleteActuationWithCaret(component);
    }

    @OnInputEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnlyIfEntityIsInstanceOf(OutputTerminal)
    @OnCursorIntersection
    private __onCursorBeginActuationWithOutputTerminal(component: InputComponent): void {
        const output = component.entity as OutputTerminal;
        const caret = this.store.entities.create(WireCreationCaret, { x: component.data.x, y: component.data.y });
        const wire = this.store.entities.create(Wire, { head: caret, tail: output });
        caret.wire = wire;
    }

    @OnInputEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnlyIfEntityIsInstanceOf(InputTerminal)
    @OnCursorIntersection
    private __onCursorBeginActuationWithInputTerminal(component: InputComponent): void {
        const input = component.entity as InputTerminal;
        const caret = this.store.entities.create(WireCreationCaret, { x: component.data.x, y: component.data.y });
        const wire = this.store.entities.create(Wire, { head: input, tail: caret });
        caret.wire = wire;
    }

    @OnInputEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityIsInstanceOf(InputTerminal)
    @OnCursorIntersection
    private __onCursorEndActuationWithInputTerminal(component: InputComponent): void {
        const caret = this.__findAnyExistingCaret();
        if (!caret) {
            return;
        }
        this.__createNewWireIfNotDuplicated({ head: component.entity, tail: caret.wire.tail });
    }

    @OnInputEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityIsInstanceOf(OutputTerminal)
    @OnCursorIntersection
    private __onCursorEndActuationWithOutputTerminal(component: InputComponent): void {
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

    @OnInputEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(WireCreationCaret)
    private __onCursorCompleteActuationWithCaret(component: InputComponent): void {
        component.entity.unload();
    }

}
