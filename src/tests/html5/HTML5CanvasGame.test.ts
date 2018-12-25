import { CURSOR_EVENT } from '../../framework/enums/CURSOR_EVENT';
import CursorEventComponent from '../../framework/concretes/components/CursorEventComponent';
import Entity from '../../framework/concretes/Entity';
import HTML5CanvasGame from '../../html5/HTML5CanvasGame';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import IVerifiable from '../src/interfaces/IVerifiable';
import Impostor from '../src/concretes/Impostor';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import RenderingComponent from '../../framework/concretes/components/RenderingComponent';
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
        const entity = game.store.entities.create(Entity, undefined);
        entity.components.add(new PoseComponent({ x: 50, y: 50, a: 0 }));
        entity.components.add(new RenderingComponent({ colour: HTML5_COLOUR.NONE }));
        game.loop.once();
        //
        impostorRenderingContext.verify();
        impostorRenderingContext.assertMethodsCalledInOrder();
        done();
    });

    it('click events are converted to cursor actuations', (done) => {
        const fakeCursorSystem = game.systems.add(FakeCursorEventSystem, undefined);
        const impostorCursorSystem = new Impostor({ fake: fakeCursorSystem });
        const spy = sinon.spy(fakeCursorSystem, 'once');
        impostorHTMLCanvasElement.expects('getBoundingClientRect').once()
            .returns({ left: BOUNDING_CLIENT_RECT_LEFT, top: BOUNDING_CLIENT_RECT_TOP });
        //
        game.store.components.load(new CursorEventComponent());
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

class FakeCursorEventSystem extends VerifiableSystem<CursorEventComponent> {

    constructor() {
        super(CursorEventComponent);
    }

    public once(event: CursorEventComponent): void {
        if (event.data.eventName === CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION) {
            this._validate();
        }
    }

}
