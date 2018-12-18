import HTML5CanvasGame from '../../app/HTML5CanvasGame';
import PoseComponent from '../../app/components/PoseComponent';
import * as sinon from 'sinon';

describe(HTML5CanvasGame.name, () => {

    it('render-able component is rendered once on first engine loop', (done) => {
        // mocks
        const fakeRenderingContext = {
            arc: (): void => undefined,
            restore: (): void => undefined,
            save: (): void => undefined,
            stroke: (): void => undefined,
        } as unknown as CanvasRenderingContext2D;
        const fakeHTMLCanvasElement = {
            getContext: (): void => undefined,
        } as unknown as HTMLCanvasElement;
        const mockCanvas = sinon.mock(fakeHTMLCanvasElement);
        const mockContext = sinon.mock(fakeRenderingContext);
        // expectations
        const expectGetContext = mockCanvas.expects('getContext').once().withExactArgs('2d')
            .returns(fakeRenderingContext);
        const expectSave = mockContext.expects('save').once();
        const expectStroke = mockContext.expects('stroke').once();
        const expectRestore = mockContext.expects('restore').once();
        //
        const game = new HTML5CanvasGame(fakeHTMLCanvasElement);
        game.engine.factory.components.create(PoseComponent, { x: 50, y: 50, a: 0 });
        game.engine.systems.loopOnce();
        //
        mockCanvas.verify();
        mockContext.verify();
        sinon.assert.callOrder(
            expectGetContext,
            expectSave,
            expectStroke,
            expectRestore,
        );
        done();
    });

});
