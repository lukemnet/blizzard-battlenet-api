import * as utils from '../../../../src/lib/utils';
import constants from '../../../../src/lib/constants';

const { getAllTokenUris } = utils;

/* tslint:disable no-expression-statement */
describe('getApiHosts()', () => {
  test('should be defined', () => {
    expect(getAllTokenUris).toBeDefined();
  });

  test('should be of type "function"', () => {
    expect(typeof getAllTokenUris).toBe('function');
  });

  test('should return an object', () => {
    expect(typeof getAllTokenUris()).toBeTruthy();
    expect(typeof getAllTokenUris()).toBe('object');
  });

  test('returned object should match constants.OAUTH_TOKEN_URIS property', () => {
    expect(getAllTokenUris()).toMatchObject(constants.OAUTH_TOKEN_URIS);
  });
});
/* tslint:enable no-expression-statement */
