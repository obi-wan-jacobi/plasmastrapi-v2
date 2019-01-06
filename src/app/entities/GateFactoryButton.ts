import Button from './Button';
import Command from '../../framework/concretes/Command';
import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import Gate from './Gate';
import TranslationComponent from '../../engine/concretes/components/TranslationComponent';

export default class GateFactoryButton extends Button {

    constructor(
        { x, y }: {x: number, y: number },
    ) {
        super({ x, y });
        this.__initCommands();
    }

    private __initCommands(): void {
        this.commands.onCursorBeginActuation = new Command({ method: (component: CursorEventComponent) => {
            const gate = this._engine.store.entities.create(Gate, {
                x: component.data.x,
                y: component.data.y,
            });
            gate.add(TranslationComponent);
        }});
    }

}
