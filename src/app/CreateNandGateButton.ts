import { DESIGNER_EVENT } from 'app/views/designer/enums/DESIGNER_EVENT';
import NandGate from 'digital-logic/entities/NandGate';
import { IPoint } from 'foundation/geometry/components/PoseComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import UIButton from '../ui/entities/UIButton';

export default class CreateNandGateButton extends UIButton {

  public constructor({ x, y }: { x: number; y: number }) {
    super({ x, y, src: './NandGate.png' });
    this.$mutate(MouseComponent)({
      events: {
        [MOUSE_EVENT.MOUSE_ENTER]: [[StyleComponent.name, { colour: 'YELLOW' }]],
        [MOUSE_EVENT.MOUSE_LEAVE]: [[StyleComponent.name, { colour: 'WHITE' }]],
      },
      pipes: {
        [MOUSE_EVENT.CLICK]: [['designer', { name: DESIGNER_EVENT.CREATE_MODE }]],
      },
      isHovered: false,
    });
  }

  public create({ x, y }: IPoint): NandGate {
    return new NandGate({ x, y });
  }

}