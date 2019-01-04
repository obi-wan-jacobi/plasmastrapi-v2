import FakeHTMLCanvasElement from '../../src/fakes/FakeHTMLCanvasElement';
import Gate from '../../../app/entities/Gate';
import ImpostorCanvasRenderingContext2D from '../../src/concretes/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src/concretes/impostors/ImpostorHTMLCanvasElement';
import Plasmastrapi from '../../../app/Plasmastrapi';
import Wire from '../../../app/entities/Wire';
import WireRemovalSystem from '../../../app/systems/WireRemovalSystem';

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

    it('remove wire', (done) => {
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(2)
            .returns({ left: 0, top: 0 });
        const gate1 = game.store.entities.create(Gate, { x: 100, y: 100 });
        const gate2 = game.store.entities.create(Gate, { x: 300, y: 300 });
        game.store.entities.create(Wire, { head: gate2.input, tail: gate1.output });
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        game.systems.add(WireRemovalSystem);
        fakeCanvas.simulateMouseDown(258.4000015258789, 275.63999009132385);
        fakeCanvas.simulateMouseUp(258.4000015258789, 275.63999009132385);
        game.loop.once();
        expect(game.store.entities.get(Wire).length).toBe(1);
        game.loop.once();
        game.store.sync();
        expect(game.store.entities.get(Wire).length).toBe(0);
        done();
    });

});
