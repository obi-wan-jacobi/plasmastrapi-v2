import { System } from '../abstracts/System';
import { AnimatedImageRenderingProfile, Pose } from '../components';

export class AnimatedImageSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(AnimatedImageRenderingProfile)((profile) => {
            const data = profile.copy();
            if (data.cooldown === data.speed) {
                data.cooldown = 0;
                if (data.isReversed) {
                    data.frame--;
                } else {
                    data.frame++;
                }
                if (data.frame > data.src.length - 1) {
                    data.frame = 0;
                }
                if (data.frame < 0) {
                    data.frame = data.src.length - 1;
                }
            } else if (!data.isPaused) {
                data.cooldown++;
            }
            profile.$entity.$mutate(AnimatedImageRenderingProfile)(data);
            this.$engine.viewport.drawImage({
                pose: profile.$entity.$copy(Pose),
                rendering: Object.assign(data, {
                    src: data.src[data.frame],
                }),
            });
        });
    }
}
