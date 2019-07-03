import IComponent from '../interfaces/IComponent';
import { System } from '../abstracts/System';
import { IShape, Pose, RenderingProfile, Shape } from '../components';
import { transformShape } from '../geometry';

export default class ShapeSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(Shape)((shape: IComponent<IShape>) => {
            const rendering = shape.$entity.copy(RenderingProfile);
            if (rendering) {
                this.$engine.viewport.drawShape({
                    shape: transformShape(shape.copy(), shape.$entity.copy(Pose)),
                    rendering,
                });
            }
        });
    }
}
