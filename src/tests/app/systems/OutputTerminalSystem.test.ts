import FakeHTMLCanvasElement from '../../src/fakes/FakeHTMLCanvasElement';
import Gate from '../../../app/entities/Gate';
import ImpostorCanvasRenderingContext2D from '../../src/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src/impostors/ImpostorHTMLCanvasElement';
import OutputTerminalSystem from '../../../app/systems/OutputTerminalSystem';
import Plasmastrapi from '../../../app/Plasmastrapi';
import PoseComponent from '../../../framework/concretes/components/PoseComponent';

describe(OutputTerminalSystem.name, () => {

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

    it('terminal moves relative to parent', (done) => {
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(2)
            .returns({ left: 0, top: 0 });
        //
        const gate = game.store.entities.create(Gate, { x: 50, y: 50 });
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        fakeCanvas.simulateMouseMove(55, 55);
        fakeCanvas.simulateMouseMove(105, 105);
        game.loop.once();
        game.loop.once();
        //
        expect(gate.get(PoseComponent).data).toEqual({ x: 100, y: 100, a: 0 });
        expect(gate.output.get(PoseComponent).data).toEqual({ x: 100, y: 72, a: 0 });
        done();
    });

});
