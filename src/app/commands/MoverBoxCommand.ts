import Command from 'app/abstracts/Command';
import { app } from 'app/main';
import MoverBox, { moveTo } from 'app/tools/MoverBox';
import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import { IPoint } from 'foundation/geometry/components/PoseComponent';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';

export default class MoverBoxCommand extends Command {

  private __elements$: string[];
  private __start: IPoint;
  private __end: IPoint;

  private __isSkippedOnce = false;

  public constructor({ moverBox }: { moverBox: MoverBox<DigitalElement> }) {
    super();
    this.__elements$ = [...moverBox.items].map((element) => element.$id);
    this.__start = moverBox.start;
    this.__end = moverBox.current;
  }

  public invoke(): void {
    if (!this.__isSkippedOnce) {
      this.__isSkippedOnce = true;
      return;
    }
    moveTo([
      this.__elements$.map((element$) => app.entities.get(element$)) as IHTML5CanvasElement[],
      this.__start,
      this.__end,
    ]);
  }

  public undo(): void {
    moveTo([
      this.__elements$.map((element$) => app.entities.get(element$)) as IHTML5CanvasElement[],
      this.__end,
      this.__start,
    ]);
  }

}