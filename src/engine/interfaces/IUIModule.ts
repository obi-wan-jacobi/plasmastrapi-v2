import IContainer from '../../framework/interfaces/IContainer';
import IEntity from './IEntity';
import ILoadable from './ILoadable';

export default interface IUIModule extends ILoadable, IContainer<IEntity> {

}
