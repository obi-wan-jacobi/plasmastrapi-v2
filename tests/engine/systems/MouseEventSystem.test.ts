import Entity from '../../../src/engine/abstracts/Entity';
import FakeCanvas from '../../src/fakes/FakeHTMLCanvasElement';
import FakeSystem from '../../src/fakes/FakeSystem';
import HTML5CanvasGame from '../../../src/html5/HTML5CanvasGame';
import Impostor from '../../src/impostors/Impostor';
import ImpostorCanvasRenderingContext2D from '../../src/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src/impostors/ImpostorHTMLCanvasElement';
import { MOUSE_EVENT } from '../../../src/engine/enums/MOUSE_EVENT';
import MouseEventComponent from '../../../src/engine/components/MouseEventComponent';
import PoseComponent from '../../../src/engine/components/PoseComponent';
import Rectangle from '../../../src/geometry/concretes/Rectangle';
import ShapeComponent from '../../../src/engine/components/ShapeComponent';
import * as sinon from 'sinon';

describe(`systems operating against ${MouseEventComponent.name}`, () => {

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

    it('mouseenter event is converted', (done) => {
        __validateMouseEventConversionIntoMouseEvent({
            simulateWhat: 'simulateMouseEnter',
            clientX: 10,
            clientY: 10,
            expectedMouseEvent: MOUSE_EVENT.MOUSE_ENTER,
        });
        done();
    });

    it('mousemove event is converted', (done) => {
        __validateMouseEventConversionIntoMouseEvent({
            simulateWhat: 'simulateMouseMove',
            clientX: 20,
            clientY: 20,
            expectedMouseEvent: MOUSE_EVENT.MOUSE_MOVE,
        });
        done();
    });

    it('mouseleave event is converted', (done) => {
        __validateMouseEventConversionIntoMouseEvent({
            simulateWhat: 'simulateMouseLeave',
            clientX: 30,
            clientY: 30,
            expectedMouseEvent: MOUSE_EVENT.MOUSE_LEAVE,
        });
        done();
    });

    it('mousedown event is converted', (done) => {
        __validateMouseEventConversionIntoMouseEvent({
            simulateWhat: 'simulateMouseDown',
            clientX: 40,
            clientY: 40,
            expectedMouseEvent: MOUSE_EVENT.MOUSE_DOWN,
        });
        done();
    });

    it('mouseup event is converted', (done) => {
        __validateMouseEventConversionIntoMouseEvent({
            simulateWhat: 'simulateMouseUp',
            clientX: 50,
            clientY: 50,
            expectedMouseEvent: MOUSE_EVENT.MOUSE_UP,
        });
        done();
    });

    it('click event is converted', (done) => {
        __validateMouseEventConversionIntoMouseEvent({
            simulateWhat: 'simulateClick',
            clientX: 60,
            clientY: 60,
            expectedMouseEvent: MOUSE_EVENT.MOUSE_CLICK,
        });
        done();
    });

    const __validateMouseEventConversionIntoMouseEvent = ({ simulateWhat, clientX, clientY, expectedMouseEvent }: {
        simulateWhat: string,
        clientX: number,
        clientY: number,
        expectedMouseEvent: MOUSE_EVENT,
    }) => {
        game.systems.add(FakeSystem, MouseEventComponent).sync();
        const fakeMouseSystem = game.systems.get(FakeSystem);
        const impostorMouseSystem = new Impostor({ fake: fakeMouseSystem });
        const spy = sinon.spy(fakeMouseSystem, 'once');
        const entity = game.store.entities.create(Entity);
        entity.add(MouseEventComponent);
        entity.add(PoseComponent, { x: clientX, y: clientY });
        entity.add(ShapeComponent, new Rectangle({ width: 50, height: 50 }));
        (impostorHTMLCanvasElement.unwrap() as unknown as FakeCanvas)[simulateWhat](clientX, clientY);
        //
        game.loop.once();
        //
        expect(spy.calledOnce).toBe(true);
        expect(spy.firstCall.args[0].data).toEqual({
            eventName: expectedMouseEvent,
            x: clientX,
            y: clientY,
            isShiftDown: false,
        });
        impostorMouseSystem.verify();
    };

});
