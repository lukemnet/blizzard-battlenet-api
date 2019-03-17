import {
  RegionIdOrName,
  ClientId,
  ClientSecret,
  Endpoint,
  Endpoints,
  AccessToken,
  Selector,
  // EndpointsWithSelectors,
} from '../types';
import { QueryOptions } from '../interfaces';
import BattleNetAPI from './abstract/BattleNetAPI';
import * as bnetHelpers from '../helpers/bnet';

/* tslint:disable:no-class no-this no-expression-statement no-object-mutation readonly-keyword typedef */

export default class BlizzAPI extends BattleNetAPI {
  readonly options: QueryOptions;

  constructor(
    region: RegionIdOrName,
    clientId: ClientId,
    clientSecret: ClientSecret,
    accessToken?: AccessToken,
    options?: QueryOptions,
  ) {
    super(region, clientId, clientSecret, accessToken);
    this.options = (options as QueryOptions) || {
      batchQueryInterval: 500, // interval between subsequent batch queries
      // onAccessTokenInvalid: null, // function to run when access token is invalid
      // onAccessTokenRefresh: null, // function to run when access token is refreshed
    };
  }

  query = async (endpoint: Endpoint) =>
    bnetHelpers.query(this.region, endpoint, await this.getAccessToken());

  querySearch = async (endpoint: Endpoint, selector: Selector) =>
    bnetHelpers.querySearch(this.region, endpoint, selector, await this.getAccessToken());

  queryBatch = async (endpoints: Endpoints, options = this.options) =>
    bnetHelpers.queryBatch(this.region, endpoints, await this.getAccessToken(), options);

  // querySearchBatch = async (
  //   endpointsWithSelectors: EndpointsWithSelectors,
  //   options = this.options,
  // ) =>
  //   bnetHelpers.querySearchBatch(
  //     this.region,
  //     endpointsWithSelectors,
  //     await this.getAccessToken(),
  //     options,
  //   );
}

/* tslint:disable:no-unnecessary-class no-this */