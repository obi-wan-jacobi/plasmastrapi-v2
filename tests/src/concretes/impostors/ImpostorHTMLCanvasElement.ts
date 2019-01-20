import FakeHTMLCanvasElement from '../../../src/fakes/FakeHTMLCanvasElement';
import Impostor from './Impostor';

export default class ImpostorHTMLCanvasElement extends Impostor<HTMLCanvasElement> {

    constructor() {
        super({ methods: [
            'getContext',
            'getBoundingClientRect',
        ], fake: new FakeHTMLCanvasElement() });
    }

}
