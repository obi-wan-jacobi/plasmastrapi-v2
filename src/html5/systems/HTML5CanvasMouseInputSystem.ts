import Dictionary from '../../framework/concretes/data-structures/Dictionary';
import Engine from '../../framework/Engine';
import HTML5CanvasMouseInputComponent from '../components/HTML5CanvasMouseInputComponent';
import { HTML5_CANVAS_MOUSE_INPUT_EVENT } from '../enums/HTML5_CANVAS_MOUSE_INPUT_EVENT';
import IComponent from '../../framework/interfaces/IComponent';
import IHTML5CanvasMouseInputCommand from '../interfaces/IHTML5CanvasMouseInputCommand';
import IViewportAdapter from '../../framework/interfaces/IViewportAdapter';
import System from '../../framework/abstracts/System';

export default class HTML5CanvasMouseInputSystem extends System<HTML5CanvasMouseInputComponent> {

    private __strategies: Dictionary<IHTML5CanvasMouseInputCommand>;
    private __engine: Engine<IViewportAdapter<IComponent<any>>>;

    constructor(engine: Engine<IViewportAdapter<IComponent<any>>>) {
        super(HTML5CanvasMouseInputComponent);
        this.__engine = engine;
        this.__strategies = new Dictionary<IHTML5CanvasMouseInputCommand>();
    }

    public set(event: HTML5_CANVAS_MOUSE_INPUT_EVENT, command: IHTML5CanvasMouseInputCommand): void {
        this.__strategies.write({
            key: event,
            value: command,
        });
    }

    public reset(): void {
        this.__strategies.flush();
    }

    public once(component: HTML5CanvasMouseInputComponent): void {
        const command = this.__strategies.read(component.data.eventName);
        if (!command) {
            throw new Error(`${this.constructor.name} has no matching input command!`);
        }
        command.invoke(component.data.cursor);
        this.__flushLastCapturedMouseInput(component.id);
    }

    private __flushLastCapturedMouseInput(key: string): void {
        this.__engine.cache.components.getCollection(this.id).delete(key);
    }

}
