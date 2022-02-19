import Component from 'engine/abstracts/Component';

export interface IOffset {
  xOffset: number;
  yOffset: number;
}

export default class OffsetComponent extends Component<IOffset> {}