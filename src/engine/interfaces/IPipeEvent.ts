import IEntity from './IEntity';

export default interface IPipeEvent {
    name: string;
    target?: IEntity;
}