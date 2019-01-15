import CircuitArea from '../entities/CircuitArea';
import GateCreationButton from '../entities/buttons/GateCreationButton';
import GateRemovalButton from '../entities/buttons/GateRemovalButton';
import StageArea from '../entities/StageArea';
import WireRemovalButton from '../entities/buttons/WireRemovalButton';

// const CANVAS_WIDTH = 1280;
// const CANVAS_HEIGHT = 680;

export default [
    {
        Ctor: WireRemovalButton,
        args: { x: 40, y: 40 },
    },
    {
        Ctor: GateRemovalButton,
        args: { x: 100, y: 40 },
    },
    {
        Ctor: CircuitArea,
        args: { position: { x: 430, y: 340 }, width: 820, height: 520 },
    },
    {
        Ctor: StageArea,
        args: { position: { x: 1060, y: 340 }, width: 400, height: 400 },
    },
    {
        Ctor: GateCreationButton,
        args: { x: 40, y: 640 },
    },
];
