import { DESIGNER_EVENT } from 'app/views/designer/enums/DESIGNER_EVENT';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import UIEntity from 'ui/abstracts/UIEntity';

export default class Gate extends UIEntity {

  public constructor({ x, y, text, src }: { x: number; y: number; text?: string; src?: string }) {
    super({
      pose: { x, y, a: 0 },
      shape: {
        width: 40,
        height: 40,
      },
      style: {
        colour: '',
        fill: 'rgba(0,0,0,0)',
        opacity: 1,
        zIndex: 0,
      },
      label: !text ? undefined : {
        fontSize: 10,
        text,
        offset: { x: -10, y: 4 },
      },
      image: !src ? undefined : {
        src,
        zIndex: 0,
      },
      mouse: {
        pipes: {
          [MOUSE_EVENT.MOUSE_UP]: [['designer', { name: DESIGNER_EVENT.CREATE }]],
        },
        isHovered: false,
      },
    });
  }

}