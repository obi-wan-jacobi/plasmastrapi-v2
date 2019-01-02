import LinkedList from '../../../../engine/concretes/data-structures/LinkedList';

describe(LinkedList, () => {

    let list: LinkedList<{}>;
    let firstValue: {};
    let secondValue: {};
    let thirdValue: {};
    let expectedValueSequence: Array<{}>;

    beforeEach(() => {
        list = new LinkedList<{}>();
        firstValue = { data: 'first' };
        secondValue = { data: 'second' };
        thirdValue = { data: 'third' };
        expectedValueSequence = [firstValue, secondValue, thirdValue];
    });

    it('first and last of empty list are undefined', (done) => {
        __validateValue(list.first, undefined);
        __validateValue(list.last, undefined);
        expect(list.isEmpty).toBe(true);
        done();
    });

    it('first and last are equal when only one element', (done) => {
        list.push(firstValue);
        __validateFirst(list, firstValue);
        __validateLast(list, firstValue);
        done();
    });

    it('push adds new element to the end', (done) => {
        //
        list.push(firstValue);
        list.push(secondValue);
        list.push(thirdValue);
        //
        __validate(list, expectedValueSequence);
        done();
    });

    it('pop removes element front front', (done) => {
        list.push(firstValue);
        list.push(secondValue);
        list.push(thirdValue);
        //
        const actualShiftOutSequence = [
            list.pop(),
            list.pop(),
            list.pop(),
        ];
        //
        expect(list.isEmpty).toBe(true);
        expect(actualShiftOutSequence).toEqual([thirdValue, secondValue, firstValue]);
        done();
    });

    it('unshift adds new element to the front', (done) => {
        //
        list.unshift(thirdValue);
        list.unshift(secondValue);
        list.unshift(firstValue);
        //
        __validate(list, expectedValueSequence);
        done();
    });

    it('shift removes element front front', (done) => {
        list.unshift(thirdValue);
        list.unshift(secondValue);
        list.unshift(firstValue);
        //
        const actualShiftOutSequence = [
            list.shift(),
            list.shift(),
            list.shift(),
        ];
        //
        expect(list.isEmpty).toBe(true);
        expect(actualShiftOutSequence).toEqual([firstValue, secondValue, thirdValue]);
        done();
    });

    it('forEach iterates through all elements', (done) => {
        list.push(firstValue);
        list.push(secondValue);
        list.push(thirdValue);
        //
        list.forEach((value) => {
            value.data = 0;
        });
        //
        __validate(list, [{ data: 0 }, { data: 0 }, { data: 0 }]);
        done();
    });

    it('map returns transform of all elements', (done) => {
        list.push(firstValue);
        list.push(secondValue);
        list.push(thirdValue);
        //
        const transforms = list.map((value: { data: any }) => {
            return value.data;
        });
        //
        expect(transforms).toEqual(['first', 'second', 'third']);
        done();
    });

});

const __validate = <T>(list: LinkedList<T>, expectedValueSequence: T[]): void => {
    expect(list.length).toBe(expectedValueSequence.length);
    expect(list.length).toBeGreaterThan(1);
    expect(list.isEmpty).toBe(false);
    __validateFirst(list, expectedValueSequence[0]);
    __validateLast(list, expectedValueSequence[expectedValueSequence.length - 1]);
    let cursor = list.unwrap();
    let index = 0;
    while (cursor) {
        __validateValue(cursor.value, expectedValueSequence[index]);
        cursor = cursor.next;
        index++;
    }
};

const __validateValue = <T>(actual: T, expected: T): void => {
    expect(actual).toEqual(expected);
};

const __validateFirst = <T>(list: LinkedList<T>, expectedValue: {}): void => {
    expect(list.first).toEqual(expectedValue);
};

const __validateLast = <T>(list: LinkedList<T>, expectedValue: {}): void => {
    expect(list.last).toEqual(expectedValue);
};
