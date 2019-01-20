import ChildPoseOffsetSystem from '../../../src/app/systems/ChildPoseOffsetSystem';
import FakeHTMLCanvasElement from '../../src/fakes/FakeHTMLCanvasElement';
import Gate from '../../../src/app/entities/circuit-elements/Gate';
import ImpostorCanvasRenderingContext2D from '../../src/concretes/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src/concretes/impostors/ImpostorHTMLCanvasElement';
import Plasmastrapi from '../../../src/app/Plasmastrapi';
import PoseComponent from '../../../src/engine/concretes/components/PoseComponent';

describe(ChildPoseOffsetSystem.name, () => {

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
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(4)
            .returns({ left: 0, top: 0 });
        const gate = game.store.entities.create(Gate, { x: 50, y: 50 });
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        fakeCanvas.simulateMouseDown(55, 55);
        fakeCanvas.simulateMouseMove(105, 105);
        fakeCanvas.simulateMouseUp(105, 105);
        fakeCanvas.simulateMouseMove(125, 135);
        //
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        //
        expect(gate.get(PoseComponent).data).toEqual({ x: 100, y: 100, a: 0 });
        expect(gate.output.get(PoseComponent).data).toEqual({ x: 100, y: 72, a: 0 });
        done();
    });

});
