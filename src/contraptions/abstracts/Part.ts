import IPart from 'contraptions/interfaces/IPart';
import IComponent from 'engine/interfaces/IComponent';
import { Ctor } from 'engine/types';
import PoseComponent, { IPose } from 'foundation/geometry/components/PoseComponent';
import AnimationComponent from 'foundation/presentation/components/AnimationComponent';
import { hereditary } from 'html5-canvas/decorators/hereditary';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default class Part extends HTML5CanvasElement implements IPart {

  private __initPose: IPose;

  public constructor(pose?: IPose) {
    super();
    this.init(pose || { x: 0, y: 0, a: 0});
  }

  public init(pose: IPose): void {
    this.__initPose = pose;
    this.$patch(PoseComponent, pose);
  }

  @hereditary
  public reset(): void {
    this.$patch(PoseComponent, this.__initPose);
  }

  public $patch<T extends IComponent<any>>(ComponentClass: Ctor<T, any>, data: T | any): this {
    if (ComponentClass.name === AnimationComponent.name) {
      this.$children.forEach((child) => child.$patch(AnimationComponent, data));
    }
    return super.$patch(ComponentClass, data);
  }

}