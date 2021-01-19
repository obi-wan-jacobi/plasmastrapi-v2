import StyleComponent from '../components/StyleComponent';
import System from '../../../engine/abstracts/System';
import PoseComponent from 'framework/geometry/components/PoseComponent';
import ShapeComponent from 'framework/geometry/components/ShapeComponent';
import { transformShape } from '../../helpers/geometry';
import IViewport from 'engine/interfaces/IViewport';
import IComponentMaster from 'engine/interfaces/IComponentMaster';

export default class StyleSystem extends System<any> {

    public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
        components.forEvery(StyleComponent)((style) => {
            const data = style.copy();
            const pose = style.$entity.$copy(PoseComponent);
            const shape = style.$entity.$copy(ShapeComponent);
            if (shape) {
                viewport.drawShape({
                    path: transformShape(shape, pose).vertices,
                    style: data,
                });
            }
            if (data.label) {
                viewport.drawLabel({
                    pose,
                    style: data,
                });
            }
            if (data.image) {
                viewport.drawImage({
                    pose,
                    image: data.image,
                    style: data,
                });
            }
            if (data.animation) {
                const animation = data.animation;
                if (animation.idur === animation.duration) {
                    animation.idur = 0;
                    if (animation.isReversed) {
                      animation.frame--;
                    } else {
                      animation.frame++;
                    }
                    if (animation.frame > animation.images.length - 1) {
                      animation.frame = 0;
                    }
                    if (animation.frame < 0) {
                      animation.frame = animation.images.length - 1;
                    }
                } else if (!animation.isPaused) {
                    animation.idur++;
                }
                style.patch({ animation });
                viewport.drawImage({
                    pose,
                    image: animation.images[animation.frame],
                    style: data,
                });
            }
        });
    }
}
