
  // public updatePose(): void {
  //   const inPose = this.input.$copy(PoseComponent);
  //   const outPose = this.output.$copy(PoseComponent);
  //   const x = (inPose.x + outPose.x) / 2;
  //   const y = (inPose.y + outPose.y) / 2;
  //   const a = Math.atan2(inPose.y - outPose.y, inPose.x - outPose.x);
  //   this.$add(PoseComponent)({ x, y, a });
  // }

  // public updateShape(): void {
  //   const inPose = this.input.$copy(PoseComponent);
  //   const outPose = this.output.$copy(PoseComponent);
  //   const length = getEuclideanDistanceBetweenPoints(inPose, outPose);
  //   this.$add(ShapeComponent)({
  //     vertices: [
  //       { x: length / 2, y: 2 },
  //       { x: - length / 2, y: 2 },
  //       { x: - length / 2, y: -2 },
  //       { x: length / 2, y: -2 },
  //     ],
  //   });
  // }

