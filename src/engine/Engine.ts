import { AnimatedImageSystem } from './systems/AnimatedImageSystem';
import ComponentFactory from './ComponentFactory';
import Dictionary from '../framework/concretes/Dictionary';
import EntityMaster from './EntityMaster';
import IAdaptedKeyboardEvent from './interfaces/IAdaptedKeyboardEvent';
import IAdaptedMouseEvent from './interfaces/IAdaptedMouseEvent';
import IComponentFactory from './interfaces/IComponentFactory';
import IDictionary from '../framework/interfaces/IDictionary';
import IEngine from './interfaces/IEngine';
import IEntityFactory from './interfaces/IEntityMaster';
import ISystem from './interfaces/ISystem';
import IViewportAdaptor from './interfaces/IViewportAdaptor';
import ImageSystem from './systems/ImageSystem';
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
    private __systems: IDictionary<ISystem>;

    constructor(viewport: IViewportAdaptor) {
        this.viewport = viewport;
        this.components = new ComponentFactory();
        this.entities = new EntityMaster(this);
        this.__systems = new Dictionary<ISystem>();
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
        this.__systems.write({
            key: SystemCtor.name,
            value: new SystemCtor(this),
        });
    }

    public remove(SystemCtor: Ctor<ISystem, any>): void {
        this.__systems.delete(SystemCtor.name);
    }

    private __initSystems(): void {
        this.add(LabelSystem);
        this.add(ShapeSystem);
        this.add(ImageSystem);
        this.add(AnimatedImageSystem);
        this.add(InteractiveSystem);
    }

}
