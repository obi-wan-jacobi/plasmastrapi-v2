import { CURSOR_EVENT } from '../../../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../../../engine/concretes/components/CursorEventComponent';
import Entity from '../../../../engine/concretes/Entity';
import FakeCanvas from '../../../src/fakes/FakeHTMLCanvasElement';
import FakeSystem from '../../../src/fakes/FakeSystem';
import HTML5CanvasGame from '../../../../html5/HTML5CanvasGame';
import Impostor from '../../../src/helpers/Impostor';
import ImpostorCanvasRenderingContext2D from '../../../src/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../../src/impostors/ImpostorHTMLCanvasElement';
import PoseComponent from '../../../../engine/concretes/components/PoseComponent';
import Rectangle from '../../../../geometry/concretes/Rectangle';
import ShapeComponent from '../../../../engine/concretes/components/ShapeComponent';
import * as sinon from 'sinon';

describe(`systems operating against ${CursorEventComponent.name}`, () => {

    let impostorRenderingContext: ImpostorCanvasRenderingContext2D;
    let impostorHTMLCanvasElement: ImpostorHTMLCanvasElement;
    let game: HTML5CanvasGame;

    beforeEach(() => {
        impostorRenderingContext = new ImpostorCanvasRenderingContext2D();
        impostorHTMLCanvasElement = new ImpostorHTMLCanvasElement();
        impostorHTMLCanvasElement.expects('getContext').once()
            .withExactArgs('2d')
            .returns(impostorRenderingContext.unwrap());
        impostorHTMLCanvasElement.expects('getBoundingClientRect').once()
            .returns({ left: 0, top: 0 });
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
            expectedCursorEvent: CURSOR_EVENT.CURSOR_ENABLE,
        });
        done();
    });

    it('mousemove event is converted to cursor translation', (done) => {
        __validateMouseEventConversionIntoCursorEvent({
            simulateWhat: 'simulateMouseMove',
            clientX: 20,
            clientY: 20,
            expectedCursorEvent: CURSOR_EVENT.CURSOR_TRANSLATE,
        });
        done();
    });

    it('mouseleave event is converted to cursor disable', (done) => {
        __validateMouseEventConversionIntoCursorEvent({
            simulateWhat: 'simulateMouseLeave',
            clientX: 30,
            clientY: 30,
            expectedCursorEvent: CURSOR_EVENT.CURSOR_DISABLE,
        });
        done();
    });

    it('mousedown event is converted to cursor begin actuation', (done) => {
        __validateMouseEventConversionIntoCursorEvent({
            simulateWhat: 'simulateMouseDown',
            clientX: 40,
            clientY: 40,
            expectedCursorEvent: CURSOR_EVENT.CURSOR_BEGIN_ACTUATION,
        });
        done();
    });

    it('mouseup event is converted to cursor end actuation', (done) => {
        __validateMouseEventConversionIntoCursorEvent({
            simulateWhat: 'simulateMouseUp',
            clientX: 50,
            clientY: 50,
            expectedCursorEvent: CURSOR_EVENT.CURSOR_END_ACTUATION,
        });
        done();
    });

    it('click event is converted to cursor actuation', (done) => {
        __validateMouseEventConversionIntoCursorEvent({
            simulateWhat: 'simulateClick',
            clientX: 60,
            clientY: 60,
            expectedCursorEvent: CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION,
        });
        done();
    });

    const __validateMouseEventConversionIntoCursorEvent = ({ simulateWhat, clientX, clientY, expectedCursorEvent }: {
        simulateWhat: string,
        clientX: number,
        clientY: number,
        expectedCursorEvent: CURSOR_EVENT,
    }) => {
        const fakeCursorSystem = game.systems.add(FakeSystem, CursorEventComponent);
        const impostorCursorSystem = new Impostor({ fake: fakeCursorSystem });
        const spy = sinon.spy(fakeCursorSystem, 'once');
        const entity = game.store.entities.create(Entity);
        entity.add(PoseComponent, { x: clientX, y: clientY });
        entity.add(ShapeComponent, new Rectangle({ width: 50, height: 50 }));
        (impostorHTMLCanvasElement.unwrap() as unknown as FakeCanvas)[simulateWhat](clientX, clientY);
        //
        game.loop.once();
        //
        expect(spy.calledOnce).toBe(true);
        expect(spy.firstCall.args[0].data).toEqual({
            eventName: expectedCursorEvent,
            x: clientX,
            y: clientY,
        });
        impostorCursorSystem.verify();
    };

});
