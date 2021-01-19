import Component from 'engine/abstracts/Component';
import { IPose } from 'framework/geometry/components/PoseComponent';

export default class MachineComponent extends Component<{ initialPose: IPose }> {}