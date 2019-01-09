import FakeHTMLCanvasElement from '../src/fakes/FakeHTMLCanvasElement';
import Gate from '../../app/entities/Gate';
import GateCreationButton from '../../app/entities/GateCreationButton';
import ImpostorCanvasRenderingContext2D from '../src/concretes/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../src/concretes/impostors/ImpostorHTMLCanvasElement';
import Plasmastrapi from '../../app/Plasmastrapi';
import PoseComponent from '../../engine/concretes/components/PoseComponent';

describe(Plasmastrapi.name, () => {

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

    it('clicking button creates gate that is immediately draggable', (done) => {
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(7)
            .returns({ left: 0, top: 0 });
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        game.store.entities.create(GateCreationButton, { x: 50, y: 50 });
        fakeCanvas.simulateMouseDown(54, 45);
        fakeCanvas.simulateMouseMove(101, 102);
        fakeCanvas.simulateMouseMove(201, 202);
        fakeCanvas.simulateMouseUp(201, 202);
        fakeCanvas.simulateClick(201, 202);
        fakeCanvas.simulateMouseMove(222, 222);
        fakeCanvas.simulateMouseMove(350, 144);
        //
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        //
        expect(game.store.entities.get(GateCreationButton).length).toBe(1);
        game.store.entities.get(GateCreationButton).forEach((instance) => {
            const pose = instance.get(PoseComponent);
            expect(pose.data.x).toBe(50);
            expect(pose.data.y).toBe(50);
        });
        expect(game.store.entities.get(Gate).length).toBe(1);
        game.store.entities.get(Gate).forEach((instance) => {
            const pose = instance.get(PoseComponent);
            expect(pose.data.x).toBe(154);
            expect(pose.data.y).toBe(145);
        });
        done();
    });

});
