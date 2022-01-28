import IPipeEvent from '../../engine/interfaces/IPipeEvent';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface IKeyboardEvent extends IPipeEvent {
  key: string;
  isAltKeyDown: boolean;
  isShiftKeyDown: boolean;
}
