import Command from 'app/abstracts/Command';
import { app } from 'app/main';
import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import { Etor } from 'engine/types';
import { IPoint } from 'foundation/geometry/components/PoseComponent';

export default class CreateDigitalElementCommand extends Command {

  private __element$?: string;
  private __children$?: string[];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private __Etor: Etor<DigitalElement, IPoint>;
  private __arg: IPoint;

  public constructor({ Etor, point }: { Etor: Etor<DigitalElement, IPoint>; point: IPoint }) {
    super();
    this.__Etor = Etor;
    this.__arg = point;
  }

  public invoke(): void {
    if (!this.__element$) {
      const element = new this.__Etor(this.__arg);
      this.__element$ = element.$id;
      this.__children$ = element.$children.toArray().map((c) => c.$id);
    } else {
      const element = new this.__Etor(this.__arg);
      const children = element.$children.toArray();
      app.entities.reId(element.$id, this.__element$);
      this.__children$?.forEach((c$, i) => app.entities.reId(children[i].$id, c$));
    }
  }

  public undo(): void {
    app.entities.get(this.__element$!)!.$destroy();
  }

}