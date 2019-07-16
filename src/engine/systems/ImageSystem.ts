import { System } from '../abstracts/System';
import { ImageRenderingProfileComponent, PoseComponent } from '../components';

export default class ImageSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(ImageRenderingProfileComponent)((rendering) => {
            this.$engine.viewport.drawImage({
                pose: rendering.$entity.$copy(PoseComponent),
                rendering: rendering.copy(),
            });
        });
    }
}
