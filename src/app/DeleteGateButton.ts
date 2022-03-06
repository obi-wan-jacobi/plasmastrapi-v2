import { DESIGNER_EVENT } from 'app/views/designer/enums/DESIGNER_EVENT';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import UIButton from 'ui/entities/UIButton';

export default class DeleteGateButton extends UIButton {

  public constructor({ x, y }: { x: number; y: number }) {
    super({ x, y, src: './TRASHCAN.png' });
    this.$mutate(MouseComponent)({
        events: {
          [MOUSE_EVENT.MOUSE_ENTER]: [[StyleComponent.name, { colour: 'YELLOW' }]],
          [MOUSE_EVENT.MOUSE_LEAVE]: [[StyleComponent.name, { colour: 'WHITE' }]],
        },
        pipes: {
          [MOUSE_EVENT.CLICK]: [['designer', { name: DESIGNER_EVENT.DELETE_MODE }]],
        },
        isHovered: false,
    });
  }

}