import ComponentFactory from './ComponentFactory';
import Dictionary from '../data-structures/concretes/Dictionary';
import EntityFactory from './EntityFactory';
import IAdaptedKeyboardEvent from './interfaces/IAdaptedKeyboardEvent';
import IAdaptedMouseEvent from './interfaces/IAdaptedMouseEvent';
import IComponentFactory from './interfaces/IComponentFactory';
import IDictionary from '../data-structures/interfaces/IDictionary';
import IEngine from './interfaces/IEngine';
import IEntityFactory from './interfaces/IEntityFactory';
import ISystem from './interfaces/ISystem';
import IViewportAdaptor from './interfaces/IViewportAdaptor';
import { Ctor } from 'src/data-structures/types';

export default class Engine implements IEngine {

  public viewport: IViewportAdaptor<any>;
  public components: IComponentFactory;
  public entities: IEntityFactory;

  public mouse: IAdaptedMouseEvent;
  public keyboard: IAdaptedKeyboardEvent;

  public delta: number;

  private __t: Date;
  private __systems: IDictionary<ISystem>;

  constructor(viewport: IViewportAdaptor<any>) {
    this.viewport = viewport;
    this.components = new ComponentFactory();
    this.entities = new EntityFactory(this);
    this.__systems = new Dictionary<ISystem>();
    this.__t = new Date();
  }

  public once(): void {
    const now = new Date();
    this.delta = now.getTime() - this.__t.getTime();
    this.__t = now;
    this.__systems.forEach((system: ISystem) => system.once());
    this.entities.once();
  }

  public draw(): void {
    this.__systems.forEach((system: ISystem) => system.draw());
    this.viewport.once();
  }

  public add(SystemCtor: Ctor<ISystem, any>): void {
    this.__systems.write({
      key: SystemCtor.name,
      value: new SystemCtor(this),
    });
  }

  public remove(SystemCtor: Ctor<ISystem, any>): void {
    this.__systems.delete(SystemCtor.name);
  }

}
