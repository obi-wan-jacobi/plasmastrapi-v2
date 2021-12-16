import UIEntity from 'ui/abstracts/UIEntity';

export default abstract class Tool extends UIEntity {

  public constructor({ x, y, src }: { x: number; y: number; src?: string }) {
    super({
      pose: { x, y, a: 0 },
      shape: { width: 10, height: 10 },
      style: {
        colour: 'WHITE',
        fill: 'rgba(0,0,0,0)',
        opacity: 1,
        zIndex: 0,
      },
      image: src ? { src, zIndex: 0 } : undefined,
    });
  }

}
