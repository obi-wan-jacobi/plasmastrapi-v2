/* tslint:disable:no-magic-numbers */
import MouseEventComponent from '../../../src/engine/components/MouseEventComponent';
import DragComponent from '../../../src/app/components/DragComponent';
import DragSystem from '../../../src/app/systems/DragSystem';
import Entity from '../../../src/engine/abstracts/Entity';
import FakeHTMLCanvasElement from '../../src/fakes/FakeHTMLCanvasElement';
import ImpostorCanvasRenderingContext2D from '../../src//impostors/ImpostorCanvasRenderingContext2D';
import ImpostorHTMLCanvasElement from '../../src//impostors/ImpostorHTMLCanvasElement';
import Plasmastrapi from '../../../src/app/Plasmastrapi';
import PoseComponent from '../../../src/engine/components/PoseComponent';
import Rectangle from '../../../src/geometry/concretes/Rectangle';
import ShapeComponent from '../../../src/engine/components/ShapeComponent';

describe(DragSystem.name, () => {

    let impostorRenderingContext: ImpostorCanvasRenderingContext2D;
    let impostorHTMLCanvasElement: ImpostorHTMLCanvasElement;
    let game: Plasmastrapi;

    beforeEach(() => {
        impostorRenderingContext = new ImpostorCanvasRenderingContext2D();
        impostorHTMLCanvasElement = new ImpostorHTMLCanvasElement();
        impostorHTMLCanvasElement.expects('getContext').once()
            .withExactArgs('2d')
            .returns(impostorRenderingContext.unwrap());
        impostorHTMLCanvasElement.expects('getBoundingClientRect').exactly(3)
        .returns({ left: 0, top: 0 });
        game = new Plasmastrapi(impostorHTMLCanvasElement.unwrap());
    });

    afterEach(() => {
        impostorHTMLCanvasElement.verify();
        impostorHTMLCanvasElement.assertMethodsCalledInOrder();
    });

    it('draggable entity is dragged by actuated mouse translation', (done) => {
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        const entity = game.store.entities.create(Entity);
        entity.add(MouseEventComponent);
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

    it('non-draggable entity is not dragged by actuated mouse translation', (done) => {
        const fakeCanvas = (impostorHTMLCanvasElement.unwrap() as unknown as FakeHTMLCanvasElement);
        const entity = game.store.entities.create(Entity);
        entity.add(MouseEventComponent);
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
