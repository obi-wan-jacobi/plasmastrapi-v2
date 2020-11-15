import ImageComponent from '../../../framework/presentation/components/ImageComponent';
import ShapeComponent from '../../../framework/geometry/components/ShapeComponent';
import StyleComponent from '../../../framework/presentation/components/StyleComponent';
import IEntityTemplate from 'app/IEntityTemplate';
import IAdaptedMouseEvent from 'engine/interfaces/IAdaptedMouseEvent';
import IComponent from 'engine/interfaces/IComponent';
import IEntity from 'engine/interfaces/IEntity';
import { Ctor } from 'engine/types';
import { Index } from 'foundation/types';
import PoseComponent from 'framework/geometry/components/PoseComponent';
import InteractiveEntity from 'framework/interactive/InteractiveEntity';
import LabelComponent from 'framework/presentation/components/LabelComponent';

const componentKeyMap: Index<Ctor<IComponent<any>, any>> = {
  pose  : PoseComponent,
  shape : ShapeComponent,
  style : StyleComponent,
  label : LabelComponent,
  image : ImageComponent,
};

const applyEntityTemplateToEntity = (template: IEntityTemplate, entity: IEntity): void => {
  Object.keys(componentKeyMap).forEach((key) => {
    const data = (template as Index<any>)[key];
    if (!data) {
      return;
    }
    entity.$add(componentKeyMap[key])(data);
  });
};

export default abstract class UIEntity extends InteractiveEntity {

  public constructor(template: IEntityTemplate) {
    super(arguments[0]);
    template.style = { colour: 'WHITE', fill: 'BLACK' } || template.style;
    applyEntityTemplateToEntity(template, this);
  }

  public $mousemove(e: IAdaptedMouseEvent): void {
    //
  }

  public $mouseenter(e: IAdaptedMouseEvent): void {
    //
  }

  public $mouseleave(e: IAdaptedMouseEvent): void {
    //
  }

  public $mousedown(e: IAdaptedMouseEvent): void {
    //
  }

  public $mouseup(e: IAdaptedMouseEvent): void {
    //
  }

  public $click(e: IAdaptedMouseEvent): void {
    //
  }

}
