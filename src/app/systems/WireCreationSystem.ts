import CreateWireCommand from '../commands/CreateWireCommand';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import IEntity from '../../engine/interfaces/IEntity';
import InputTerminal from '../entities/circuit-elements/InputTerminal';
import { MOUSE_EVENT } from '../../engine/enums/MOUSE_EVENT';
import MouseEventComponent from '../../engine/components/MouseEventComponent';
import MouseEventSystem, {
    OnCursorIntersection, OnMouseEvent,
} from '../../engine/abstracts/systems/MouseEventSystem';
import { Optional } from '../../framework/types/Optional';
import OutputTerminal from '../entities/circuit-elements/OutputTerminal';
import Wire from '../entities/circuit-elements/Wire';
import WireCreationCaret from '../entities/tools/carets/WireCreationCaret';

export default class WireCreationSystem extends MouseEventSystem {

    @OnMouseEvent(MOUSE_EVENT.MOUSE_DOWN)
    @OnlyIfEntityIsInstanceOf(OutputTerminal)
    @OnCursorIntersection
    public onMouseDownWithOutputTerminal(component: MouseEventComponent): void {
        const output = component.entity as OutputTerminal;
        const caret = this.store.entities.create(WireCreationCaret, { x: component.data.x, y: component.data.y });
        const wire = this.store.entities.create(Wire, { head: caret, tail: output });
        caret.wire = wire;
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_DOWN)
    @OnlyIfEntityIsInstanceOf(InputTerminal)
    @OnCursorIntersection
    public onMouseDownWithInputTerminal(component: MouseEventComponent): void {
        const input = component.entity as InputTerminal;
        const caret = this.store.entities.create(WireCreationCaret, { x: component.data.x, y: component.data.y });
        const wire = this.store.entities.create(Wire, { head: input, tail: caret });
        caret.wire = wire;
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_UP)
    @OnlyIfEntityIsInstanceOf(InputTerminal)
    @OnCursorIntersection
    public onMouseUpWithInputTerminal(component: MouseEventComponent): void {
        const caret = this.__findAnyExistingCaret();
        if (!caret) {
            return;
        }
        this.__createNewWireIfNotDuplicated({ head: component.entity, tail: caret.wire.tail });
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_UP)
    @OnlyIfEntityIsInstanceOf(OutputTerminal)
    @OnCursorIntersection
    public onMouseUpWithOutputTerminal(component: MouseEventComponent): void {
        const caret = this.__findAnyExistingCaret();
        if (!caret) {
            return;
        }
        this.__createNewWireIfNotDuplicated({ head: caret.wire.head, tail: component.entity });
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_CLICK)
    @OnlyIfEntityIsInstanceOf(WireCreationCaret)
    public onMouseClickWithCaret(component: MouseEventComponent): void {
        component.entity.unload();
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

    private __createNewWireIfNotDuplicated({ head, tail}: { head: IEntity, tail: IEntity }): void {
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

}
