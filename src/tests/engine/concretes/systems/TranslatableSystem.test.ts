import Entity from '../../../../engine/concretes/Entity';
import FakeCanvas from '../../../src/fakes/FakeHTMLCanvasElement';
import HTML5CanvasGame from '../../../../html5/HTML5CanvasGame';
import ImpostorCanvasRenderingContext2D from '../../../src/concretes/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../../src/concretes/impostors/ImpostorHTMLCanvasElement';
import PoseComponent from '../../../../engine/concretes/components/PoseComponent';
import TranslatableComponent from '../../../../engine/concretes/components/TranslatableComponent';
import TranslatableSystem from '../../../../engine/concretes/systems/TranslatableSystem';

describe(TranslatableSystem.name, () => {

    let impostorRenderingContext: ImpostorCanvasRenderingContext2D;
    let impostorHTMLCanvasElement: ImpostorHTMLCanvasElement;
    let game: HTML5CanvasGame;

    beforeEach(() => {
        impostorRenderingContext = new ImpostorCanvasRenderingContext2D();
        impostorHTMLCanvasElement = new ImpostorHTMLCanvasElement();
        impostorHTMLCanvasElement.expects('getContext').once()
            .withExactArgs('2d')
            .returns(impostorRenderingContext.unwrap());
        impostorHTMLCanvasElement.expects('getBoundingClientRect').once()
            .returns({ left: 0, top: 0 });
        game = new HTML5CanvasGame(impostorHTMLCanvasElement.unwrap());
    });

    afterEach(() => {
        impostorHTMLCanvasElement.verify();
        impostorHTMLCanvasElement.assertMethodsCalledInOrder();
    });

    it('translatable entity is translated with cursor movement', (done) => {
        const entity = game.store.entities.create(Entity);
        entity.add(PoseComponent, { x: 0, y: 0 });
        const translatable = entity.add(TranslatableComponent);
        translatable.data.previous.cursor.x = 0;
        translatable.data.previous.cursor.y = 0;
        (impostorHTMLCanvasElement.unwrap() as unknown as FakeCanvas).simulateMouseMove(50, 50);
        //
        game.loop.once();
        //
        const pose = entity.get(PoseComponent);
        expect(pose.data.x).toBe(50);
        expect(pose.data.y).toBe(50);
        done();
    });

});
