
import UIEntity from './abstracts/UIEntity';

export default abstract class UIButton extends UIEntity {

  public constructor({ x, y, text, src }: { x: number; y: number; text: string; src: string }) {
    super({
      pose: { x, y, a: 0 },
      shape: {
        width: 40,
        height: 40,
      },
      style: {
        colour: 'rgba(0,0,0,0)',
        fill: '',
        opacity: 1,
      },
      label: {
        fontSize: 10,
        text,
        offset: { x: -10, y: 4 },
      },
      image: {
        src,
      },
    });
  }
}
