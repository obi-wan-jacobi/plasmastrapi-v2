import InputTerminal from '../../digital-logic/entities/InputTerminal';
import LabelComponent from '../../../framework/presentation/components/LabelComponent';
import StyleComponent from '../../../framework/presentation/components/StyleComponent';

export default class Actuator extends InputTerminal {

  public constructor({ label }: { label: string }) {
    super(Object.assign({ x: 0, y: 0 }, arguments[0]));
    this.$add(StyleComponent)({ colour: 'WHITE' });
    this.$add(LabelComponent)({
      text     : label,
      fontSize : 20,
      offset   : { x: 15, y: 7 },
    });
  }
}
