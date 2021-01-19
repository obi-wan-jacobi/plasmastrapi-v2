import IEntityTemplateOverlay from 'app/ui/interfaces/IEntityTemplateOverlay';
import OutputTerminal from './OutputTerminal';

export default class PowerSupply extends OutputTerminal {

  public constructor({}: IEntityTemplateOverlay) {
    super(Object.assign({ labelText: 'power' }, arguments[0]));
  }
}
