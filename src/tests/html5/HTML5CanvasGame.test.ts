import HTML5CanvasGame from '../../html5/HTML5CanvasGame';
import HTML5CanvasMouseInputSystem from '../../html5/systems/HTML5CanvasMouseInputSystem';
import Impostor from '../Impostor';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import RenderPoseSystem from '../../framework/concretes/systems/RenderPoseSystem';
import RenderShapeSystem from '../../framework/concretes/systems/RenderShapeSystem';

describe(HTML5CanvasGame.name, () => {

    it('renderable component is rendered once on first engine loop', (done) => {
        // mocks
        const imposterRenderingContext = new Impostor<CanvasRenderingContext2D>([
            'clearRect',
            'save',
            'beginPath',
            'arc',
            'stroke',
            'closePath',
            'restore',
        ]);
        const imposterHTMLCanvasElement = new Impostor<HTMLCanvasElement>([
            'getContext',
            'getBoundingClientRect',
        ]);
        // expectations
        imposterHTMLCanvasElement.expects('getContext').once()
            .withExactArgs('2d')
            .returns(imposterRenderingContext.invoke());
        imposterRenderingContext.expects('clearRect').once();
        imposterRenderingContext.expects('save').once();
        imposterRenderingContext.expects('beginPath').once();
        imposterRenderingContext.expects('arc').once();
        imposterRenderingContext.expects('closePath').once();
        imposterRenderingContext.expects('stroke').once();
        imposterRenderingContext.expects('restore').once();
        //
        const game = new HTML5CanvasGame(imposterHTMLCanvasElement.invoke());
        game.systems.addInputReceiver(HTML5CanvasMouseInputSystem);
        game.systems.addRenderer(RenderPoseSystem);
        game.systems.addRenderer(RenderShapeSystem);
        game.factory.components.create(PoseComponent, { x: 50, y: 50, a: 0 });
        game.loop.once();
        //
        imposterHTMLCanvasElement.verify();
        imposterHTMLCanvasElement.assertMethodsCalledInOrder();
        imposterRenderingContext.verify();
        imposterRenderingContext.assertMethodsCalledInOrder();

        done();
    });

});
