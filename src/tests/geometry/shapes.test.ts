import Rectangle from '../../geometry/concretes/Rectangle';
import { isPointInsideShape } from '../../geometry/methods/shapes';

describe('shapes', () => {

    it('is point inside shape for obvious case', (done) => {
        const shape = new Rectangle({ width: 200, height: 200 });
        const point = { x: 0, y: 0 };
        const pose = { x: 0, y: 0, a: 0 };
        expect(isPointInsideShape(point, shape, pose)).toBe(true);
        done();
    });

    it('is point inside shape when located on vertex', (done) => {
        const shape = new Rectangle({ width: 200, height: 200 });
        const point = { x: 100, y: 100 };
        const pose = { x: 0, y: 0, a: 0 };
        expect(isPointInsideShape(point, shape, pose)).toBe(true);
        done();
    });

    it('is point inside rotated shape for obvious case', (done) => {
        const shape = new Rectangle({ width: 200, height: 200 });
        const point = { x: 0, y: 0 };
        const pose = { x: 0, y: 0, a: Math.PI / 2 };
        expect(isPointInsideShape(point, shape, pose)).toBe(true);
        done();
    });

    it('is point inside rotated shape when located on vertex', (done) => {
        const shape = new Rectangle({ width: 200, height: 200 });
        const point = { x: 0, y: 100 };
        const pose = { x: 0, y: 0, a: 0 };
        expect(isPointInsideShape(point, shape, pose)).toBe(true);
        done();
    });

});
