import TypeCollection from '../../../../framework/concretes/data-structures/TypeCollection';
import Unique from '../../../../framework/abstracts/Unique';

class TestType1 extends Unique {

    constructor(id: string) {
        super(id);
    }

}

class TestType2 extends Unique {

    constructor(id: string) {
        super(id);
    }

}

class TestType3 extends Unique {

    constructor(id: string) {
        super(id);
    }

}

class TestType4 extends Unique {

}

describe(TypeCollection.name, () => {

    let collection: TypeCollection<Unique>;
    let testType1: TestType1;
    let testType2: TestType2;
    let testType3: TestType3;

    beforeEach(() => {
        collection = new TypeCollection<Unique>();
        expect(collection.get(TestType1)).toBeUndefined();
        expect(collection.get(TestType2)).toBeUndefined();
        expect(collection.get(TestType3)).toBeUndefined();
        expect(collection.get(TestType4)).toBeUndefined();

        testType1 = new TestType1('1');
        testType2 = new TestType2('one');
        testType3 = new TestType3('un');

        collection.add(testType1);
        collection.add(testType2);
        collection.add(testType3);
    });

    it('Add multiple instance types', (done) => {
        __validate(
            true,
            true,
            true
        );
        done();
    });

    it ('Remove some types', (done) => {
        //
        collection.remove(TestType1);
        collection.remove(TestType2);
        //
        __validate(
            false,
            false,
            true
        );
        done();
    });

    it ('Remove fails when nothing has been added', (done) => {
        expect(collection.remove(TestType4)).toBe(false);
        __validate(
            true,
            true,
            true
        );
        done();
    });

    it('Purge everything', (done) => {
        expect(collection.purge()).toBe(true);
        __validate(
            false,
            false,
            false
        );
        done();
    });

    const __validate = (
        isTestType1Expected: boolean,
        isTestType2Expected: boolean,
        isTestType3Expected: boolean,
    ) => {
        (isTestType1Expected)
            ? expect(collection.get(TestType1)).toBe(testType1)
            : expect(collection.get(TestType1)).toBe(undefined);
        (isTestType2Expected)
            ? expect(collection.get(TestType2)).toBe(testType2)
            : expect(collection.get(TestType2)).toBe(undefined);
        (isTestType3Expected)
            ? expect(collection.get(TestType3)).toBe(testType3)
            : expect(collection.get(TestType3)).toBe(undefined);
    };

});
