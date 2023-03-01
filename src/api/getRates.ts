import type { ExchangeRatesApiResponse } from '../types/ExchangeRatesApiResponse';

export const getRatesApi = async (baseCurrency: string): Promise<ExchangeRatesApiResponse> => {
  const myHeaders: HeadersInit = new Headers();

  myHeaders.append('apikey', 'YOUR API_KEY');

  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  const url: string = `https://api.apilayer.com/exchangerates_data/latest?base=${baseCurrency}`;

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    const parsedResult = JSON.parse(result);

    if (!parsedResult.success) {
      throw new Error('API call unsuccessful');
    }

    return parsedResult;
  } catch (error) {
    throw new Error(`Error calling API: ${error}`);
  }
};
