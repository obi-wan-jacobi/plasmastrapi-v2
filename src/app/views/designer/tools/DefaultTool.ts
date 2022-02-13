import IEntity from 'engine/interfaces/IEntity';
import DesignerTool from '../abstracts/DesignerTool';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import Gate from 'digital-logic/entities/Gate';
import { ENTITIES } from 'engine/concretes/EntityMaster';

export default class DefaultTool extends DesignerTool<IEntity> {

  public equip(): void {
    super.equip();
    this.__setMouseEventsOnGates();
  }

  private __setMouseEventsOnGates(): void {
    ENTITIES.forEvery(Gate)((gate: Gate) => {
      gate.$mutate(MouseComponent)({
        events: {
          [MOUSE_EVENT.MOUSE_ENTER]: [[StyleComponent.name, { colour: 'YELLOW' }]],
          [MOUSE_EVENT.MOUSE_LEAVE]: [[StyleComponent.name, { colour: '' }]],
        },
        pipes: {},
        isHovered: false,
      });
    });
  }

}
