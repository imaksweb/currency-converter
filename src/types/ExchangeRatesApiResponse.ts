export interface ExchangeRatesApiResponse {
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
  success: boolean;
}
