import LabelComponent from '../../../framework/presentation/components/LabelComponent';
import OutputTerminal from './OutputTerminal';

export default class PowerSupply extends OutputTerminal {

  public constructor() {
    super(arguments[0]);
    this.$add(LabelComponent)({
      text     : 'power',
      fontSize : 20,
      offset   : { x: 15, y: 7 },
    });
  }
}
