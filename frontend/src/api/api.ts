import { BalanceSheetApi, Configuration } from './generated';

const configuration = new Configuration({
  basePath: `${window.location.protocol}//${window.location.host}`,
  headers: {
    'accept-encoding': 'gzip, deflate',
  },
});

export function getBalanceSheetApi() {
  const api = new BalanceSheetApi(configuration);
  return {
    getBalanceSheet: api.balanceSheet.bind(api),
  };
}
