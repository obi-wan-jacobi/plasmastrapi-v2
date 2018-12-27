import Button from '../../app/entities/Button';
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
        impostorHTMLCanvasElement.expects('getBoundingClientRect').twice()
            .returns({ left: 0, top: 0 });
        game = new HTML5CanvasGame(impostorHTMLCanvasElement.unwrap());
    });

    afterEach(() => {
        impostorHTMLCanvasElement.verify();
        impostorHTMLCanvasElement.assertMethodsCalledInOrder();
    });

    it('clicking button creates gate that is immediately translatable', (done) => {
        //
        game.store.entities.create(Button, { x: 50, y: 50, width: 50, height: 50 });
        (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement)
            .simulateClick(50, 50);
        game.loop.once();
        (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement)
            .simulateMouseMove(101, 102);
        game.loop.once();
        // game.store.entities.get(Gate).forEach((instance) => {
        //     const pose = instance.components.get(PoseComponent);
        //     expect(pose.data.x).toBe(101);
        //     expect(pose.data.y).toBe(102);
        // });
        //
        expect(game.store.entities.get(Gate).length).toBe(1);
        done();
    });

});
