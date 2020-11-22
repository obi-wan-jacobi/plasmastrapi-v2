import EntityMaster from './EntityMaster';
import IKeyboardEvent from './interfaces/IKeyboardEvent';
import IMouseEvent from './interfaces/IMouseEvent';
import IComponentMaster from './interfaces/IComponentMaster';
import IEngine from './interfaces/IEngine';
import IEntityMaster from './interfaces/IEntityMaster';
import ISystem from './interfaces/ISystem';
import IViewportAdaptor from './interfaces/IViewportAdaptor';
import Dictionary from 'foundation/concretes/Dictionary';
import IDictionary from 'foundation/interfaces/IDictionary';
import { Stor } from './types';
import IEventMaster from './interfaces/IEventMaster';

export default class Engine<TImageSource> implements IEngine<TImageSource> {

  public entities: IEntityMaster;
  public events: { mouse?: IMouseEvent; keyboard?: IKeyboardEvent } = {};
  public delta: number;

  public viewport: IViewportAdaptor<TImageSource>;
  private __mouse: IEventMaster<IMouseEvent>;
  private __keyboard: IEventMaster<IKeyboardEvent>;
  private __systems: IDictionary<ISystem>;
  private __t: Date;

  constructor({ viewport, mouse, keyboard }: { viewport: IViewportAdaptor<TImageSource>; mouse: IEventMaster<IMouseEvent>; keyboard: IEventMaster<IKeyboardEvent> }) {
    this.entities = new EntityMaster();
    this.viewport = viewport;
    this.__mouse = mouse;
    this.__keyboard = keyboard;
    this.__systems = new Dictionary();
    this.__t = new Date();
  }

  public get components(): IComponentMaster {
    return this.entities.componentMaster;
  }

  public load(src: string): TImageSource {
    return this.viewport.load(src);
  }

  public add<T extends ISystem>(SystemClass: Stor<T>): void {
    this.__systems.write({
      key: SystemClass.name,
      value: new SystemClass(this),
    });
  }

  public remove<T extends ISystem>(SystemClass: Stor<T>): void {
    this.__systems.delete(SystemClass.name);
  }

  public once(): void {
    this.events.mouse = this.__mouse.next();
    this.events.keyboard = this.__keyboard.next();
    this.__ticktock();
    this.__systems.forEach((system: ISystem) => system.once());
    this.entities.circulate();
    this.__draw();
  }

  public start(): void {
    setInterval(this.once.bind(this), 1000 / 240);
  }

  private __ticktock(): void {
    const now = new Date();
    this.delta = now.getTime() - this.__t.getTime();
    this.__t = now;
  }

  private __draw(): void {
    this.__systems.forEach((system: ISystem) => system.draw());
    this.viewport.render();
  }
}
