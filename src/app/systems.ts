
// const fromTerminalHandleToWirestyling = (handle: IEntity, terminal: IEntity) => {
//   const handlePose = handle.$copy(PoseComponent);
//   const terminalPose = terminal.$copy(PoseComponent);
//   const pose = {
//     x: (handlePose.x + terminalPose.x) / 2,
//     y: (handlePose.y + terminalPose.y) / 2,
//     a: Math.atan2(handlePose.y - terminalPose.y, handlePose.x - terminalPose.x),
//   };
//   const length = getEuclideanDistanceBetweenPoints(handlePose, terminalPose);
//   const shape = transformShape({
//     points: [
//       { x: length / 2, y: 2 },
//       { x: -length / 2, y: 2 },
//       { x: -length / 2, y: -2 },
//       { x: length / 2, y: -2 },
//     ],
//   }, pose);
//   const styling = { colour: 'WHITE' };
//   return { shape, styling };
// };

// export default class RivetSystem extends System<any> {

//   public draw(): void {
//     // $add(RivetComponent)({
//     //   colour: 'WHITE', radius: 3,
//     // });
//     this.$engine.components.forEvery(RivetComponent)((rivet) => {
//       const styling = rivet.copy();
//       const pose = rivet.$entity.$copy(PoseComponent);
//       const corners = rivet.$entity.$copy(ShapeComponent).points;
//       const points = [
//         { x: corners[0].x - 7, y: corners[0].y - 7 },
//         { x: corners[1].x + 7, y: corners[1].y - 7 },
//         { x: corners[2].x + 7, y: corners[2].y + 7 },
//         { x: corners[3].x - 7, y: corners[3].y + 7 },
//       ];
//       points.forEach((point) => {
//         this.$engine.viewport.drawCircle({
//           position: { x: point.x + pose.x, y: point.y + pose.y },
//           radius: styling.radius,
//           styling,
//         });
//       });
//     });
//   }
// }
