import FakeHTMLCanvasElement from '../../src/fakes/FakeHTMLCanvasElement';
import ImpostorCanvasRenderingContext2D from '../../src/concretes/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src/concretes/impostors/ImpostorHTMLCanvasElement';
import Plasmastrapi from '../../../src/app/Plasmastrapi';
import WireRemovalSystem from '../../../src/app/systems/WireRemovalSystem';
import WireRemovalCaret from '../../../src/app/entities/tool-carets/WireRemovalCaret';
import Gate from '../../../src/app/entities/circuit-elements/Gate';
import Wire from '../../../src/app/entities/circuit-elements/Wire';

describe(WireRemovalSystem.name, () => {

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

    it('cut/remove wire between two different gates', (done) => {
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(3)
            .returns({ left: 0, top: 0 });
        const gate1 = game.store.entities.create(Gate, { x: 100, y: 100 });
        const gate2 = game.store.entities.create(Gate, { x: 300, y: 300 });
        game.store.entities.create(Wire, { head: gate2.input, tail: gate1.output });
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        game.store.entities.create(WireRemovalCaret, { x: 100, y: 200 });
        fakeCanvas.simulateMouseDown(100, 200);
        fakeCanvas.simulateMouseMove(300, 100);
        fakeCanvas.simulateMouseUp(300, 100);
        game.loop.once();
        expect(game.store.entities.get(Wire).length).toBe(1);
        game.loop.once();
        game.loop.once();
        game.store.sync();
        expect(game.store.entities.get(Wire).length).toBe(0);
        done();
    });

    it('cut/remove wire between terminals of the same gate', (done) => {
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(3)
            .returns({ left: 0, top: 0 });
        const gate = game.store.entities.create(Gate, { x: 100, y: 100 });
        game.store.entities.create(Wire, { head: gate.input, tail: gate.output });
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        game.store.entities.create(WireRemovalCaret, { x: 50, y: 100 });
        fakeCanvas.simulateMouseDown(50, 100);
        fakeCanvas.simulateMouseMove(150, 100);
        fakeCanvas.simulateMouseUp(150, 100);
        game.loop.once();
        expect(game.store.entities.get(Wire).length).toBe(1);
        game.loop.once();
        game.loop.once();
        game.store.sync();
        expect(game.store.entities.get(Wire).length).toBe(0);
        done();
    });

});
