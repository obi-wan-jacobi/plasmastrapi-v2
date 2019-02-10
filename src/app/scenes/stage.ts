import ControlInput from '../entities/circuit-elements/ControlInput';
import ControlOutput from '../entities/circuit-elements/ControlOutput';
import StageArea from '../entities/stage/StageArea';
import StartButton from '../entities/stage/buttons/StartButton';

export default [
    {
        Ctor: ControlInput,
        args: { x: 820, y: 100 },
    },
    {
        Ctor: ControlInput,
        args: { x: 780, y: 100 },
    },
    {
        Ctor: ControlOutput,
        args: { x: 820, y: 580 },
    },
    {
        Ctor: ControlOutput,
        args: { x: 780, y: 580 },
    },
    {
        Ctor: StageArea,
        args: { position: { x: 1060, y: 340 }, width: 400, height: 400 },
    },
    {
        Ctor: StartButton,
        args: { position: { x: 1060, y: 610 }, width: 100, height: 100 },
    },
];
