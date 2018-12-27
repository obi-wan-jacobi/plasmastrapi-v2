import Entity from '../../framework/concretes/Entity';
import HTML5CanvasGame from '../../html5/HTML5CanvasGame';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import ImpostorCanvasRenderingContext2D from '../src/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../src/impostors/ImpostorHTMLCanvasElement';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import RenderingComponent from '../../framework/concretes/components/RenderingComponent';

describe(HTML5CanvasGame.name, () => {

    let impostorRenderingContext: ImpostorCanvasRenderingContext2D;
    let impostorHTMLCanvasElement: ImpostorHTMLCanvasElement;
    let game: HTML5CanvasGame;

    beforeEach(() => {
        impostorRenderingContext = new ImpostorCanvasRenderingContext2D();
        impostorHTMLCanvasElement = new ImpostorHTMLCanvasElement();
        impostorHTMLCanvasElement.expects('getContext').once()
            .withExactArgs('2d')
            .returns(impostorRenderingContext.unwrap());
        game = new HTML5CanvasGame(impostorHTMLCanvasElement.unwrap());
    });

    afterEach(() => {
        impostorHTMLCanvasElement.verify();
        impostorHTMLCanvasElement.assertMethodsCalledInOrder();
    });

    it('renderable component is rendered once during engine loop', (done) => {
        impostorRenderingContext.expects('clearRect').once();
        impostorRenderingContext.expects('save').once();
        impostorRenderingContext.expects('beginPath').once();
        impostorRenderingContext.expects('arc').once();
        impostorRenderingContext.expects('closePath').once();
        impostorRenderingContext.expects('stroke').once();
        impostorRenderingContext.expects('restore').once();
        //
        const entity = game.store.entities.create(Entity);
        entity.components.add(new PoseComponent({ x: 50, y: 50, a: 0 }));
        entity.components.add(new RenderingComponent({ colour: HTML5_COLOUR.NONE }));
        game.loop.once();
        //
        impostorRenderingContext.verify();
        impostorRenderingContext.assertMethodsCalledInOrder();
        done();
    });

});
