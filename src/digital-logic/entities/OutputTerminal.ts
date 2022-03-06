import UIEntity from 'ui/abstracts/UIEntity';

export default class OutputTerminal extends UIEntity {

  public constructor({ x, y, xOffset, yOffset }: { x: number; y: number; xOffset: number; yOffset: number }) {
    x += xOffset;
    y += yOffset;
    super({
      pose: { x, y, a: 0 },
      offset: { xOffset, yOffset },
      shape: {
        width: 20,
        height: 20,
      },
      style: {
        colour: 'WHITE',
        fill: 'rgba(0,0,0,0)',
        opacity: 1,
        zIndex: 0,
      },
      image: {
        src: './Terminal_out.png',
        zIndex: 0,
      },
      mouse: {
        isHovered: false,
      },
    });
  }


}