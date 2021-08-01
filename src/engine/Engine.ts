import IComponentMaster from './interfaces/IComponentMaster';
import IEngine from './interfaces/IEngine';
import IEntityMaster from './interfaces/IEntityMaster';
import ISystem from './interfaces/ISystem';
import IViewport from './interfaces/IViewport';
import Dictionary from 'core/concretes/Dictionary';
import IDictionary from 'core/interfaces/IDictionary';
import { Stor } from './types';
import IPipe from './interfaces/IPipe';
import IEvent from './interfaces/IEvent';
import { Dict } from 'core/types';
import { ENTITIES } from './core/EntityMaster';
import { COMPONENTS } from './core/ComponentMaster';

export default class Engine<TImageSource> implements IEngine<TImageSource> {

  public entities: IEntityMaster;
  public components: IComponentMaster;

  private __viewport: IViewport<TImageSource>;
  private __pipes: Dict<IPipe<IEvent>>;
  private __systems: IDictionary<ISystem<Dict<IPipe<IEvent>>>>;
  private __t: Date;
  private __delta: number;

  constructor({ viewport, pipes }: { viewport: IViewport<TImageSource>; pipes: Dict<IPipe<IEvent>> }) {
    this.entities = ENTITIES;
    this.components = COMPONENTS;
    this.__viewport = viewport;
    this.__pipes = pipes;
    this.__systems = new Dictionary();
  }

  public load(src: string): TImageSource {
    return this.__viewport.load(src);
  }

  public add<T extends ISystem<Dict<IPipe<IEvent>>>>(SystemCtor: Stor<T>): void {
    this.__systems.write({
      key: SystemCtor.name,
      value: new SystemCtor(this),
    });
  }

  public remove<T extends ISystem<Dict<IPipe<IEvent>>>>(SystemCtor: Stor<T>): void {
    this.__systems.delete(SystemCtor.name);
  }

  public start(): void {
    setInterval(this.once.bind(this), 1000 / 30);
  }

  public once(): void {
    this.__doPipes();
    this.__doDelta();
    this.__doSystems();
    this.__doUpkeep();
    this.__doRender();
  }

  private __doPipes(): void {
    Object.keys(this.__pipes).forEach((key) => this.__pipes[key].next());
  }

  private __doDelta(): void {
    const now = new Date();
    this.__delta = now.getTime() - (this.__t || now).getTime();
    this.__t = now;
  }

  private __doSystems(): void {
    this.__systems.forEach((system: ISystem<Dict<IPipe<IEvent>>>) => system.once({
        entities: this.entities,
        components: this.components,
        pipes: this.__pipes,
        delta: this.__delta,
      })
    );
  }

  private __doUpkeep(): void {
    this.entities.upkeep();
    this.components.upkeep();
  }

  private __doRender(): void {
    this.__systems.forEach((system: ISystem<Dict<IPipe<IEvent>>>) => system.draw({
        viewport: this.__viewport,
        components: this.components,
      })
    );
    this.__viewport.render();
  }
}
