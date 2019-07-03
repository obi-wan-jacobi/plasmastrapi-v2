import ComponentFactory from './ComponentFactory';
import EntityMaster from './EntityMaster';
import Factory from '../framework/concretes/Factory';
import IAdaptedKeyboardEvent from './interfaces/IAdaptedKeyboardEvent';
import IAdaptedMouseEvent from './interfaces/IAdaptedMouseEvent';
import IComponentFactory from './interfaces/IComponentFactory';
import IEngine from './interfaces/IEngine';
import IEntityFactory from './interfaces/IEntityMaster';
import IFactory from '../framework/interfaces/IFactory';
import ISystem from './interfaces/ISystem';
import IViewportAdaptor from './interfaces/IViewportAdaptor';
import { InteractiveSystem } from './systems/InteractiveSystem';
import LabelSystem from './systems/LabelSystem';
import ShapeSystem from './systems/ShapeSystem';
import { Ctor } from '../framework/types';

export default class Engine implements IEngine {

    public viewport: IViewportAdaptor;
    public components: IComponentFactory;
    public entities: IEntityFactory;

    public mouse: IAdaptedMouseEvent;
    public keyboard: IAdaptedKeyboardEvent;

    public delta: number;

    private __t: Date;
    private __systems: IFactory<ISystem>;

    constructor(viewport: IViewportAdaptor) {
        this.viewport = viewport;
        this.components = new ComponentFactory();
        this.entities = new EntityMaster(this);
        this.__systems = new Factory<ISystem>();
        this.__t = new Date();
        this.__initSystems();
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
    }

    public add(SystemCtor: Ctor<ISystem, any>): void {
        this.__systems.create(SystemCtor, this);
    }

    private __initSystems(): void {
        this.add(LabelSystem);
        this.add(ShapeSystem);
        this.add(InteractiveSystem);
    }

}
