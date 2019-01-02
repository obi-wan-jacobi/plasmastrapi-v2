import FakeHTMLCanvasElement from '../../src/fakes/FakeHTMLCanvasElement';
import Gate from '../../../app/entities/Gate';
import GateRemovalSystem from '../../../app/systems/GateRemovalSystem';
import ImpostorCanvasRenderingContext2D from '../../src/concretes/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src/concretes/impostors/ImpostorHTMLCanvasElement';
import InputTerminal from '../../../app/entities/InputTerminal';
import OutputTerminal from '../../../app/entities/OutputTerminal';
import Plasmastrapi from '../../../app/Plasmastrapi';

describe(GateRemovalSystem.name, () => {

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

    it('remove gate', (done) => {
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(2)
            .returns({ left: 0, top: 0 });
        game.store.entities.create(Gate, { x: 50, y: 50 });
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        game.systems.add(GateRemovalSystem);
        fakeCanvas.simulateMouseDown(55, 55);
        fakeCanvas.simulateMouseUp(55, 55);
        //
        game.loop.once();
        game.loop.once();
        //
        expect(game.store.entities.get(Gate).length).toBe(0);
        expect(game.store.entities.get(InputTerminal).length).toBe(0);
        expect(game.store.entities.get(OutputTerminal).length).toBe(0);
        done();
    });

});
