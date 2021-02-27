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
        default: {
          label: {
            text: labelText,
            fontSize: 20,
            offset: { x: 15, y: 7 },
          },
          image: { src },
        },
        hovered: {
          image: {
            src: './Terminal_hovered.png',
          },
        },
      },
    });
  }
}
