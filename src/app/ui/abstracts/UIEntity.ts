import ShapeComponent from '../../../framework/geometry/components/ShapeComponent';
import PoseComponent from 'framework/geometry/components/PoseComponent';
import HTML5CanvasEntity from 'html5-canvas/HTML5CanvasEntity';
import IContainer from '../interfaces/IContainer';
import IContainerTemplate from '../interfaces/IContainerTemplate';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import StyleComponent from 'framework/presentation/components/StyleComponent';
import ImageComponent from 'framework/presentation/components/ImageComponent';
import AnimationComponent from 'framework/presentation/components/AnimationComponent';

const fromContainerToComponentTuples = (container: IContainer): any[] => {
  return [
    [PoseComponent, container.pose],
    [ShapeComponent, container.shape],
    [MouseComponent, container.mouse],
    [StyleComponent, container.style],
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
