import Command from '../../framework/concretes/commands/Command';
import HTML5CanvasGame from '../../html5/HTML5CanvasGame';
import HTML5CanvasMouseInputComponent from '../../html5/components/HTML5CanvasMouseInputComponent';
import { HTML5_CANVAS_MOUSE_INPUT_EVENT } from '../../html5/enums/HTML5_CANVAS_MOUSE_INPUT_EVENT';
import IVerifiable from '../src/interfaces/IVerifiable';
import Impostor from '../src/concretes/Impostor';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import RenderPoseSystem from '../../framework/concretes/systems/RenderPoseSystem';
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
        game.systems.add(RenderPoseSystem);
        game.store.components.load(new PoseComponent({ x: 50, y: 50, a: 0, colour: 'blue' }));
        game.loop.once();
        //
        impostorRenderingContext.verify();
        impostorRenderingContext.assertMethodsCalledInOrder();
        done();
    });

    it('click listening system registers clicks', (done) => {
        const fakeClickWatchingSystem = game.systems.add(FakeClickWatchingSystem);
        const impostorClickWatchingSystem = new Impostor({ fake: fakeClickWatchingSystem });
        const spy = sinon.spy(fakeClickWatchingSystem, 'once');
        impostorHTMLCanvasElement.expects('getBoundingClientRect').once()
            .returns({ left: BOUNDING_CLIENT_RECT_LEFT, top: BOUNDING_CLIENT_RECT_TOP });
        //
        fakeCanvas.simulateClick(50, 50);
        game.loop.once();
        //
        expect(spy.calledOnce).toBe(true);
        impostorClickWatchingSystem.verify();
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

class FakeClickWatchingSystem extends VerifiableSystem<HTML5CanvasMouseInputComponent> {

    constructor() {
        super(HTML5CanvasMouseInputComponent);
    }

    public once(component: HTML5CanvasMouseInputComponent): void {
        if (component.data.eventName === HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_CLICK) {
            this._validate();
        }
    }

}
