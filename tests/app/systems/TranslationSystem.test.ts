import InputComponent from '../../../src/engine/components/InputComponent';
import Entity from '../../../src/engine/abstracts/Entity';
import FakeCanvas from '../../src/fakes/FakeHTMLCanvasElement';
import ImpostorCanvasRenderingContext2D from '../../src//impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src//impostors/ImpostorHTMLCanvasElement';
import Plasmastrapi from '../../../src/app/Plasmastrapi';
import PoseComponent from '../../../src/engine/components/PoseComponent';
import TranslationComponent from '../../../src/app/components/TranslationComponent';
import TranslationSystem from '../../../src/app/systems/TranslationSystem';

describe(TranslationSystem.name, () => {

    let impostorRenderingContext: ImpostorCanvasRenderingContext2D;
    let impostorHTMLCanvasElement: ImpostorHTMLCanvasElement;
    let game: Plasmastrapi;

    beforeEach(() => {
        impostorRenderingContext = new ImpostorCanvasRenderingContext2D();
        impostorHTMLCanvasElement = new ImpostorHTMLCanvasElement();
        impostorHTMLCanvasElement.expects('getContext').once()
            .withExactArgs('2d')
            .returns(impostorRenderingContext.unwrap());
        impostorHTMLCanvasElement.expects('getBoundingClientRect').once()
            .returns({ left: 0, top: 0 });
        game = new Plasmastrapi(impostorHTMLCanvasElement.unwrap());
    });

    afterEach(() => {
        impostorHTMLCanvasElement.verify();
        impostorHTMLCanvasElement.assertMethodsCalledInOrder();
    });

    it('translatable entity is translated with cursor movement', (done) => {
        const entity = game.store.entities.create(Entity);
        entity.add(InputComponent);
        entity.add(PoseComponent, { x: 0, y: 0 });
        const translatable = entity.add(TranslationComponent);
        const data = translatable.data;
        data.previous.cursor.x = 0;
        data.previous.cursor.y = 0;
        translatable.mutate(data);
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
