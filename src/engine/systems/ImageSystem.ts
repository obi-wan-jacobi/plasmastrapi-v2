import { System } from '../abstracts/System';
import { ImageRenderingProfile, Pose } from '../components';

export default class ImageSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(ImageRenderingProfile)((rendering) => {
            this.$engine.viewport.drawImage({
                pose: rendering.$entity.$copy(Pose),
                rendering: rendering.copy(),
            });
        });
    }
}
