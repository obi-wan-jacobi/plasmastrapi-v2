import FakeHTMLCanvasElement from '../src/fakes/FakeHTMLCanvasElement';
import Gate from '../../app/entities/Gate';
import HTML5CanvasGame from '../../html5/HTML5CanvasGame';
import ImpostorCanvasRenderingContext2D from '../src/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../src/impostors/ImpostorHTMLCanvasElement';
import Plasmastrapi from '../../app/Plasmastrapi';
import PoseComponent from '../../framework/concretes/components/PoseComponent';

describe(Plasmastrapi.name, () => {

    let impostorRenderingContext: ImpostorCanvasRenderingContext2D;
    let impostorHTMLCanvasElement: ImpostorHTMLCanvasElement;
    let game: HTML5CanvasGame;

    beforeEach(() => {
        impostorRenderingContext = new ImpostorCanvasRenderingContext2D();
        impostorHTMLCanvasElement = new ImpostorHTMLCanvasElement();
        impostorHTMLCanvasElement.expects('getContext').once()
            .withExactArgs('2d')
            .returns(impostorRenderingContext.unwrap());
        impostorHTMLCanvasElement.expects('getBoundingClientRect').thrice()
            .returns({ left: 0, top: 0 });
        game = new HTML5CanvasGame(impostorHTMLCanvasElement.unwrap());
    });

    afterEach(() => {
        impostorHTMLCanvasElement.verify();
        impostorHTMLCanvasElement.assertMethodsCalledInOrder();
    });

    it('clicking button creates gate that is immediately translatable', (done) => {
        //
        game.store.entities.create(Button, { x: 51, y: 52, width: 50, height: 50 });
        (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement)
            .simulateClick(50, 50);
        game.loop.once();
        (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement)
            .simulateMouseMove(101, 102);
        game.loop.once();
        (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement)
            .simulateMouseMove(201, 202);
        game.loop.once();
        //
        expect(game.store.entities.get(Button).length).toBe(1);
        game.store.entities.get(Button).forEach((instance) => {
            const pose = instance.components.get(PoseComponent);
            expect(pose.data.x).toBe(51);
            expect(pose.data.y).toBe(52);
        });
        expect(game.store.entities.get(Gate).length).toBe(1);
        game.store.entities.get(Gate).forEach((instance) => {
            const pose = instance.components.get(PoseComponent);
            expect(pose.data.x).toBe(151);
            expect(pose.data.y).toBe(152);
        });
        done();
    });

});
