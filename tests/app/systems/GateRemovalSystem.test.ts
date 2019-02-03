import ActivateToolCommand from '../../../src/app/commands/ActivateToolCommand';
import FakeHTMLCanvasElement from '../../src/fakes/FakeHTMLCanvasElement';
import Gate from '../../../src/app/entities/circuit-elements/Gate';
import GateRemovalButton from '../../../src/app/entities/buttons/GateRemovalButton';
import GateRemovalCaret from '../../../src/app/entities/tools/carets/GateRemovalCaret';
import GateRemovalSystem from '../../../src/app/systems/GateRemovalSystem';
import IPosition2D from '../../../src/geometry/interfaces/IPosition2D';
import ImpostorCanvasRenderingContext2D from '../../src//impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src//impostors/ImpostorHTMLCanvasElement';
import InputTerminal from '../../../src/app/entities/circuit-elements/InputTerminal';
import OutputTerminal from '../../../src/app/entities/circuit-elements/OutputTerminal';
import Plasmastrapi from '../../../src/app/Plasmastrapi';

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
        __addThenRemoveGateWithClick({ x: 50, y: 50}, { x: 65, y: 35 });
        __addThenRemoveGateWithClick({ x: 50, y: 50}, { x: 35, y: 35 });
        __addThenRemoveGateWithClick({ x: 50, y: 50}, { x: 35, y: 65 });
        __addThenRemoveGateWithClick({ x: 50, y: 50}, { x: 65, y: 65 });
        done();
    });

    const __addThenRemoveGateWithClick = (gatePosition: IPosition2D, clickPosition: IPosition2D): void => {
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(3)
            .returns({ left: 0, top: 0 });
        game.store.entities.create(Gate, gatePosition);
        new ActivateToolCommand(game.store).invoke({
            position: { x: 0, y: 0 },
            toolButton: new GateRemovalButton({ x: 0, y: 0 }),
        });
        fakeCanvas.simulateMouseDown(clickPosition.x, clickPosition.y);
        fakeCanvas.simulateMouseUp(clickPosition.x, clickPosition.y);
        fakeCanvas.simulateClick(clickPosition.x, clickPosition.y);
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
    };

});
