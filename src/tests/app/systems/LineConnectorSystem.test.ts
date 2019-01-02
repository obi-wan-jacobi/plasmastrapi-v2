import FakeHTMLCanvasElement from '../../src/fakes/FakeHTMLCanvasElement';
import Gate from '../../../app/entities/Gate';
import ImpostorCanvasRenderingContext2D from '../../src/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src/impostors/ImpostorHTMLCanvasElement';
import LineConnectorSystem from '../../../engine/concretes/systems/LineConnectorSystem';
import Plasmastrapi from '../../../app/Plasmastrapi';
import PoseComponent from '../../../engine/concretes/components/PoseComponent';
import RenderableShapeComponent from '../../../engine/concretes/components/RenderableShapeComponent';
import RenderableShapeSystem from '../../../engine/concretes/systems/RenderableShapeSystem';
import Wire from '../../../app/entities/Wire';
import * as sinon from 'sinon';

describe(LineConnectorSystem.name, () => {

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
        const wire = game.store.entities.create(Wire, { head: gate2.input, tail: gate1.output });
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
                { x: 338.46845369914496, y: 572.878345209198 },
                { x: 46.4684536991449, y: 23.87834520919796 },
                { x: 53.53154630085504, y: 20.12165479080204 },
                { x: 345.5315463008551, y: 569.121654790802 },
            ]});
        done();
    });

    it('wire resizes when connected terminals are moved', (done) => {
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(3)
            .returns({ left: 0, top: 0 });
        const gate1 = game.store.entities.create(Gate, { x: 50, y: 50 });
        const gate2 = game.store.entities.create(Gate, { x: 342, y: 543 });
        const wire = game.store.entities.create(Wire, { head: gate2.input, tail: gate1.output });
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
                { x: 338.4965213189884, y: 572.9301909573142 },
                { x: 73.49652131898836, y: 91.9301909573141 },
                { x: 80.50347868101159, y: 88.0698090426859 },
                { x: 345.50347868101164, y: 569.0698090426858 },
            ]});
        done();
    });

});
