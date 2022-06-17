import PowerSource from 'app/gates/PowerSource';
import { app } from 'app/main';
import DigitalSystem from 'app/systems/DigitalSystem';
import WireSystem from 'app/systems/WireSystem';
import ConstraintSystem from 'contraptions/systems/ConstraintSystem';
import TriggerSystem from 'contraptions/systems/TriggerSystem';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import LabelComponent from 'foundation/presentation/components/LabelComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default class PlayButton extends HTML5CanvasElement {

  public constructor({ x, y }: { x: number; y: number }) {
    super();
    this.$add(PoseComponent, { x, y, a: 0 });
    const width = 40, height = 20;
    this.$add(ShapeComponent, {
      vertices: [
        { x: -width/2, y: -height/2 },
        { x: -width/2, y: height/2 },
        { x: width/2, y: height/2 },
        { x: width/2, y: -height/2 },
      ],
    });
    this.$add(LabelComponent, {
      text: 'PLAY',
      fontSize: 14,
      offset: { x: -17, y: 5 },
    });
    this.$add(StyleComponent, {
      colour: 'WHITE',
      fill: '',
      opacity: 1,
      zIndex: 1,
    });
    this.$add(MouseComponent, { x: 0, y: 0, isHovered: false });
  }

  public [MOUSE_EVENT.CLICK](): void {
    ENTITIES.forEvery(PowerSource)((ps) => {
      ps.high();
      ps.next();
    });
    app.systems.add(DigitalSystem);
    app.systems.add(WireSystem);
    app.systems.add(TriggerSystem);
    app.systems.add(ConstraintSystem);
  }

}