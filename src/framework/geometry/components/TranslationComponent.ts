import { IPose } from './PoseComponent';
import Component from 'engine/abstracts/Component';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITranslation extends IPose { }

export default class TranslationComponent extends Component<ITranslation> { }
