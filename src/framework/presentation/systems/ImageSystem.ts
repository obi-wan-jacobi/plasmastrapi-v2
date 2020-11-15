import ImageComponent from '../components/ImageComponent';
import System from '../../../engine/abstracts/System';
import PoseComponent from 'framework/geometry/components/PoseComponent';

export default class ImageSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(ImageComponent)((image) => {
            if (!image.copy().src) {
                return;
            }
            this.$engine.viewport.drawImage({
                pose  : image.$entity.$copy(PoseComponent) || { x: 0, y: 0, a: 0 },
                image : image.copy(),
            });
        });
    }
}
