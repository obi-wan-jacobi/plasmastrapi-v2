import Entity from '../../../src/engine/abstracts/Entity';
import HTML5CanvasGame from '../../../src/html5/HTML5CanvasGame';
import { HTML5_COLOUR } from '../../../src/html5/enums/HTML5_COLOUR';
import ImpostorCanvasRenderingContext2D from '../../src/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src/impostors/ImpostorHTMLCanvasElement';
import MouseEventComponent from '../../../src/engine/components/MouseEventComponent';
import PoseComponent from '../../../src/engine/components/PoseComponent';
import Rectangle from '../../../src/geometry/concretes/Rectangle';
import RenderingComponent from '../../../src/engine/components/RenderingComponent';
import ShapeComponent from '../../../src/engine/components/ShapeComponent';
import TranslationComponent from '../../../src/app/components/TranslationComponent';

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
        entity.add(MouseEventComponent);
        entity.add(PoseComponent, { x: 50, y: 50 });
        entity.add(ShapeComponent, new Rectangle({ width: 50, height: 50 }));
        entity.add(RenderingComponent, { colour: HTML5_COLOUR.RED });
        entity.add(TranslationComponent);
        //
        game.loop.once();
        //
        const expectedNumberOfComponents = 5;
        expect(entity.length).toBe(expectedNumberOfComponents);
        done();
    });

});
