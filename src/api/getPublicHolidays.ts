import axios from "axios";

const HOLIDAYS_API_URL = "https://openholidaysapi.org/PublicHolidays";

export interface Result {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  name: Name[];
  nationwide: boolean;
  subdivisions?: Subdivision[];
}

export interface Name {
  language: string;
  text: string;
}

export interface Subdivision {
  code: string;
  shortName: string;
}

export const getPublicHolidays = async (
  countryIsoCode: string,
  startDate: string,
  endDate: string
): Promise<Result[]> => {
  try {
    const response = await axios.get(
      `${HOLIDAYS_API_URL}?countryIsoCode=${countryIsoCode}&validFrom=${startDate}&validTo=${endDate}`
    );
    return response.data as Result[];
  } catch (error) {
    console.error("Error fetching public holidays:", error);
    return [];
  }
};
