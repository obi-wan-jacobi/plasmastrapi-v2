import Index from '../../../../src/framework/concretes/data-structures/Index';
import TypeIndex from '../../../../src/framework/concretes/data-structures/TypeIndex';

describe(TypeIndex.name, () => {

    let index: Index<{ id: string, value: string }>;

    beforeEach(() => {
        index = new Index();
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
