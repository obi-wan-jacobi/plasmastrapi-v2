
export default class InteractiveSystem extends System {

  public once(): void {
    this.$engine.entities.forEvery(InteractiveEntity)((target) => {
      target.$once();
    });
  }
}
