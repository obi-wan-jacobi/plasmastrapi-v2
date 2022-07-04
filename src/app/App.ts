import Engine from '../engine/Engine';
import HTML5CanvasKeyboardAdaptor from '../html5-canvas/HTML5CanvasKeyboardEventPipe';
import HTML5CanvasMouseEventPipe from '../html5-canvas/HTML5CanvasMouseEventPipe';
import HTML5CanvasViewport from '../html5-canvas/HTML5CanvasViewport';
import IPipe from 'engine/interfaces/IPipe';
import { Stor } from 'engine/types';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import UIPane from './ui/UIPane';
import { Dict } from 'base/types';
import IController from './interfaces/IController';

export default class App<TControllers extends Dict<IController>> extends Engine<CanvasImageSource, { mouse: IPipe<IMouseEvent>; keyboard: IPipe<IKeyboardEvent> }> {

  public readonly root: IHTML5CanvasElement;
  public readonly controllers: TControllers;

  public constructor({ canvas, controllers, systems }: { canvas: HTMLCanvasElement; controllers: TControllers; systems: Stor[] }) {
    super({
      viewport: new HTML5CanvasViewport({ canvas }),
      pipes: {
        mouse: new HTML5CanvasMouseEventPipe({ canvas }),
        keyboard: new HTML5CanvasKeyboardAdaptor({ canvas }),
      },
      systems,
    });
    this.root = new HTML5CanvasElement();
    this.root.$appendChild(new UIPane({
      x: canvas.width / 2,
      y: canvas.height / 2,
      width: canvas.width,
      height: canvas.height,
    }));
    this.controllers = controllers;
  }

  public init(): void {
    for (const name in this.controllers) {
      this.controllers[name].init();
    }
  }
}
