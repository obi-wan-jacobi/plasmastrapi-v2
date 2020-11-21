import StyleComponent from '../components/StyleComponent';
import System from '../../../engine/abstracts/System';
import PoseComponent from 'framework/geometry/components/PoseComponent';
import ShapeComponent from 'framework/geometry/components/ShapeComponent';
import { transformShape } from '../../helpers/geometry';

export default class StyleSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(StyleComponent)((style) => {
            const pose = style.$entity.$copy(PoseComponent);
            this.$engine.viewport.drawShape({
                path: transformShape(style.$entity.$copy(ShapeComponent), pose).vertices,
                style: style.copy(),
            });
        });
    }
}
