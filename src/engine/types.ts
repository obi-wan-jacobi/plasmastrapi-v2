import IComponent from './interfaces/IComponent';
import IEntity from './interfaces/IEntity';
import ISystem from './interfaces/ISystem';
import { Constructor } from 'foundation/types';

type ABC<T> = { name: string; prototype: T };

export type Etor<T extends IEntity, TArg> = Constructor<T, TArg>;
export type EntityClass<T extends IEntity> = ABC<T>;

export type Ctor<T extends IComponent<TArg>, TArg extends {}> = Constructor<T, { data: TArg; entity: IEntity }>;
export type ComponentClass<T extends IComponent<TArg>, TArg extends {}> = ABC<T>;

export type Stor<T extends ISystem<any>> = Constructor<T, any>;
export type SystemClass<T extends ISystem<any>> = ABC<T>;
