import IAdaptedKeyboardEvent from './interfaces/IAdaptedKeyboardEvent';
import IKeyboardHandler from './interfaces/IKeyboardHandler';

export default class KeyboardHandler implements IKeyboardHandler {

  [key: string]: (keyboardEvent: IAdaptedKeyboardEvent) => void

  // constructor() {
    //   this.keydowns = {};
    //   this.keypresses = {};
    //   this.keyups = {};
    // }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public keydown(keyboardEvent: IAdaptedKeyboardEvent): void {
    // this.__handle(keyboardEvent, this.keydowns);
  }

  public keypress(keyboardEvent: IAdaptedKeyboardEvent): void {
    // this.__handle(keyboardEvent, this.keypresses);
  }

  public keyup(keyboardEvent: IAdaptedKeyboardEvent): void {
    // this.__handle(keyboardEvent, this.keyups);
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  // private __handle(
  //   keyboardEvent: IAdaptedKeyboardEvent,
  //   keys: { [key: string]: (keyboardEvent: IAdaptedKeyboardEvent) => void },
  // ): void {
  //   if (keys[keyboardEvent.key]) {
  //     keys[keyboardEvent.key](keyboardEvent);
  //   }
  // }

}
