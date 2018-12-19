import Invocable from '../framework/abstracts/Invocable';
import * as sinon from 'sinon';

export default class Impostor<T> extends Invocable<void, T> {

    private __fake: T;
    private __mock: sinon.SinonMock;
    private __expectations: sinon.SinonExpectation[];

    constructor(methods: string[]) {
        super({ method: () => this.__fake });
        this.__expectations = [];
        this.__initFake(methods);
        this.__initMock();
    }

    public expects(method: string): sinon.SinonExpectation {
        const expectation = this.__mock.expects(method);
        this.__expectations.push(expectation);
        return expectation;
    }

    public assertMethodsCalledInOrder(): void {
        sinon.assert.callOrder(...this.__expectations);
    }

    public verify(): void {
        this.__mock.verify();
    }

    private __initFake(methods: string[]): void {
        const fake: { [key: string]: any } = {};
        methods.forEach((methodName) => {
            fake[methodName] = (): void => undefined;
        });
        this.__fake = fake as unknown as T;
    }

    private __initMock(): void {
        this.__mock = sinon.mock(this.__fake);
    }
}
