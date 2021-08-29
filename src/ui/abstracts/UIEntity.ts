import ShapeComponent from '../../bootstrap/geometry/components/ShapeComponent';
import PoseComponent from 'bootstrap/geometry/components/PoseComponent';
import HTML5CanvasEntity from 'html5-canvas/HTML5CanvasEntity';
import IContainer from '../interfaces/IContainer';
import IContainerTemplate from '../interfaces/IContainerTemplate';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import StyleComponent from 'bootstrap/presentation/components/StyleComponent';
import ImageComponent from 'bootstrap/presentation/components/ImageComponent';
import AnimationComponent from 'bootstrap/presentation/components/AnimationComponent';
import LabelComponent from 'bootstrap/presentation/components/LabelComponent';
import { ComponentTuple } from 'engine/types';

const fromContainerToComponentTuples = (container: IContainer): Array<ComponentTuple<any>> => {
  return [
    [PoseComponent, container.pose],
    [ShapeComponent, container.shape],
    [MouseComponent, container.mouse],
    [StyleComponent, container.style],
    [LabelComponent, container.label],
    [ImageComponent, container.image],
    [AnimationComponent, container.animation],
  ];
};

const fromTemplateToContainer = (template: IContainerTemplate): IContainer => {
  // const baseTemplate = newContainerTemplate();
  // const container = lodash.merge(baseTemplate, template);
  const container = template;
  if (container.shape && !container.shape.vertices) {
    container.shape = {
      vertices: [
        { x: 1, y: 1 },
        { x: -1, y: 1 },
        { x: -1, y: -1 },
        { x: 1, y: -1 },
      ]
        .map((v) => ({ x: v.x / 2, y: v.y / 2 }))
        .map((v) => ({ x: v.x * container!.shape!.width, y: v.y * container!.shape!.height })),
    };
  }
  return container as IContainer;
};

export default class UIEntity extends HTML5CanvasEntity {

  public constructor(template?: IContainerTemplate) {
    super();
    const container = fromTemplateToContainer(template || {});
    const componentTuples = fromContainerToComponentTuples(container);
    componentTuples.forEach((tuple: any[]) => {
      if (tuple[1] === undefined) {
        return;
      }
      this.$add(tuple[0])(tuple[1]);
    });
  }

}
