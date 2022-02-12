import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import UIEntity from 'ui/abstracts/UIEntity';
import { DESIGNER_EVENT } from './enums/DESIGNER_EVENT';

export default class DesignerView extends UIEntity {

  public constructor() {
    super({
      pose: { x: 400, y: 340, a: 0 },
      shape: { width: 800, height: 560 },
      style: {
        colour: 'WHITE',
        opacity: 1,
        fill: 'rgba(0,0,0,0)',
        zIndex: 0,
      },
      mouse: {
        pipes: {
          [MOUSE_EVENT.MOUSE_ENTER]: [['designer', { name: DESIGNER_EVENT.ENABLE }]],
          [MOUSE_EVENT.MOUSE_LEAVE]: [['designer', { name: DESIGNER_EVENT.DISABLE }]],
          [MOUSE_EVENT.MOUSE_DOWN]: [['designer', { name: DESIGNER_EVENT.SELECTION_MODE }]],
        },
        isHovered: false,
      },
    });
  }

}
