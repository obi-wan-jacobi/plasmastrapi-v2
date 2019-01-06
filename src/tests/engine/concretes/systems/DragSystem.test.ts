import DragComponent from '../../../../engine/concretes/components/DragComponent';
import DragSystem from '../../../../engine/concretes/systems/DragSystem';
import Entity from '../../../../engine/abstracts/Entity';
import FakeHTMLCanvasElement from '../../../src/fakes/FakeHTMLCanvasElement';
import HTML5CanvasGame from '../../../../html5/HTML5CanvasGame';
import ImpostorCanvasRenderingContext2D from '../../../src/concretes/impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../../src/concretes/impostors/ImpostorHTMLCanvasElement';
import PoseComponent from '../../../../engine/concretes/components/PoseComponent';
import Rectangle from '../../../../geometry/concretes/Rectangle';
import ShapeComponent from '../../../../engine/concretes/components/ShapeComponent';

describe(DragSystem.name, () => {

    let impostorRenderingContext: ImpostorCanvasRenderingContext2D;
    let impostorHTMLCanvasElement: ImpostorHTMLCanvasElement;
    let game: HTML5CanvasGame;

    beforeEach(() => {
        impostorRenderingContext = new ImpostorCanvasRenderingContext2D();
        impostorHTMLCanvasElement = new ImpostorHTMLCanvasElement();
        impostorHTMLCanvasElement.expects('getContext').once()
            .withExactArgs('2d')
            .returns(impostorRenderingContext.unwrap());
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(3)
        .returns({ left: 0, top: 0 });
        game = new HTML5CanvasGame(impostorHTMLCanvasElement.unwrap());
    });

    afterEach(() => {
        impostorHTMLCanvasElement.verify();
        impostorHTMLCanvasElement.assertMethodsCalledInOrder();
    });

    it('draggable entity is dragged by actuated cursor translation', (done) => {
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        const entity = game.store.entities.create(Entity);
        entity.add(PoseComponent, { x: 50, y: 50 });
        entity.add(ShapeComponent, new Rectangle({ width: 50, height: 50 }));
        entity.add(DragComponent);
        fakeCanvas.simulateMouseDown(51, 52);
        fakeCanvas.simulateMouseMove(51, 52);
        fakeCanvas.simulateMouseMove(155, 173);
        //
        game.loop.once();
        game.loop.once();
        game.loop.once();
        //
        const pose = entity.get(PoseComponent);
        expect(pose.data.x).toBe(154);
        expect(pose.data.y).toBe(171);
        done();
    });

    it('non-draggable entity is not dragged by actuated cursor translation', (done) => {
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        const entity = game.store.entities.create(Entity);
        entity.add(PoseComponent, { x: 50, y: 50 });
        entity.add(ShapeComponent, new Rectangle({ width: 50, height: 50 }));
        fakeCanvas.simulateMouseDown(51, 52);
        fakeCanvas.simulateMouseMove(51, 52);
        fakeCanvas.simulateMouseMove(155, 173);
        //
        game.loop.once();
        game.loop.once();
        game.loop.once();
        //
        const pose = entity.get(PoseComponent);
        expect(pose.data.x).toBe(50);
        expect(pose.data.y).toBe(50);
        done();
    });

});
