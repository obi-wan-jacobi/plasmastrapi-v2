import OneDimensionalLink from '../../src/framework/objects/Link';

test('set + get value', () => {

    const prevValue = { value: 'I am previous link\s value!' };
    const curValue = 2;
    const nextValue = 'oh, this is a string';

    const [linkToObject, linkToNumber, linkToString, linkToNull] = [
        new OneDimensionalLink(prevValue),
        new OneDimensionalLink(curValue),
        new OneDimensionalLink(nextValue),
        new OneDimensionalLink(null),
    ];

    expect(linkToObject.value).toBe(prevValue);
    expect(linkToNumber.value).toBe(curValue);
    expect(linkToString.value).toBe(nextValue);
    expect(linkToNull.value).toBe(null);

});

test('set previous also sets next on the other', () => {

    const [previous, current, next] =
        __generatePreviousCurrentNext();

    expect(previous.previous).toBe(previous);
    expect(previous.next).toBe(current);
    expect(current.previous).toBe(previous);

});

test('set next also sets previous on the other', () => {

    const [previous, current, next] =
        __generatePreviousCurrentNext();

    expect(current.next).toBe(next);
    expect(next.previous).toBe(current);
    expect(next.next).toBe(next);

});

test('check isFirst and isEnd of chain', () => {

    const [previous, current, next] =
        __generatePreviousCurrentNext();

    expect(previous.isStart).toBe(true);
    expect(previous.isEnd).toBe(false);
    expect(current.isStart).toBe(false);
    expect(current.isEnd).toBe(false);
    expect(next.isStart).toBe(false);
    expect(next.isEnd).toBe(true);

});

const __generatePreviousCurrentNext =
(prevValue = null, curValue = null, nextValue = null) => {
    const [previous, current, next] = [
        new OneDimensionalLink(prevValue),
        new OneDimensionalLink(curValue),
        new OneDimensionalLink(nextValue),
    ];
    current.previous = previous;
    current.next = next;
    return [
        previous,
        current,
        next,
    ];
};
