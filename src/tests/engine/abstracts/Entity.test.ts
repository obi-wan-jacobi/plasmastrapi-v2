import CursorEventComponent from '../../../engine/concretes/components/CursorEventComponent';
import Entity from '../../../engine/abstracts/Entity';
import HTML5CanvasGame from '../../../html5/HTML5CanvasGame';
import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import ImpostorCanvasRenderingContext2D from '../../src/concretes/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src/concretes/impostors/ImpostorHTMLCanvasElement';
import PoseComponent from '../../../engine/concretes/components/PoseComponent';
import Rectangle from '../../../geometry/concretes/Rectangle';
import RenderingComponent from '../../../engine/concretes/components/RenderingComponent';
import ShapeComponent from '../../../engine/concretes/components/ShapeComponent';
import TranslationComponent from '../../../engine/concretes/components/TranslationComponent';

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
        entity.add(CursorEventComponent);
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
