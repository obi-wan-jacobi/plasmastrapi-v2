import Dictionary from '../foundation/concretes/Dictionary';
import EntityMaster from './EntityMaster';
import IAdaptedKeyboardEvent from './interfaces/IAdaptedKeyboardEvent';
import IAdaptedMouseEvent from './interfaces/IAdaptedMouseEvent';
import IComponentMaster from './interfaces/IComponentMaster';
import IDictionary from '../foundation/interfaces/IDictionary';
import IEngine from './interfaces/IEngine';
import IEntityFactory from './interfaces/IEntityMaster';
import ISystem from './interfaces/ISystem';
import IViewportAdaptor from './interfaces/IViewportAdaptor';
import { Stor } from './types';

export default class Engine implements IEngine {

  public viewport: IViewportAdaptor<any>;
  public entities: IEntityFactory;

  public mouse: IAdaptedMouseEvent;
  public keyboard: IAdaptedKeyboardEvent;

  public delta: number;

  private __t: Date;
  private __systems: IDictionary<ISystem>;

  constructor(viewport: IViewportAdaptor<any>) {
    this.viewport = viewport;
    this.entities = new EntityMaster();
    this.__systems = new Dictionary();
    this.__t = new Date();
  }

  public get components(): IComponentMaster {
    return this.entities.components;
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

  public add<T extends ISystem>(SystemClass: Stor<T>): void {
    this.__systems.write({
      key: SystemClass.name,
      value: new SystemClass(this),
    });
  }

  public remove<T extends ISystem>(SystemClass: Stor<T>): void {
    this.__systems.delete(SystemClass.name);
  }

}
