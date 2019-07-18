import * as helpers from '../helpers';
import * as utils from '../utils';
import { Endpoint, RegionIdOrName, AccessToken } from '../../../@types';
import BattleNetAPI = require('./abstract/BattleNetAPI');
export interface BlizzAPIOptions {
  validateAccessTokenOnEachQuery?: boolean;
  refreshExpiredAccessToken?: boolean;
  onAccessTokenExpire?: Function | undefined;
  onAccessTokenRefresh?: Function | undefined;
}

export interface BattleNetOptions extends BlizzAPIOptions {
  region: RegionIdOrName;
  clientId: string;
  clientSecret: string;
  accessToken?: string;
}

export default class BlizzAPI extends BattleNetAPI {
  readonly options: BlizzAPIOptions;

  constructor(options: BattleNetOptions) {
    super(options.region, options.clientId, options.clientSecret, options.accessToken);
    this.options = {
      validateAccessTokenOnEachQuery: options.validateAccessTokenOnEachQuery
        ? options.validateAccessTokenOnEachQuery
        : false, // revalidate access token on each single query
      refreshExpiredAccessToken: options.refreshExpiredAccessToken
        ? options.refreshExpiredAccessToken
        : false, // revalidate access token if error 403
      onAccessTokenRefresh: options.onAccessTokenRefresh ? options.onAccessTokenRefresh : undefined, // function to run when access token is refreshed
    };
  }

  query = async (endpoint: Endpoint) =>
    // helpers.query(this.region, endpoint, await this.getAccessToken(), this.options);
    helpers.query(this.region, endpoint, await this.getAccessToken());

  getAccessToken = async () =>
    helpers.getAccessToken(this.region, this.clientId, this.clientSecret);

  validateAccessToken = async (regionIdOrName: RegionIdOrName, accessToken: AccessToken) =>
    helpers.validateAccessToken(regionIdOrName, accessToken);

  static getAllRegions = utils.getAllRegions;
  static getAllRegionIds = utils.getAllRegionIds;
  static getAllRegionNames = utils.getAllRegionNames;
  static getRegionNameById = utils.getRegionNameById;
  static validateRegionId = utils.validateRegionId;
  static getRegionIdByName = utils.getRegionIdByName;
  static validateRegionName = utils.validateRegionName;
  static getAllLocales = utils.getAllLocales;
  static getAllLocaleNames = utils.getAllLocaleNames;
  static getLocalesByRegionId = utils.getLocalesByRegionId;
  static checkIfLocaleLooksValid = utils.checkIfLocaleLooksValid;
  static validateLocale = utils.validateLocale;
  static isLocaleValidForRegionId = utils.isLocaleValidForRegionId;
  static getAllSc2Realms = utils.getAllSc2Realms;
  static getAllAvailableSc2Realms = utils.getAllAvailableSc2Realms;
  static getSc2RealmsByRegionId = utils.getSc2RealmsByRegionId;
  static checkIfSc2RealmLooksValid = utils.checkIfSc2RealmLooksValid;
  static validateSc2Realm = utils.validateSc2Realm;
  static isSc2RealmValidForRegionId = utils.isSc2RealmValidForRegionId;
}
