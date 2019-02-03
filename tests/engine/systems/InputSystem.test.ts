import { CURSOR_EVENT } from '../../../src/engine/enums/CURSOR_EVENT';
import Entity from '../../../src/engine/abstracts/Entity';
import FakeCanvas from '../../src/fakes/FakeHTMLCanvasElement';
import FakeSystem from '../../src/fakes/FakeSystem';
import HTML5CanvasGame from '../../../src/html5/HTML5CanvasGame';
import Impostor from '../../src/impostors/Impostor';
import ImpostorCanvasRenderingContext2D from '../../src/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src/impostors/ImpostorHTMLCanvasElement';
import InputComponent from '../../../src/engine/components/InputComponent';
import PoseComponent from '../../../src/engine/components/PoseComponent';
import Rectangle from '../../../src/geometry/concretes/Rectangle';
import ShapeComponent from '../../../src/engine/components/ShapeComponent';
import * as sinon from 'sinon';

describe(`systems operating against ${InputComponent.name}`, () => {

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
        __validateMouseEventConversionIntoInput({
            simulateWhat: 'simulateMouseEnter',
            clientX: 10,
            clientY: 10,
            expectedInput: CURSOR_EVENT.CURSOR_ENABLE,
        });
        done();
    });

    it('mousemove event is converted to cursor translation', (done) => {
        __validateMouseEventConversionIntoInput({
            simulateWhat: 'simulateMouseMove',
            clientX: 20,
            clientY: 20,
            expectedInput: CURSOR_EVENT.CURSOR_TRANSLATE,
        });
        done();
    });

    it('mouseleave event is converted to cursor disable', (done) => {
        __validateMouseEventConversionIntoInput({
            simulateWhat: 'simulateMouseLeave',
            clientX: 30,
            clientY: 30,
            expectedInput: CURSOR_EVENT.CURSOR_DISABLE,
        });
        done();
    });

    it('mousedown event is converted to cursor begin actuation', (done) => {
        __validateMouseEventConversionIntoInput({
            simulateWhat: 'simulateMouseDown',
            clientX: 40,
            clientY: 40,
            expectedInput: CURSOR_EVENT.CURSOR_BEGIN_ACTUATION,
        });
        done();
    });

    it('mouseup event is converted to cursor end actuation', (done) => {
        __validateMouseEventConversionIntoInput({
            simulateWhat: 'simulateMouseUp',
            clientX: 50,
            clientY: 50,
            expectedInput: CURSOR_EVENT.CURSOR_END_ACTUATION,
        });
        done();
    });

    it('click event is converted to cursor actuation', (done) => {
        __validateMouseEventConversionIntoInput({
            simulateWhat: 'simulateClick',
            clientX: 60,
            clientY: 60,
            expectedInput: CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION,
        });
        done();
    });

    const __validateMouseEventConversionIntoInput = ({ simulateWhat, clientX, clientY, expectedInput }: {
        simulateWhat: string,
        clientX: number,
        clientY: number,
        expectedInput: CURSOR_EVENT,
    }) => {
        game.systems.add(FakeSystem, InputComponent).sync();
        const fakeCursorSystem = game.systems.get(FakeSystem);
        const impostorCursorSystem = new Impostor({ fake: fakeCursorSystem });
        const spy = sinon.spy(fakeCursorSystem, 'once');
        const entity = game.store.entities.create(Entity);
        entity.add(InputComponent);
        entity.add(PoseComponent, { x: clientX, y: clientY });
        entity.add(ShapeComponent, new Rectangle({ width: 50, height: 50 }));
        (impostorHTMLCanvasElement.unwrap() as unknown as FakeCanvas)[simulateWhat](clientX, clientY);
        //
        game.loop.once();
        //
        expect(spy.calledOnce).toBe(true);
        expect(spy.firstCall.args[0].data).toEqual({
            eventName: expectedInput,
            x: clientX,
            y: clientY,
            isShiftDown: false,
        });
        impostorCursorSystem.verify();
    };

});
