
export enum TOOL_EVENT {
  DEFAULT = 'DEFAULT',
  ANDGATE_CREATE = 'ANDGATE_CREATE',
  NANDGATE_CREATE = 'NANDGATE_CREATE',
  ORGATE_CREATE = 'ORGATE_CREATE',
  XORGATE_CREATE = 'XORGATE_CREATE',
  HOVERSWITCH_CREATE = 'HOVERGATE_CREATE',
  ELEMENT_DELETE = 'GATE_DELETE',
  SELECTION_BEGIN = 'SELECTION_BEGIN',
  WIRE_CREATE = 'WIRE_CREATE',
  WIRE_DELETE = 'WIRE_DELETE',
  MOVE = 'MOVE',
  MOVE_MANY = 'MOVE_MANY',
  PASTE = 'PASTE',
  RESET = 'RESET'
}