import ActiveToolButtonFrame from '../../../src/app/entities/ActiveItemFrame';
import CircuitDesignArea from '../../../src/app/entities/CircuitDesignArea';
import FakeHTMLCanvasElement from '../../src/fakes/FakeHTMLCanvasElement';
import Gate from '../../../src/app/entities/circuit-elements/Gate';
import GateCreationButton from '../../../src/app/entities/buttons/GateCreationButton';
import GateCreationCaret from '../../../src/app/entities/tool-carets/GateCreationCaret';
import ImpostorCanvasRenderingContext2D from '../../src//impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src//impostors/ImpostorHTMLCanvasElement';
import Plasmastrapi from '../../../src/app/Plasmastrapi';
import PoseComponent from '../../../src/engine/components/PoseComponent';
import TranslationSystem from '../../../src/app/systems/TranslationSystem';

describe(TranslationSystem.name, () => {

    let impostorRenderingContext: ImpostorCanvasRenderingContext2D;
    let impostorHTMLCanvasElement: ImpostorHTMLCanvasElement;
    let game: Plasmastrapi;
    let fakeCanvas: FakeHTMLCanvasElement;

    beforeEach(() => {
        impostorRenderingContext = new ImpostorCanvasRenderingContext2D();
        impostorHTMLCanvasElement = new ImpostorHTMLCanvasElement();
        impostorHTMLCanvasElement.expects('getContext').once()
        .withExactArgs('2d')
        .returns(impostorRenderingContext.unwrap());
        game = new Plasmastrapi(impostorHTMLCanvasElement.unwrap());
        fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
    });

    afterEach(() => {
        impostorHTMLCanvasElement.verify();
        impostorHTMLCanvasElement.assertMethodsCalledInOrder();
    });

    it('tool is selected, button is highlighted, and then caret is consumed', (done) => {
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(13)
            .returns({ left: 0, top: 0 });
        game.store.entities.create(GateCreationButton, { x: 50, y: 50 });
        game.store.entities.create(CircuitDesignArea, { position: { x: 300, y: 300 }, width: 200, height: 200 });
        __doFullClick(54, 45);
        fakeCanvas.simulateMouseMove(101, 102);
        fakeCanvas.simulateMouseMove(201, 202);
        __doFullClick(201, 202);
        fakeCanvas.simulateMouseMove(222, 222);
        fakeCanvas.simulateMouseMove(350, 144);
        __doFullClick(350, 144);
        //
        expect(game.store.entities.get(GateCreationCaret).length).toBe(0);
        expect(game.store.entities.get(ActiveToolButtonFrame).length).toBe(0);
        __doLoop(3);
        game.store.sync();
        expect(game.store.entities.get(GateCreationCaret).length).toBe(1);
        expect(game.store.entities.get(ActiveToolButtonFrame).length).toBe(1);
        __doLoop(5);
        game.store.sync();
        expect(game.store.entities.get(GateCreationCaret).length).toBe(0);
        expect(game.store.entities.get(ActiveToolButtonFrame).length).toBe(0);
        __doLoop(5);
        //
        expect(game.store.entities.get(GateCreationButton).length).toBe(1);
        const button = game.store.entities.get(GateCreationButton).first()!;
        const pose = button.get(PoseComponent);
        expect(pose.data.x).toBe(50);
        expect(pose.data.y).toBe(50);
        expect(game.store.entities.get(Gate).length).toBe(1);
        const gate = game.store.entities.get(Gate).first()!;
        expect(gate.get(PoseComponent).data).toEqual({ x: 201, y: 202, a: 0 });
        done();
    });

    const __doFullClick = (x: number, y: number): void => {
        fakeCanvas.simulateMouseDown(x, y);
        fakeCanvas.simulateMouseUp(x, y);
        fakeCanvas.simulateClick(x, y);
    };

    const __doLoop = (times: number): void => {
        while(times > 0) {
            game.loop.once();
            times--;
        }
    };

});
