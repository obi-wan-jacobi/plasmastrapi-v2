import Entity from '../../framework/concretes/Entity';
import FakeCanvas from '../src/fakes/FakeHTMLCanvasElement';
import HTML5CanvasGame from '../../html5/HTML5CanvasGame';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import Impostor from '../src/helpers/Impostor';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import RenderingComponent from '../../framework/concretes/components/RenderingComponent';

describe(HTML5CanvasGame.name, () => {

    let game: HTML5CanvasGame;

    // fakes
    let fakeCanvas: FakeCanvas;

    // mocks
    let impostorHTMLCanvasElement: Impostor<HTMLCanvasElement>;
    let impostorRenderingContext: Impostor<CanvasRenderingContext2D>;

    beforeEach(() => {
        fakeCanvas = new FakeCanvas();
        impostorHTMLCanvasElement = new Impostor<HTMLCanvasElement>({ methods: [
            'getContext',
            'getBoundingClientRect',
            'onclick'
        ], fake: fakeCanvas });
        impostorRenderingContext = new Impostor<CanvasRenderingContext2D>({ methods: [
            'clearRect',
            'save',
            'beginPath',
            'arc',
            'stroke',
            'closePath',
            'restore',
        ]});
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
