import Impostor from '../helpers/Impostor';

export default class ImpostorCanvasRenderingContext2D extends Impostor<CanvasRenderingContext2D> {

    constructor() {
        super({ methods: [
            'clearRect',
            'save',
            'beginPath',
            'arc',
            'lineTo',
            'closePath',
            'stroke',
            'restore',
        ]});
    }

}
