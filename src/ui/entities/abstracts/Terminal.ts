import UIEntity from '../../abstracts/UIEntity';

export default class Terminal extends UIEntity {

  constructor({ x, y, src, labelText = '' }: { x: number; y: number; src: string; labelText: string }) {
    super({
      pose: { x, y, a: 0 },
      shape: {
        width: 20,
        height: 20,
      },
      style: {
        colour: 'WHITE',
        fill: 'rgba(0,0,0,0)',
        opacity: 1,
      },
      label: {
        text: labelText,
        fontSize: 20,
        offset: { x: 15, y: 7 },
      },
      image: { src },
    });
  }
}
