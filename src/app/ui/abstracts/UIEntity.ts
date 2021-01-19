import ShapeComponent from '../../../framework/geometry/components/ShapeComponent';
import IEntity from 'engine/interfaces/IEntity';
import PoseComponent from 'framework/geometry/components/PoseComponent';
import HTML5CanvasEntity from 'html5-canvas/HTML5CanvasEntity';
import IEntityTemplate from '../interfaces/IEntityTemplate';
import IEntityTemplateOverlay from '../interfaces/IEntityTemplateOverlay';
import newEntityTemplate from '../templates/default';
import lodash from 'lodash';
import HTML5StyleComponent from 'html5-canvas/components/HTML5StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import StyleComponent from 'framework/presentation/components/StyleComponent';

const buildComponents = (template: IEntityTemplate, entity: IEntity): void => {
    entity.$add(PoseComponent)(template.pose);
    entity.$add(ShapeComponent)(template.shape);
    entity.$add(MouseComponent)({ isHovered: false });
    entity.$add(StyleComponent)(template.style.default);
    entity.$add(HTML5StyleComponent)(template.style);
};

const buildTemplate = (overlay: IEntityTemplateOverlay): IEntityTemplate => {
  const baseTemplate = newEntityTemplate();
  const template = lodash.merge(baseTemplate, overlay);
  if (!template.shape.vertices) {
    template.shape = {
      vertices: [
        { x: template.shape.width / 2, y: template.shape.height / 2},
        { x: -template.shape.width / 2, y: template.shape.height / 2},
        { x: -template.shape.width / 2, y: -template.shape.height / 2},
        { x: template.shape.width / 2, y: -template.shape.height / 2},
      ],
    };
  }
  return template;
};

export default class UIEntity extends HTML5CanvasEntity {

  public constructor(overlay: IEntityTemplateOverlay) {
    super();
    const template = buildTemplate(overlay);
    buildComponents(template, this);
  }

}
