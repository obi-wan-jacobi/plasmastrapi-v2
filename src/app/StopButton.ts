import { PLAYER_EVENT } from 'app/views/designer/enums/PLAYER_EVENT';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import UIEntity from 'ui/abstracts/UIEntity';

export default class StopButton extends UIEntity {

  public constructor({ x, y }: { x: number; y: number }) {
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
      label: {
        fontSize: 10,
        text: 'STOP',
        offset: { x: -14, y: 4 },
      },
    });
    this.$mutate(MouseComponent)({
      events: {
        [MOUSE_EVENT.MOUSE_ENTER]: [[StyleComponent.name, { colour: 'YELLOW' }]],
        [MOUSE_EVENT.MOUSE_LEAVE]: [[StyleComponent.name, { colour: 'WHITE' }]],
      },
        pipes: {
          [MOUSE_EVENT.CLICK]: [['player', { name: PLAYER_EVENT.STOP }]],
        },
        isHovered: false,
    });
  }

}