import { createHttpClient } from "./http-client";

export type ProxyScraperAPI = {
  getCarLoanRatesPage(): Promise<string | undefined>;
  getCreditCardRatesPage(): Promise<string | undefined>;
  getMortgageRatesPage(): Promise<string | undefined>;
  getPersonalLoanRatesPage(): Promise<string | undefined>;
};

export function ProxyScraperAPI(): ProxyScraperAPI {
  const httpClient = createHttpClient("ProxyScraperAPI", {
    prefixUrl: process.env.BASE_PROXY_URL,
  });

  async function getCarLoanRatesPage(): Promise<string | undefined> {
    const response = await httpClient("scrape/car-loan");
    return response.text();
  }

  async function getCreditCardRatesPage(): Promise<string | undefined> {
    const response = await httpClient("scrape/credit-cards");
    return response.text();
  }

  async function getMortgageRatesPage(): Promise<string | undefined> {
    const response = await httpClient("scrape");
    return response.text();
  }

  async function getPersonalLoanRatesPage(): Promise<string | undefined> {
    const response = await httpClient("scrape/personal-loan");
    return response.text();
  }

  return {
    getCarLoanRatesPage,
    getCreditCardRatesPage,
    getMortgageRatesPage,
    getPersonalLoanRatesPage,
  };
}
