import { Dict } from 'foundation/types';

export default class HTML5ImageBuffer {

  private __b: Dict<HTMLImageElement> = {};

  public load(src: string): CanvasImageSource {
    if (!this.__b[src]) {
      this.__b[src] = new Image();
      this.__b[src].src = src;
    }
    return this.__b[src];
  }

}