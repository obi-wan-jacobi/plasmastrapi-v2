import FakeHTMLCanvasElement from '../../src/fakes/FakeHTMLCanvasElement';
import Gate from '../../../app/entities/Gate';
import ImpostorCanvasRenderingContext2D from '../../src/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src/impostors/ImpostorHTMLCanvasElement';
import Plasmastrapi from '../../../app/Plasmastrapi';
import PoseComponent from '../../../framework/concretes/components/PoseComponent';
import RenderableShapeComponent from '../../../framework/concretes/components/RenderableShapeComponent';
import RenderableShapeSystem from '../../../framework/concretes/systems/RenderableShapeSystem';
import TranslatableComponent from '../../../framework/concretes/components/TranslatableComponent';
import Wire from '../../../app/entities/Wire';
import WireSystem from '../../../app/systems/WireSystem';
import * as sinon from 'sinon';

describe(WireSystem.name, () => {

    let impostorRenderingContext: ImpostorCanvasRenderingContext2D;
    let impostorHTMLCanvasElement: ImpostorHTMLCanvasElement;
    let game: Plasmastrapi;

    beforeEach(() => {
        impostorRenderingContext = new ImpostorCanvasRenderingContext2D();
        impostorHTMLCanvasElement = new ImpostorHTMLCanvasElement();
        impostorHTMLCanvasElement.expects('getContext').once()
            .withExactArgs('2d')
            .returns(impostorRenderingContext.unwrap());
        game = new Plasmastrapi(impostorHTMLCanvasElement.unwrap());
    });

    afterEach(() => {
        impostorHTMLCanvasElement.verify();
        impostorHTMLCanvasElement.assertMethodsCalledInOrder();
    });

    it('wire is positioned and sized relative to head and tail terminals then rendered', (done) => {
        const gate1 = game.store.entities.create(Gate, { x: 50, y: 50 });
        const gate2 = game.store.entities.create(Gate, { x: 342, y: 543 });
        const wire = game.store.entities.create(Wire);
        wire.head = gate2.input;
        wire.tail = gate1.output;
        //
        game.loop.once();
        const spyDrawWire = sinon.spy(game.viewport, 'drawShape');
        game.systems.get(RenderableShapeSystem).once(wire.get(RenderableShapeComponent));
        //
        expect(game.store.entities.get(Wire).length).toBe(1);
        game.store.entities.get(Wire).forEach((instance) => {
            expect(instance.get(PoseComponent).data).toEqual({
                x: (342 + 50) / 2,
                y: (543 + 50) / 2,
                a: 1.0819741812095496,
            });
        });
        expect(spyDrawWire.calledOnce).toBe(true);
        expect(spyDrawWire.firstCall.args[0]).toEqual({
            vertices: [
                { x: 341.1171134247862, y: 571.4695863022995 },
                { x: 49.1171134247862, y: 22.46958630229949 },
                { x: 50.882886575213746, y: 21.53041369770051 },
                { x: 342.8828865752138, y: 570.5304136977005 },
            ]});
        done();
    });

    it('wire resizes when connected terminals are moved', (done) => {
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(3)
            .returns({ left: 0, top: 0 });
        const gate1 = game.store.entities.create(Gate, { x: 50, y: 50 });
        const gate2 = game.store.entities.create(Gate, { x: 342, y: 543 });
        const wire = game.store.entities.create(Wire);
        wire.head = gate2.input;
        wire.tail = gate1.output;
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        fakeCanvas.simulateMouseDown(50, 50);
        fakeCanvas.simulateMouseMove(77, 118);
        fakeCanvas.simulateMouseUp(123, 439);
        //
        game.loop.once();
        game.loop.once();
        game.loop.once();
        const spyDrawWire = sinon.spy(game.viewport, 'drawShape');
        game.systems.get(RenderableShapeSystem).once(wire.get(RenderableShapeComponent));
        //
        expect(game.store.entities.get(Wire).length).toBe(1);
        game.store.entities.get(Wire).forEach((instance) => {
            expect(instance.get(PoseComponent).data).toEqual({
                x: 209.5,
                y: 330.5,
                a: 1.0672351263613737,
            });
        });
        expect(spyDrawWire.calledOnce).toBe(true);
        expect(spyDrawWire.firstCall.args[0]).toEqual({
            vertices: [
                { x: 341.1241303297471, y: 571.4825477393285 },
                { x: 76.12413032974706, y: 90.48254773932851 },
                { x: 77.87586967025288, y: 89.51745226067149 },
                { x: 342.87586967025294, y: 570.5174522606715 },
            ]});
        done();
    });

});
