import Shape2D from '../../../abstracts/Shape2D';

const HALF = 0.5;

export default class Rectangle<TColorType> extends Shape2D<TColorType> {

    constructor({ width, height, colour }: { width: number, height: number, colour: TColorType }) {
        const x = width * HALF;
        const y = height * HALF;
        super({ vertices: [
            { x, y },
            { x: -x, y },
            { x: -x, y: -y },
            { x, y: -y }
        ], colour });
    }

}
