import { DESIGNER_EVENT } from 'app/views/designer/enums/DESIGNER_EVENT';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import UIButton from './UIButton';

export default class DeleteGateButton extends UIButton {

  public constructor({}: { x: number; y: number; text?: string; src?: string }) {
    super(arguments[0]);
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