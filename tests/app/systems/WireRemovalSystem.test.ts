import FakeHTMLCanvasElement from '../../src/fakes/FakeHTMLCanvasElement';
import Gate from '../../../src/app/entities/circuit-elements/Gate';
import GateRemovalCaret from '../../../src/app/entities/tool-carets/GateRemovalCaret';
import ImpostorCanvasRenderingContext2D from '../../src//impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src//impostors/ImpostorHTMLCanvasElement';
import Plasmastrapi from '../../../src/app/Plasmastrapi';
import Wire from '../../../src/app/entities/circuit-elements/Wire';
import WireRemovalCaret from '../../../src/app/entities/tool-carets/WireRemovalCaret';
import WireRemovalSystem from '../../../src/app/systems/WireRemovalSystem';

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

    it('when gate is removed, all connected wires are also removed', (done) => {
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(3)
            .returns({ left: 0, top: 0 });
        const gate1 = game.store.entities.create(Gate, { x: 100, y: 100 });
        const gate2 = game.store.entities.create(Gate, { x: 200, y: 200 });
        const gate3 = game.store.entities.create(Gate, { x: 250, y: 50 });
        const gate4 = game.store.entities.create(Gate, { x: 40, y: 600 });
        game.store.entities.create(Wire, { head: gate2.input, tail: gate1.output });
        game.store.entities.create(Wire, { head: gate2.input, tail: gate3.output });
        game.store.entities.create(Wire, { head: gate2.input, tail: gate4.output });
        game.store.entities.create(Wire, { head: gate1.input, tail: gate2.output });
        game.store.entities.create(Wire, { head: gate3.input, tail: gate2.output });
        game.store.entities.create(Wire, { head: gate4.input, tail: gate2.output });
        // <gallumph> create other wires expected to always exist
        game.store.entities.create(Wire, { head: gate1.input, tail: gate3.output });
        game.store.entities.create(Wire, { head: gate1.input, tail: gate4.output });
        game.store.entities.create(Wire, { head: gate3.input, tail: gate1.output });
        game.store.entities.create(Wire, { head: gate4.input, tail: gate1.output });
        // </gallumph>
        game.store.sync();
        expect(game.store.entities.get(Wire).length).toBe(10);
        //
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        game.store.entities.create(GateRemovalCaret, { x: 100, y: 200 });
        fakeCanvas.simulateMouseDown(200, 200);
        fakeCanvas.simulateMouseUp(200, 200);
        fakeCanvas.simulateClick(200, 200);
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.store.sync();
        //
        expect(game.store.entities.get(Wire).length).toBe(4);
        done();
    });

});
