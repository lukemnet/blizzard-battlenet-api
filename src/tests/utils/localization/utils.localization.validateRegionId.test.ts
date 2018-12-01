import { BattleNetUtils } from '../../../lib/utils';
const { validateRegionId } = BattleNetUtils;

describe('validateRegionId()', () => {
  test('should be defined', () => {
    expect(validateRegionId).toBeDefined();
  });

  test('should be of type "function"', () => {
    expect(typeof validateRegionId).toBe('function');
  });

  test.each`
    input | expectedResult
    ${1}  | ${true}
    ${2}  | ${true}
    ${3}  | ${true}
    ${5}  | ${true}
  `('returns true for region id $input as integer', ({ input, expectedResult }) => {
    expect(validateRegionId(parseInt(input, 10))).toBe(expectedResult);
  });

  test.each`
    input  | expectedResult
    ${'1'} | ${true}
    ${'2'} | ${true}
    ${'3'} | ${true}
    ${'5'} | ${true}
  `('returns $expectedResult for region id $input as string', ({ input, expectedResult }) => {
    expect(validateRegionId(input.toString())).toBe(expectedResult);
  });

  test.each`
    input      | expectedResult
    ${'10'}    | ${false}
    ${'9999'}  | ${false}
    ${'23232'} | ${false}
    ${'a1'}    | ${false}
    ${'adasf'} | ${false}
    ${'1abc'}  | ${false}
    ${'!@#$'}  | ${false}
    ${'><1'}   | ${false}
  `('throws $expectedResult for $input as string', ({ input, expected }) => {
    expect(() => {
      validateRegionId(input.toString());
    }).toThrow(expected);
  });

  test.each`
    input    | expectedResult
    ${10}    | ${false}
    ${9999}  | ${false}
    ${23232} | ${false}
    ${0}     | ${false}
    ${-32}   | ${false}
    ${-5}    | ${false}
  `('throws $expectedResult for $input as number', ({ input, expected }) => {
    expect(() => {
      validateRegionId(parseInt(input, 10));
    }).toThrow(expected);
  });
});