import ShapeComponent from '../../foundation/geometry/components/ShapeComponent';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import HTML5CanvasEntity from 'html5-canvas/HTML5CanvasEntity';
import IContainer from '../interfaces/IContainer';
import IContainerTemplate from '../interfaces/IContainerTemplate';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import ImageComponent from 'foundation/presentation/components/ImageComponent';
import AnimationComponent from 'foundation/presentation/components/AnimationComponent';
import LabelComponent from 'foundation/presentation/components/LabelComponent';
import { ComponentTuple, Ctor } from 'engine/types';
import { Dict, Tuple } from 'base/types';
import IComponent from 'engine/interfaces/IComponent';

const COMPONENT_TEMPLATING_MAP = [
  [PoseComponent, 'pose'],
  [ShapeComponent, 'shape'],
  [MouseComponent, 'mouse'],
  [StyleComponent, 'style'],
  [LabelComponent, 'label'],
  [ImageComponent, 'image'],
  [AnimationComponent, 'animation'],
];

export const COMPONENT_MAP: Dict<Ctor<IComponent<any>, any>> = (function() {
  const map: Dict<any> = {};
  COMPONENT_TEMPLATING_MAP.forEach((tuple: Tuple<Ctor<IComponent<any>, any>, any>) => {
    map[tuple[0].name] = tuple[0];
  });
  return map;
})();

const fromContainerToComponentTuples = (container: IContainer): Array<ComponentTuple<any>> => {
  return COMPONENT_TEMPLATING_MAP.map((tuple: Tuple<Ctor<IComponent<any>, any>, any>) => {
    return [ tuple[0], (container as Dict<any>)[tuple[1]] ];
  });
};

const fromTemplateToContainer = (template: IContainerTemplate): IContainer => {
  // const baseTemplate = newContainerTemplate();
  // const container = lodash.merge(baseTemplate, template);
  shapeTemplateHelper(template);
  mouseTemplateHelper(template);
  return template as IContainer;
};

const shapeTemplateHelper = (template: IContainerTemplate): void => {
  if (!template.shape) {
    return;
  }
  if (template.shape.vertices) {
    return;
  }
  template.shape = {
    vertices: [
      { x: 1, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 },
    ]
      .map((v) => ({ x: v.x / 2, y: v.y / 2 }))
      .map((v) => ({ x: v.x * template!.shape!.width, y: v.y * template!.shape!.height })),
  };
};

const mouseTemplateHelper = (template: IContainerTemplate): void => {
  if (!template.mouse) {
    return;
  }
  Object.keys(template.mouse.events).forEach((event: string) => {
    (template.mouse!.events as Dict<any>)[event] = template.mouse?.events[event].map((tuple: ComponentTuple<any>) => {
      return [tuple[0].name, tuple[1]];
    });
  });
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
