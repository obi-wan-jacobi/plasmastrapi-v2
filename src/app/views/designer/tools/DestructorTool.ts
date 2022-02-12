import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import DesignerTool from '../abstracts/DesignerTool';
import IEntity from 'engine/interfaces/IEntity';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import Gate from 'digital-logic/entities/Gate';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import { DESIGNER_EVENT } from '../enums/DESIGNER_EVENT';
import IPipeEvent from 'engine/interfaces/IPipeEvent';

export default class DestructorTool extends DesignerTool<IEntity> {

  public equip(): void {
    super.equip();
    ENTITIES.forEvery(Gate)((gate: Gate) => {
      gate.$mutate(MouseComponent)({
        events: {
          [MOUSE_EVENT.MOUSE_ENTER]: [[StyleComponent.name, { colour: 'RED' }]],
          [MOUSE_EVENT.MOUSE_LEAVE]: [[StyleComponent.name, { colour: '' }]],
        },
        pipes: {
          [MOUSE_EVENT.CLICK]: [['designer', { name: DESIGNER_EVENT.DELETE }]],
        },
        isHovered: false,
      });
    });
  }

  public dispose(): void {
    super.dispose();
    ENTITIES.forEvery(Gate)((gate: Gate) => {
      gate.$mutate(MouseComponent)({
        events: {},
        pipes: {},
        isHovered: false,
      });
    });
  }

  public [DESIGNER_EVENT.DELETE]({ designerEvent }: { designerEvent: IPipeEvent }): void {
    designerEvent.target?.$destroy();
    this.dispose();
  }
}
