import HTML5CanvasGame from '../../../html5/HTML5CanvasGame';
import PoseComponent from '../../../framework/concretes/components/PoseComponent';
import * as sinon from 'sinon';

describe(HTML5CanvasGame.name, () => {

    it('render-able component is rendered once on first engine loop', (done) => {
        // mocks
        const fakeRenderingContext = {
            clearRect: (): void => undefined,
            save: (): void => undefined,
            beginPath: () => undefined,
            arc: (): void => undefined,
            stroke: (): void => undefined,
            closePath: (): void => undefined,
            restore: (): void => undefined,
        } as unknown as CanvasRenderingContext2D;
        const fakeHTMLCanvasElement = {
            getContext: (): void => undefined,
            getBoundingClientRect: (): void => undefined,
        } as unknown as HTMLCanvasElement;
        const mockCanvas = sinon.mock(fakeHTMLCanvasElement);
        const mockContext = sinon.mock(fakeRenderingContext);
        // expectations
        const expectGetContext = mockCanvas.expects('getContext')
            .twice()
            .withExactArgs('2d')
            .returns(fakeRenderingContext);
        const expectClearRect = mockContext.expects('clearRect').once();
        const expectSave = mockContext.expects('save').once();
        const expectBeginPath = mockContext.expects('beginPath').once();
        const expectArc = mockContext.expects('arc').once();
        const expectClosePath = mockContext.expects('closePath').once();
        const expectStroke = mockContext.expects('stroke').once();
        const expectRestore = mockContext.expects('restore').once();
        //
        const game = new HTML5CanvasGame(fakeHTMLCanvasElement);
        game.factory.components.create(PoseComponent, { x: 50, y: 50, a: 0 });
        game.systems.loopOnce();
        //
        mockCanvas.verify();
        mockContext.verify();
        sinon.assert.callOrder(
            expectGetContext,
            expectClearRect,
            expectSave,
            expectBeginPath,
            expectArc,
            expectClosePath,
            expectStroke,
            expectRestore,
        );
        done();
    });

});
