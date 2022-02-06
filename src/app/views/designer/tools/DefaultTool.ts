// import { Dict, Fn } from 'base/types';
// import Gate from 'digital-logic/entities/Gate';
// import IEntity from 'engine/interfaces/IEntity';
// import IPipeEvent from 'engine/interfaces/IPipeEvent';
// import MouseComponent from 'html5-canvas/components/MouseComponent';
// import PoseComponent from 'foundation/geometry/components/PoseComponent';
// import StyleComponent from 'foundation/presentation/components/StyleComponent';
// import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
// import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
// import { DESIGNER_EVENT } from '../enums/DESIGNER_EVENT';
// import DesignerTool from '../base/DesignerTool';

// export default class DefaultTool extends DesignerTool<IEntity> {

//   private __fromDesignerEventToFnMap: Dict<Fn<{ designerEvent: IPipeEvent }, void>> = {
//     [DESIGNER_EVENT.PREVIEW]: (): void => {
//       const { x, y } = this._prevDefinedMouseEvent || { x: 0, y: 0 };
//       this._target = new Gate({ x, y, src: './AndGate.png' });
//     },
//     [DESIGNER_EVENT.SELECT]: ({ designerEvent }: { designerEvent: IPipeEvent }) => {
//       designerEvent.target!.$mutate(MouseComponent)({
//         events: {
//           [MOUSE_EVENT.MOUSE_ENTER]: [[StyleComponent.name, { colour: 'YELLOW' }]],
//           [MOUSE_EVENT.MOUSE_LEAVE]: [[StyleComponent.name, { colour: 'YELLOW' }]],
//         },
//         pipes: {
//           [MOUSE_EVENT.MOUSE_DOWN]: [['designer', { name: DESIGNER_EVENT.DESELECT }]],
//         },
//         isHovered: false,
//       });
//     },
//     [DESIGNER_EVENT.DESELECT]: ({ designerEvent }: { designerEvent: IPipeEvent }) => {
//       this.__fromDesignerEventToFnMap[DESIGNER_EVENT.RESET]({ designerEvent });
//     },
//   };

//   private __fromMouseEventToFnMap: Dict<Fn<any, void>> = {
//     [MOUSE_EVENT.MOUSE_MOVE]: ({ mouseEvent }: { mouseEvent: IMouseEvent}): void => {
//       if (!this._target) {
//         return;
//       }
//       this._target.$patch(PoseComponent)({ x: mouseEvent.x, y: mouseEvent.y });
//     },
//   };
// }