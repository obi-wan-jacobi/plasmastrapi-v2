import Container from '../../../src/framework/data-structures/Container';

describe(Container.name, () => {

    let index: Container<{ id: string, value: string }>;

    beforeEach(() => {
        index = new Container();
    });

    it('get first element', (done) => {
        const first = { id: '1', value: '1' };
        index.add(first);
        index.add({ id: '2', value: '2' });
        index.add({ id: '3', value: '3' });
        //
        let innerMethodResult;
        const result = index.first((value) => {
            innerMethodResult = value;
        });
        //
        expect(result).toBe(first);
        expect(innerMethodResult).toBe(first);
        done();
    });

});
