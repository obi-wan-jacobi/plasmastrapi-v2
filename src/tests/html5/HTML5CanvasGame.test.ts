import { CURSOR_EVENT } from '../../framework/enums/CURSOR_EVENT';
import CursorComponent from '../../framework/concretes/components/CursorComponent';
import HTML5CanvasGame from '../../html5/HTML5CanvasGame';
import HTML5CanvasMouseInputEvent from '../../html5/events/HTML5CanvasMouseInputEvent';
import { HTML5_CANVAS_MOUSE_INPUT_EVENT } from '../../html5/enums/HTML5_CANVAS_MOUSE_INPUT_EVENT';
import IVerifiable from '../src/interfaces/IVerifiable';
import Impostor from '../src/concretes/Impostor';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import VerifiableSystem from '../src/abstracts/VerifiableSystem';
import * as sinon from 'sinon';

const BOUNDING_CLIENT_RECT_LEFT = 0;
const BOUNDING_CLIENT_RECT_TOP = 0;

describe(HTML5CanvasGame.name, () => {

    let game: HTML5CanvasGame;

    // fakes
    let fakeCanvas: FakeCanvas;

    // mocks
    let impostorHTMLCanvasElement: Impostor<HTMLCanvasElement>;
    let impostorRenderingContext: Impostor<CanvasRenderingContext2D>;

    beforeEach(() => {
        fakeCanvas = new FakeCanvas();
        impostorHTMLCanvasElement = new Impostor<HTMLCanvasElement>({ methods: [
            'getContext',
            'getBoundingClientRect',
            'onclick'
        ], fake: fakeCanvas });
        impostorRenderingContext = new Impostor<CanvasRenderingContext2D>({ methods: [
            'clearRect',
            'save',
            'beginPath',
            'arc',
            'stroke',
            'closePath',
            'restore',
        ]});
        impostorHTMLCanvasElement.expects('getContext').once()
            .withExactArgs('2d')
            .returns(impostorRenderingContext.unwrap());
        game = new HTML5CanvasGame(impostorHTMLCanvasElement.unwrap());
    });

    afterEach(() => {
        impostorHTMLCanvasElement.verify();
        impostorHTMLCanvasElement.assertMethodsCalledInOrder();
    });

    it('renderable component is rendered once on first engine loop', (done) => {
        impostorRenderingContext.expects('clearRect').once();
        impostorRenderingContext.expects('save').once();
        impostorRenderingContext.expects('beginPath').once();
        impostorRenderingContext.expects('arc').once();
        impostorRenderingContext.expects('closePath').once();
        impostorRenderingContext.expects('stroke').once();
        impostorRenderingContext.expects('restore').once();
        //
        game.store.components.load(new PoseComponent({ x: 50, y: 50, a: 0, colour: 'blue' }));
        game.loop.once();
        //
        impostorRenderingContext.verify();
        impostorRenderingContext.assertMethodsCalledInOrder();
        done();
    });

    it('click listening system detects clicks', (done) => {
        const fakeClickWatchingSystem = game.systems.add(FakeClickWatchingSystem, undefined);
        const impostorClickWatchingSystem = new Impostor({ fake: fakeClickWatchingSystem });
        const spy = sinon.spy(fakeClickWatchingSystem, 'once');
        impostorHTMLCanvasElement.expects('getBoundingClientRect').once()
            .returns({ left: BOUNDING_CLIENT_RECT_LEFT, top: BOUNDING_CLIENT_RECT_TOP });
        //
        fakeCanvas.simulateClick(50, 50);
        game.loop.once();
        //
        expect(spy.calledOnce).toBe(true);
        expect(spy.firstCall.args[0].data).toEqual({
            eventName: HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_CLICK,
            cursor: {
                x: 50,
                y: 50
            }
        });
        impostorClickWatchingSystem.verify();
        done();
    });

    it('click events are converted to cursor actuations', (done) => {
        const fakeCursorSystem = game.systems.add(FakeCursorSystem, undefined);
        const impostorCursorSystem = new Impostor({ fake: fakeCursorSystem });
        const spy = sinon.spy(fakeCursorSystem, 'once');
        impostorHTMLCanvasElement.expects('getBoundingClientRect').once()
            .returns({ left: BOUNDING_CLIENT_RECT_LEFT, top: BOUNDING_CLIENT_RECT_TOP });
        //
        game.store.components.load(new CursorComponent({
            eventName: CURSOR_EVENT.UNDEFINED,
            cursor: {
                x: -1,
                y: -1
            }
        }));
        fakeCanvas.simulateClick(50, 50);
        game.loop.once();
        //
        expect(spy.calledOnce).toBe(true);
        expect(spy.firstCall.args[0].data).toEqual({
            eventName: CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION,
            cursor: {
                x: 50,
                y: 50
            }
        });
        impostorCursorSystem.verify();
        done();
    });

});

const __simulateClick = (): void => {
    return;
};

class FakeCanvas implements IVerifiable {

    [key: string]: any

    public verify(): void {
        return;
    }

    public simulateClick(clientX: number, clientY: number): void {
        this.onclick(new MouseEvent('click', {
            clientX: 50,
            clientY: 50
        }));
    }

}

class FakeClickWatchingSystem extends VerifiableSystem<HTML5CanvasMouseInputEvent> {

    constructor() {
        super(HTML5CanvasMouseInputEvent);
    }

    public once(event: HTML5CanvasMouseInputEvent): void {
        if (event.data.eventName === HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_CLICK) {
            this._validate();
        }
    }

}

class FakeCursorSystem extends VerifiableSystem<CursorComponent> {

    constructor() {
        super(CursorComponent);
    }

    public once(event: CursorComponent): void {
        if (event.data.eventName === CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION) {
            this._validate();
        }
    }

}
