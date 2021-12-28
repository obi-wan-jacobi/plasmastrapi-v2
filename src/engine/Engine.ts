import IComponentMaster from './interfaces/IComponentMaster';
import IEngine from './interfaces/IEngine';
import IEntityMaster from './interfaces/IEntityMaster';
import ISystem from './interfaces/ISystem';
import IViewport from './interfaces/IViewport';
import Dictionary from 'base/concretes/Dictionary';
import IDictionary from 'base/interfaces/IDictionary';
import { Stor } from './types';
import { ENTITIES } from './core/EntityMaster';
import { COMPONENTS } from './core/ComponentMaster';
import IPipe from './interfaces/IPipe';
import IEvent from './interfaces/IEvent';
import { Dict } from 'base/types';

export default class Engine<TImageSource, TPipes extends Dict<IPipe<IEvent>>> implements IEngine<TImageSource, TPipes> {

  public entities: IEntityMaster;
  public components: IComponentMaster;

  private __viewport: IViewport<TImageSource>;
  private __pipes: TPipes;
  private __systems: IDictionary<ISystem<TPipes>> = new Dictionary();
  private __t: Date;
  private __delta: number;

  constructor({ viewport, pipes, systems }: { viewport: IViewport<TImageSource>; pipes: TPipes; systems: Stor<TPipes>[] }) {
    this.entities = ENTITIES;
    this.components = COMPONENTS;
    this.__viewport = viewport;
    this.__pipes = pipes;
    this.__initSystems(systems);
  }

  private __initSystems(systems: Stor<TPipes>[]): void {
    systems.forEach((SystemCtor) => this.add(SystemCtor));
  }

  public load(src: string): TImageSource {
    return this.__viewport.load(src);
  }

  public add(SystemCtor: Stor<TPipes>): void {
    this.__systems.write({
      key: SystemCtor.name,
      value: new SystemCtor(),
    });
  }

  public remove(SystemCtor: Stor<TPipes>): void {
    this.__systems.delete(SystemCtor.name);
  }

  public start(): void {
    setInterval(this.once.bind(this), 1000 / 30);
  }

  public once(): void {
    this.__doDelta();
    this.__doPipes();
    this.__doSystems();
    this.__doUpkeep();
    this.__doRender();
  }

  private __doDelta(): void {
    const now = new Date();
    this.__delta = now.getTime() - (this.__t || now).getTime();
    this.__t = now;
  }

  private __doPipes(): void {
    Object.keys(this.__pipes).forEach((key) => this.__pipes[key].next());
  }

  private __doSystems(): void {
    this.__systems.forEach((system: ISystem<TPipes>) => system.once({
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
    this.__systems.forEach((system: ISystem<TPipes>) => system.draw({
        viewport: this.__viewport,
        components: this.components,
      })
    );
    this.__viewport.render();
  }
}
