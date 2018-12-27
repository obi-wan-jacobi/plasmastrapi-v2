import CursorEventComponent from '../../../framework/concretes/components/CursorEventComponent';
import Entity from '../../../framework/concretes/Entity';
import HTML5CanvasGame from '../../../html5/HTML5CanvasGame';
import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import ImpostorCanvasRenderingContext2D from '../../src/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src/impostors/ImpostorHTMLCanvasElement';
import PoseComponent from '../../../framework/concretes/components/PoseComponent';
import Rectangle from '../../../framework/concretes/geometry/shapes/Rectangle';
import RenderablePoseComponent from '../../../framework/concretes/components/RenderablePoseComponent';
import ShapeComponent from '../../../framework/concretes/components/ShapeComponent';
import TranslatableComponent from '../../../framework/concretes/components/TranslatableComponent';

describe(Entity.name, () => {

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

    it('load multiple components with dependencies', (done) => {
        const entity = game.store.entities.create(Entity);
        entity.components.add(new PoseComponent({ x: 50, y: 50 }));
        entity.components.add(new ShapeComponent(new Rectangle({ width: 50, height: 50 })));
        entity.components.add(new RenderablePoseComponent({ colour: HTML5_COLOUR.RED }));
        entity.components.add(new CursorEventComponent());
        entity.components.add(new TranslatableComponent({}));
        //
        game.loop.once();
        //
        expect(entity.components.length).toBe(5);
        done();
    });

});
