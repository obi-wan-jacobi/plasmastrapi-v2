import { ImageComponent } from '../components/ImageComponent';
import { System } from '../../../engine/abstracts/System';
import { PoseComponent } from 'src/framework/geometry/components/PoseComponent';

export default class ImageSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(ImageComponent)((image) => {
            this.$engine.viewport.drawImage({
                pose: image.$entity.$copy(PoseComponent),
                image: image.copy(),
            });
        });
    }
}
