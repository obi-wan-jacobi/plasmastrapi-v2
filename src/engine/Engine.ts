import IComponentMaster from './interfaces/IComponentMaster';
import IEngine from './interfaces/IEngine';
import IEntityMaster from './interfaces/IEntityMaster';
import ISystem from './interfaces/ISystem';
import IViewport from './interfaces/IViewport';
import Dictionary from 'foundation/concretes/Dictionary';
import IDictionary from 'foundation/interfaces/IDictionary';
import { Stor } from './types';
import IPipe from './interfaces/IPipe';
import IEvent from './interfaces/IEvent';
import { Dict } from 'foundation/types';
import { ENTITIES } from './core/EntityMaster';
import { COMPONENTS } from './core/ComponentMaster';

export default class Engine<TImageSource, TPipes extends Dict<IPipe<IEvent>>> implements IEngine<TImageSource, TPipes> {

  public entities: IEntityMaster;
  public components: IComponentMaster;

  private __viewport: IViewport<TImageSource>;
  private __pipes: TPipes;
  private __systems: IDictionary<ISystem<TPipes>>;
  private __t: Date;
  private __delta: number;

  constructor({ viewport, pipes }: { viewport: IViewport<TImageSource>; pipes: TPipes }) {
    this.entities = ENTITIES;
    this.components = COMPONENTS;
    this.__viewport = viewport;
    this.__pipes = pipes;
    this.__systems = new Dictionary();
  }


  public load(src: string): TImageSource {
    return this.__viewport.load(src);
  }

  public add<T extends ISystem<TPipes>>(SystemClass: Stor<T>): void {
    this.__systems.write({
      key: SystemClass.name,
      value: new SystemClass(this),
    });
  }

  public remove<T extends ISystem<TPipes>>(SystemClass: Stor<T>): void {
    this.__systems.delete(SystemClass.name);
  }

  public start(): void {
    setInterval(this.once.bind(this), 1000 / 240);
  }

  public once(): void {
    this.__doPipes();
    this.__doDelta();
    this.__doSystems();
    this.__doUpkeep();
    this.__doRender();
  }

  private __doPipes(): void {
    Object.keys(this.__pipes).forEach((name) => this.__pipes[name].next());
  }

  private __doDelta(): void {
    const now = new Date();
    this.__delta = now.getTime() - (this.__t || now).getTime();
    this.__t = now;
  }

  private __doSystems(): void {
    this.__systems.forEach((system: ISystem<TPipes>) => {
      return system.once({
        entities: this.entities,
        components: this.components,
        pipes: this.__pipes,
        delta: this.__delta,
      });
    });
  }

  private __doUpkeep(): void {
    this.entities.upkeep();
    this.components.upkeep();
  }

  private __doRender(): void {
    this.__systems.forEach((system: ISystem<TPipes>) => {
      return system.draw({
        viewport: this.__viewport,
        components: this.components,
      });
    });
    this.__viewport.render();
  }
}
