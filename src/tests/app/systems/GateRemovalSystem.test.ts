import FakeHTMLCanvasElement from '../../src/fakes/FakeHTMLCanvasElement';
import GateRemovalSystem from '../../../app/systems/GateRemovalSystem';
import ImpostorCanvasRenderingContext2D from '../../src/concretes/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src/concretes/impostors/ImpostorHTMLCanvasElement';
import Plasmastrapi from '../../../app/Plasmastrapi';
import Gate from '../../../app/entities/circuit-elements/Gate';
import GateRemovalCaret from '../../../app/entities/tool-carets/GateRemovalCaret';
import InputTerminal from '../../../app/entities/circuit-elements/InputTerminal';
import OutputTerminal from '../../../app/entities/circuit-elements/OutputTerminal';

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
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(3)
            .returns({ left: 0, top: 0 });
        game.store.entities.create(Gate, { x: 50, y: 50 });
        game.store.entities.create(GateRemovalCaret, { x: 55, y: 55 });
        fakeCanvas.simulateMouseDown(55, 55);
        fakeCanvas.simulateMouseUp(55, 55);
        fakeCanvas.simulateClick(55, 55);
        //
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.store.sync();
        //
        expect(game.store.entities.get(GateRemovalCaret).length).toBe(0);
        expect(game.store.entities.get(Gate).length).toBe(0);
        expect(game.store.entities.get(InputTerminal).length).toBe(0);
        expect(game.store.entities.get(OutputTerminal).length).toBe(0);
        done();
    });

});
