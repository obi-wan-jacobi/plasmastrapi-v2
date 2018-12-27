import { CURSOR_EVENT } from '../../../../framework/enums/CURSOR_EVENT';
import CursorEventComponent from '../../../../framework/concretes/components/CursorEventComponent';
import Entity from '../../../../framework/concretes/Entity';
import FakeCanvas from '../../../src/fakes/FakeHTMLCanvasElement';
import FakeSystem from '../../../src/fakes/FakeSystem';
import HTML5CanvasGame from '../../../../html5/HTML5CanvasGame';
import Impostor from '../../../src/helpers/Impostor';
import * as sinon from 'sinon';

const BOUNDING_CLIENT_RECT_LEFT = 0;
const BOUNDING_CLIENT_RECT_TOP = 0;

describe(`systems operating against ${CursorEventComponent.name}`, () => {

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
        impostorHTMLCanvasElement.expects('getBoundingClientRect').once()
            .returns({ left: BOUNDING_CLIENT_RECT_LEFT, top: BOUNDING_CLIENT_RECT_TOP });
        game = new HTML5CanvasGame(impostorHTMLCanvasElement.unwrap());
    });

    afterEach(() => {
        impostorHTMLCanvasElement.verify();
        impostorHTMLCanvasElement.assertMethodsCalledInOrder();
    });

    it('mouseenter event is converted to cursor enable', (done) => {
        __validateMouseEventConversionIntoCursorEvent({
            simulateWhat: 'simulateMouseEnter',
            clientX: 10,
            clientY: 10,
            expectedCursorEvent: CURSOR_EVENT.CURSOR_ENABLE
        });
        done();
    });

    it('mousemove event is converted to cursor translation', (done) => {
        __validateMouseEventConversionIntoCursorEvent({
            simulateWhat: 'simulateMouseMove',
            clientX: 20,
            clientY: 20,
            expectedCursorEvent: CURSOR_EVENT.CURSOR_TRANSLATE
        });
        done();
    });

    it('mouseleave event is converted to cursor disable', (done) => {
        __validateMouseEventConversionIntoCursorEvent({
            simulateWhat: 'simulateMouseLeave',
            clientX: 30,
            clientY: 30,
            expectedCursorEvent: CURSOR_EVENT.CURSOR_DISABLE
        });
        done();
    });

    it('mousedown event is converted to cursor begin actuation', (done) => {
        __validateMouseEventConversionIntoCursorEvent({
            simulateWhat: 'simulateMouseDown',
            clientX: 40,
            clientY: 40,
            expectedCursorEvent: CURSOR_EVENT.CURSOR_BEGIN_ACTUATION
        });
        done();
    });

    it('mouseup event is converted to cursor end actuation', (done) => {
        __validateMouseEventConversionIntoCursorEvent({
            simulateWhat: 'simulateMouseUp',
            clientX: 50,
            clientY: 50,
            expectedCursorEvent: CURSOR_EVENT.CURSOR_END_ACTUATION
        });
        done();
    });

    it('click event is converted to cursor actuation', (done) => {
        __validateMouseEventConversionIntoCursorEvent({
            simulateWhat: 'simulateClick',
            clientX: 60,
            clientY: 60,
            expectedCursorEvent: CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION
        });
        done();
    });

    const __validateMouseEventConversionIntoCursorEvent = ({ simulateWhat, clientX, clientY, expectedCursorEvent }: {
        simulateWhat: string,
        clientX: number,
        clientY: number,
        expectedCursorEvent: CURSOR_EVENT
    }) => {
        const fakeCursorSystem = game.systems.add(FakeSystem, CursorEventComponent);
        const impostorCursorSystem = new Impostor({ fake: fakeCursorSystem });
        const spy = sinon.spy(fakeCursorSystem, 'once');
        //
        const entity = game.store.entities.create(Entity);
        entity.components.add(new CursorEventComponent());
        fakeCanvas[simulateWhat](clientX, clientY);
        game.loop.once();
        //
        expect(spy.calledOnce).toBe(true);
        expect(spy.firstCall.args[0].data).toEqual({
            eventName: expectedCursorEvent,
            x: clientX,
            y: clientY
        });
        impostorCursorSystem.verify();
    };

});
