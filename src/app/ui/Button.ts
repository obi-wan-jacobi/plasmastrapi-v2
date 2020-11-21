
import UIEntity from './abstracts/UIEntity';

export default abstract class Button extends UIEntity {

  public constructor({ x, y, text, src }: { x: number; y: number; text: string; src: string }) {
    super(Object.assign({
      pose: { x, y, a: 0 },
      width: 40,
      height: 40,
      label: {
        fontSize: 10,
        text,
        offset: { x: -10, y: 4 },
        colour: 'WHITE',
        fill: 'rgba(0,0,0,0)',
        opacity: 1,
        zIndex: 0,
      },
      image: {
        src,
        opacity: 0,
        zIndex: 0,
      },
    }, arguments[0]));
  }
}
