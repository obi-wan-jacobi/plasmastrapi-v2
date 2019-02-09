/* tslint:disable:no-magic-numbers */
import CircuitDesignArea from '../../../src/app/entities/editor/CircuitDesignArea';
import FakeHTMLCanvasElement from '../../src/fakes/FakeHTMLCanvasElement';
import Gate from '../../../src/app/entities/circuit-elements/Gate';
import ImpostorCanvasRenderingContext2D from '../../src//impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src//impostors/ImpostorHTMLCanvasElement';
import InputTerminal from '../../../src/app/entities/circuit-elements/InputTerminal';
import OutputTerminal from '../../../src/app/entities/circuit-elements/OutputTerminal';
import Plasmastrapi from '../../../src/app/Plasmastrapi';
import PoseComponent from '../../../src/engine/components/PoseComponent';
import Wire from '../../../src/app/entities/circuit-elements/Wire';
import WireCreationCaret from '../../../src/app/entities/tools/carets/WireCreationCaret';
import WireCreationSystem from '../../../src/app/systems/WireCreationSystem';

describe(WireCreationSystem.name, () => {

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
        game.store.entities.create(CircuitDesignArea, { position: { x: 500, y: 500 }, width: 1000, height: 1000 });
    });

    afterEach(() => {
        impostorHTMLCanvasElement.verify();
        impostorHTMLCanvasElement.assertMethodsCalledInOrder();
    });

    it('actuating output terminal creates new wire at mouse, but is destroyed if not immediately used', (done) => {
        // Arrange
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(5)
            .returns({ left: 0, top: 0 });
        const gate = game.store.entities.create(Gate, { x: 500, y: 500 });
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        fakeCanvas.simulateMouseDown(500, 472);
        fakeCanvas.simulateMouseMove(605, 450);
        fakeCanvas.simulateMouseUp(605, 450);
        fakeCanvas.simulateClick(605, 450);
        fakeCanvas.simulateMouseMove(505, 450);
        // Act 1
        game.loop.once();
        game.loop.once();
        // Assert 1
        expect(gate.get(PoseComponent).data).toEqual({ x: 500, y: 500, a: 0 });
        expect(gate.output.get(PoseComponent).data).toEqual({ x: 500, y: 472, a: 0 });
        expect(game.store.entities.get(Gate).length).toBe(1);
        expect(game.store.entities.get(InputTerminal).length).toBe(1);
        expect(game.store.entities.get(OutputTerminal).length).toBe(1);
        expect(game.store.entities.get(Wire).length).toBe(1);
        expect(game.store.entities.get(WireCreationCaret).length).toBe(1);
        expect(game.store.entities.get(CircuitDesignArea).length).toBe(1);
        expect(game.store.entities.length).toBe(6);
        game.store.entities.get(Wire).first((wire) => {
            expect(wire.get(PoseComponent).data).toEqual({
                x: 552.5,
                y: 461,
                a: -0.20653607310567618,
            });
        });
        game.store.entities.get(WireCreationCaret).first((TerminalCaret) => {
            expect(TerminalCaret.get(PoseComponent).data).toEqual({
                x: 605,
                y: 450,
                a: 0,
            });
        });
        // Act 2
        game.loop.once();
        game.loop.once();
        game.loop.once();
        // Assert 2
        expect(gate.get(PoseComponent).data).toEqual({ x: 500, y: 500, a: 0 });
        expect(gate.output.get(PoseComponent).data).toEqual({ x: 500, y: 472, a: 0 });
        expect(game.store.entities.get(Gate).length).toBe(1);
        expect(game.store.entities.get(InputTerminal).length).toBe(1);
        expect(game.store.entities.get(OutputTerminal).length).toBe(1);
        expect(game.store.entities.get(Wire).length).toBe(0);
        expect(game.store.entities.get(WireCreationCaret).length).toBe(0);
        expect(game.store.entities.length).toBe(4);
        done();
    });

    it('actuating input terminal creates new wire at mouse, but is destroyed if not immediately used', (done) => {
        // Arrange
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(5)
            .returns({ left: 0, top: 0 });
        const gate = game.store.entities.create(Gate, { x: 500, y: 500 });
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        fakeCanvas.simulateMouseDown(500, 528);
        fakeCanvas.simulateMouseMove(605, 450);
        fakeCanvas.simulateMouseUp(605, 450);
        fakeCanvas.simulateClick(605, 450);
        fakeCanvas.simulateMouseMove(505, 450);
        // Act 1
        game.loop.once();
        game.loop.once();
        // Assert 1
        expect(gate.get(PoseComponent).data).toEqual({ x: 500, y: 500, a: 0 });
        expect(gate.input.get(PoseComponent).data).toEqual({ x: 500, y: 528, a: 0 });
        expect(game.store.entities.get(Gate).length).toBe(1);
        expect(game.store.entities.get(InputTerminal).length).toBe(1);
        expect(game.store.entities.get(OutputTerminal).length).toBe(1);
        expect(game.store.entities.get(Wire).length).toBe(1);
        expect(game.store.entities.get(WireCreationCaret).length).toBe(1);
        expect(game.store.entities.get(CircuitDesignArea).length).toBe(1);
        expect(game.store.entities.length).toBe(6);
        game.store.entities.get(Wire).first((wire) => {
            expect(wire.get(PoseComponent).data).toEqual({
                x: 552.5,
                y: 489,
                a: 2.502678668585906,
            });
        });
        game.store.entities.get(WireCreationCaret).first((TerminalCaret) => {
            expect(TerminalCaret.get(PoseComponent).data).toEqual({
                x: 605,
                y: 450,
                a: 0,
            });
        });
        // Act 2
        game.loop.once();
        game.loop.once();
        game.loop.once();
        // Assert 2
        expect(gate.get(PoseComponent).data).toEqual({ x: 500, y: 500, a: 0 });
        expect(gate.input.get(PoseComponent).data).toEqual({ x: 500, y: 528, a: 0 });
        expect(game.store.entities.get(Gate).length).toBe(1);
        expect(game.store.entities.get(InputTerminal).length).toBe(1);
        expect(game.store.entities.get(OutputTerminal).length).toBe(1);
        expect(game.store.entities.get(Wire).length).toBe(0);
        expect(game.store.entities.get(WireCreationCaret).length).toBe(0);
        expect(game.store.entities.length).toBe(4);
        done();
    });

    it(['activating output terminal creates new wire at mouse,',
        'can be connected to an input terminal,',
        'and stays connected/resizes accordingly when either terminal is moved',
    ].join(' '), (done) => {
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(12)
            .returns({ left: 0, top: 0 });
        const gate1 = game.store.entities.create(Gate, { x: 500, y: 500 });
        const gate2 = game.store.entities.create(Gate, { x: 600, y: 500 });
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        fakeCanvas.simulateMouseDown(500, 472);
        fakeCanvas.simulateMouseMove(600, 528);
        fakeCanvas.simulateMouseUp(600, 528);
        fakeCanvas.simulateClick(600, 528);
        fakeCanvas.simulateMouseDown(500, 500);
        fakeCanvas.simulateMouseMove(505, 840);
        fakeCanvas.simulateMouseUp(505, 840);
        fakeCanvas.simulateClick(505, 840);
        fakeCanvas.simulateMouseDown(600, 500);
        fakeCanvas.simulateMouseMove(805, 140);
        fakeCanvas.simulateMouseUp(805, 140);
        fakeCanvas.simulateClick(805, 140);
        //
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        //
        expect(gate1.get(PoseComponent).data).toEqual({ x: 500, y: 500, a: 0 });
        expect(gate1.output.get(PoseComponent).data).toEqual({ x: 500, y: 472, a: 0 });
        expect(gate2.get(PoseComponent).data).toEqual({ x: 600, y: 500, a: 0 });
        expect(gate2.input.get(PoseComponent).data).toEqual({ x: 600, y: 528, a: 0 });
        expect(game.store.entities.get(Gate).length).toBe(2);
        expect(game.store.entities.get(InputTerminal).length).toBe(2);
        expect(game.store.entities.get(OutputTerminal).length).toBe(2);
        expect(game.store.entities.get(Wire).length).toBe(1);
        expect(game.store.entities.get(WireCreationCaret).length).toBe(0);
        game.store.entities.get(Wire).first((wire) => {
            expect(wire.get(PoseComponent).data).toEqual({
                x: 550,
                y: 500,
                a: 0.5104883219167758,
            });
        });
        //
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        //
        expect(gate1.get(PoseComponent).data).toEqual({ x: 505, y: 840, a: 0 });
        expect(gate1.output.get(PoseComponent).data).toEqual({ x: 505, y: 812, a: 0 });
        expect(gate2.get(PoseComponent).data).toEqual({ x: 805, y: 140, a: 0 });
        expect(gate2.input.get(PoseComponent).data).toEqual({ x: 805, y: 168, a: 0 });
        expect(game.store.entities.get(Gate).length).toBe(2);
        expect(game.store.entities.get(InputTerminal).length).toBe(2);
        expect(game.store.entities.get(OutputTerminal).length).toBe(2);
        expect(game.store.entities.get(Wire).length).toBe(1);
        expect(game.store.entities.get(WireCreationCaret).length).toBe(0);
        game.store.entities.get(Wire).first((wire) => {
            expect(wire.get(PoseComponent).data).toEqual({
                x: 655,
                y: 490,
                a: -1.1348494389852624,
            });
        });
        done();
    });

    it(['activating input terminal creates new wire at mouse,',
        'can be connected to an output terminal,',
        'and stays connected/resizes accordingly when either terminal is moved',
    ].join(' '), (done) => {
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(12)
            .returns({ left: 0, top: 0 });
        const gate1 = game.store.entities.create(Gate, { x: 500, y: 500 });
        const gate2 = game.store.entities.create(Gate, { x: 600, y: 500 });
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        fakeCanvas.simulateMouseDown(500, 528);
        fakeCanvas.simulateMouseMove(600, 472);
        fakeCanvas.simulateMouseUp(600, 472);
        fakeCanvas.simulateClick(600, 472);
        fakeCanvas.simulateMouseDown(500, 500);
        fakeCanvas.simulateMouseMove(505, 840);
        fakeCanvas.simulateMouseUp(505, 840);
        fakeCanvas.simulateClick(505, 840);
        fakeCanvas.simulateMouseDown(600, 500);
        fakeCanvas.simulateMouseMove(805, 140);
        fakeCanvas.simulateMouseUp(805, 140);
        fakeCanvas.simulateClick(805, 140);
        //
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        //
        expect(gate1.get(PoseComponent).data).toEqual({ x: 500, y: 500, a: 0 });
        expect(gate1.input.get(PoseComponent).data).toEqual({ x: 500, y: 528, a: 0 });
        expect(gate2.get(PoseComponent).data).toEqual({ x: 600, y: 500, a: 0 });
        expect(gate2.output.get(PoseComponent).data).toEqual({ x: 600, y: 472, a: 0 });
        expect(game.store.entities.get(Gate).length).toBe(2);
        expect(game.store.entities.get(InputTerminal).length).toBe(2);
        expect(game.store.entities.get(OutputTerminal).length).toBe(2);
        expect(game.store.entities.get(Wire).length).toBe(1);
        expect(game.store.entities.get(WireCreationCaret).length).toBe(0);
        game.store.entities.get(Wire).first((wire) => {
            expect(wire.get(PoseComponent).data).toEqual({
                x: 550,
                y: 500,
                a: 2.6311043316730176,
            });
        });
        //
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        //
        expect(gate1.get(PoseComponent).data).toEqual({ x: 505, y: 840, a: 0 });
        expect(gate1.input.get(PoseComponent).data).toEqual({ x: 505, y: 868, a: 0 });
        expect(gate2.get(PoseComponent).data).toEqual({ x: 805, y: 140, a: 0 });
        expect(gate2.output.get(PoseComponent).data).toEqual({ x: 805, y: 112, a: 0 });
        expect(game.store.entities.get(Gate).length).toBe(2);
        expect(game.store.entities.get(InputTerminal).length).toBe(2);
        expect(game.store.entities.get(OutputTerminal).length).toBe(2);
        expect(game.store.entities.get(Wire).length).toBe(1);
        expect(game.store.entities.get(WireCreationCaret).length).toBe(0);
        game.store.entities.get(Wire).first((wire) => {
            expect(wire.get(PoseComponent).data).toEqual({
                x: 655,
                y: 490,
                a: 1.9485629847347181,
            });
        });
        done();
    });

    it('duplicate wires not allowed', (done) => {
        // Arrange
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(12)
            .returns({ left: 0, top: 0 });
        const gate = game.store.entities.create(Gate, { x: 500, y: 500 });
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        fakeCanvas.simulateMouseDown(500, 528);
        fakeCanvas.simulateMouseMove(500, 472);
        fakeCanvas.simulateMouseUp(500, 472);
        fakeCanvas.simulateClick(500, 472);
        fakeCanvas.simulateMouseDown(500, 472);
        fakeCanvas.simulateMouseMove(500, 528);
        fakeCanvas.simulateMouseUp(500, 528);
        fakeCanvas.simulateClick(500, 528);
        fakeCanvas.simulateMouseDown(500, 528);
        fakeCanvas.simulateMouseMove(500, 472);
        fakeCanvas.simulateMouseUp(500, 472);
        fakeCanvas.simulateClick(500, 472);
        // Act 1
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.loop.once();
        game.store.sync();
        // Assert 1
        expect(gate.get(PoseComponent).data).toEqual({ x: 500, y: 500, a: 0 });
        expect(gate.input.get(PoseComponent).data).toEqual({ x: 500, y: 528, a: 0 });
        expect(gate.output.get(PoseComponent).data).toEqual({ x: 500, y: 472, a: 0 });
        expect(game.store.entities.get(Gate).length).toBe(1);
        expect(game.store.entities.get(InputTerminal).length).toBe(1);
        expect(game.store.entities.get(OutputTerminal).length).toBe(1);
        expect(game.store.entities.get(Wire).length).toBe(1);
        expect(game.store.entities.get(WireCreationCaret).length).toBe(0);
        game.store.entities.get(Wire).first((wire) => {
            expect(wire.get(PoseComponent).data).toEqual({
                x: 500,
                y: 500,
                a: 1.5707963267948966,
            });
        });
        done();
    });

});
