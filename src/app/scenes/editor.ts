import Button from '../entities/Button';
import GateFactoryButton from '../entities/GateFactoryButton';

export default [
    {
        Ctor: Button,
        args: { x: 40, y: 40 },
    },
    {
        Ctor: Button,
        args: { x: 100, y: 40 },
    },
    {
        Ctor: GateFactoryButton,
        args: { x: 40, y: 640 },
    },
];
