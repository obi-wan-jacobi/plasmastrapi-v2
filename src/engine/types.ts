import IEntity from './interfaces/IEntity';
import { Constructor } from '../foundation/types';
import IComponent from './interfaces/IComponent';
import ISystem from './interfaces/ISystem';

export type Etor<T extends IEntity, TArg> = Constructor<T, TArg>;

export type Ctor<T extends IComponent<any>, TArg extends {}> = Constructor<T, TArg>;

export type Stor<T extends ISystem> = Constructor<T, any>;

