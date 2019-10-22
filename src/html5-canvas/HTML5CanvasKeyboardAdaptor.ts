import IAdaptedKeyboardEvent from '../engine/interfaces/IAdaptedKeyboardEvent';
import IKeyboardAdaptor from '../engine/interfaces/IKeyboardAdaptor';
import IKeyboardHandler from '../engine/interfaces/IKeyboardHandler';
import KeyboardHandler from '../engine/KeyboardHandler';

export default class HTML5CanvasKeyboardAdapter implements IKeyboardAdaptor {

    private __canvas: HTMLCanvasElement & { [key: string]: (ke: KeyboardEvent) => void };
    private __buffer: IAdaptedKeyboardEvent[];
    private __handler: IKeyboardHandler;

    constructor(canvas: HTMLCanvasElement & { [key: string]: (ke: KeyboardEvent) => void }) {
        this.__canvas = canvas;
        this.__buffer = [];
        this.__handler = new KeyboardHandler();
        this.__bindKeyboardEvents();
    }

    public once(): void {
        const input = this.__buffer.shift();
        if (input) {
            this.__handler[input.name](input);
        }
    }

    public handler(handler: IKeyboardHandler): void {
        this.__handler = handler;
    }

    private __bindKeyboardEvents(): void {
        [
            'keydown',
            'keypress',
            'keyup',
        ]
        .forEach((key) => {
            this.__canvas[`on${key}`] = (ke: KeyboardEvent): void => {
                this.__buffer.push({
                    name: key,
                    key: ke.key,
                });
            };
        });
    }

}
