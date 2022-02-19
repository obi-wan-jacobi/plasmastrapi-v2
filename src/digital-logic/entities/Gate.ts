import UIEntity from 'ui/abstracts/UIEntity';
import InputTerminal from './InputTerminal';
import OutputTerminal from './OutputTerminal';

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
        isHovered: false,
      },
    });
    this.$appendChild(new InputTerminal({ x, y, xOffset: 0, yOffset: 20 }));
    this.$appendChild(new OutputTerminal({ x, y, xOffset: 0, yOffset: -20 }));
  }

}