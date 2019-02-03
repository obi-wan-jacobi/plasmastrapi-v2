/* tslint:disable:no-magic-numbers */
import CircuitDesignArea from '../../../src/app/entities/CircuitDesignArea';
import FakeHTMLCanvasElement from '../../src/fakes/FakeHTMLCanvasElement';
import Gate from '../../../src/app/entities/circuit-elements/Gate';
import GateCreationButton from '../../../src/app/entities/buttons/GateCreationButton';
import GateCreationCaret from '../../../src/app/entities/tools/carets/GateCreationCaret';
import GateCreationSystem from '../../../src/app/systems/GateCreationSystem';
import ImpostorCanvasRenderingContext2D from '../../src//impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src//impostors/ImpostorHTMLCanvasElement';
import Plasmastrapi from '../../../src/app/Plasmastrapi';
import PoseComponent from '../../../src/engine/components/PoseComponent';

describe(GateCreationSystem.name, () => {

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

    it('new gate not created when cursor isn\'t within circuit design area', (done) => {
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(10)
            .returns({ left: 0, top: 0 });
        game.store.entities.create(GateCreationButton, { x: 50, y: 50 });
        game.store.entities.create(CircuitDesignArea, { position: { x: 1, y: 1 }, width: 1, height: 1 });
        __doFullClick(54, 45);
        fakeCanvas.simulateMouseMove(101, 102);
        fakeCanvas.simulateMouseMove(201, 202);
        __doFullClick(201, 202);
        fakeCanvas.simulateMouseMove(222, 222);
        fakeCanvas.simulateMouseMove(350, 144);
        //
        __doLoop(10);
        //
        expect(game.store.entities.get(GateCreationButton).length).toBe(1);
        game.store.entities.get(GateCreationButton).first((instance) => {
            const pose = instance.get(PoseComponent);
            expect(pose.data.x).toBe(50);
            expect(pose.data.y).toBe(50);
        });
        expect(game.store.entities.get(GateCreationCaret).length).toBe(0);
        expect(game.store.entities.get(Gate).length).toBe(0);
        done();
    });

    it('new gate created when cursor is inside circuit design area', (done) => {
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(10)
            .returns({ left: 0, top: 0 });
        game.store.entities.create(GateCreationButton, { x: 50, y: 50 });
        game.store.entities.create(CircuitDesignArea, { position: { x: 300, y: 300 }, width: 200, height: 200 });
        __doFullClick(54, 45);
        fakeCanvas.simulateMouseMove(101, 102);
        fakeCanvas.simulateMouseMove(201, 202);
        __doFullClick(201, 202);
        fakeCanvas.simulateMouseMove(222, 222);
        fakeCanvas.simulateMouseMove(350, 144);
        //
        __doLoop(10);
        //
        expect(game.store.entities.get(GateCreationButton).length).toBe(1);
        game.store.entities.get(GateCreationButton).first((instance) => {
            const pose = instance.get(PoseComponent);
            expect(pose.data.x).toBe(50);
            expect(pose.data.y).toBe(50);
        });
        expect(game.store.entities.get(GateCreationCaret).length).toBe(0);
        expect(game.store.entities.get(Gate).length).toBe(1);
        game.store.entities.get(Gate).first((gate) => {
            expect(gate.get(PoseComponent).data).toEqual({ x: 201, y: 202, a: 0 });
        });
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
