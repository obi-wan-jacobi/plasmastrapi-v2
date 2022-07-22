import Command from 'app/abstracts/Command';
import { app } from 'app/main';
import IEntity from 'engine/interfaces/IEntity';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';

export default class MoveCommand extends Command {

  private __target$: string;
  private __newLocation: IPoint;
  private __initialLocation: IPoint;

  public constructor({ target, destination }: { target: IEntity; destination: IPoint }) {
    super();
    this.__target$ = target.$id;
    this.__newLocation = destination;
    this.__initialLocation = target.$copy(PoseComponent)!;
  }

  public invoke(): void {
    app.entities.get(this.__target$)!.$patch(PoseComponent, this.__newLocation);
  }

  public undo(): void {
    app.entities.get(this.__target$)!.$patch(PoseComponent, this.__initialLocation);
  }

}