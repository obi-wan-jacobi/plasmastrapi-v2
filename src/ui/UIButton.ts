
import { DESIGNER_EVENT } from 'app/views/designer/pipes/DESIGNER_EVENT';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import UIEntity from './abstracts/UIEntity';

export default class UIButton extends UIEntity {

  public constructor({ x, y, text, src }: { x: number; y: number; text?: string; src?: string }) {
    super({
      pose: { x, y, a: 0 },
      shape: {
        width: 40,
        height: 40,
      },
      style: {
        colour: 'WHITE',
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
        events: {
          'mouseenter': [[StyleComponent, { colour: 'YELLOW' }]],
          'mouseleave': [[StyleComponent, { colour: 'WHITE' }]],
        },
        pipes: {
          'mouseenter': [['designer', { name: DESIGNER_EVENT.PREVIEW }]],
        },
        isHovered: false,
      },
    });
  }
}
