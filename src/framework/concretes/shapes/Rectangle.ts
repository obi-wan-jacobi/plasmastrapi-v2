import Shape2D from '../../abstracts/Shape2D';

const HALF = 0.5;

export default class Rectangle<TColorType> extends Shape2D<TColorType> {

    constructor(width: number, height: number) {
        const x = width * HALF;
        const y = height * HALF;
        super([
            { x, y },
            { x: -x, y },
            { x: -x, y: -y },
            { x, y: -y }
        ]);
    }

}
