import { useState, useEffect } from "react";
import { Result, getPublicHolidays } from "../../api/getPublicHolidays";
import { Grid } from "@chakra-ui/react";
import { CalendarForm } from "../../controls/CalendarForm";
import { getFirstAndLastDateOfMonth } from "../../utils/getFirstAndLastDateOfMonth";
import { Holidays } from "../Holidays";
import { useGeolocated } from "react-geolocated";

const Calendar = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const [selectedCountry, setSelectCountry] = useState<string>("DE");
  const [selectedMonth, setSelectMonth] = useState<string>(currentMonth);
  const [selectedYear, setSelectYear] = useState<Date | null>(
    new Date(currentYear, 0, 1)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [holidays, setHolidays] = useState<Result[]>();

  const [startDate, endDate] = getFirstAndLastDateOfMonth(
    selectedMonth,
    selectedYear ? selectedYear : new Date(currentYear, 0, 1)
  );

  useEffect(() => {
    const fetchHolidays = async () => {
      setIsLoading(true);

      const fetchedHolidays = await getPublicHolidays(
        selectedCountry,
        startDate,
        endDate
      );
      setHolidays(fetchedHolidays);
      setIsLoading(false);
    };

    fetchHolidays();
  }, [endDate, selectedCountry, startDate]);

  interface GeolocalizationResponse {
    country_code: string;
    country_name: string;
    city: string;
    postal: string;
    latitude: number;
    longitude: number;
    IPv4: string;
    state: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      if (
        isGeolocationAvailable &&
        isGeolocationEnabled &&
        coords?.latitude &&
        coords?.longitude
      ) {
        const apiUrl = `https://geolocation-db.com/json/${coords.latitude},${coords.longitude}&position=true`;

        try {
          const response = await fetch(apiUrl);
          const data: GeolocalizationResponse = await response.json();

          if (data.country_name) {
            setSelectCountry(data.country_code);
          } else {
            setSelectCountry("DE");
          }
        } catch (error) {
          console.error("Error fetching geolocation data:", error);
          setSelectCountry("DE");
        }
      }
    };

    fetchData();
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

  const handleSelectCountry = (country: string) => {
    setSelectCountry(country);
  };

  const handleSelectMonth = (month: string) => {
    setSelectMonth(month);
  };

  const handleSelectYear = (year: Date | null) => {
    setSelectYear(year);
  };

  return (
    <Grid padding={20}>
      <CalendarForm
        selectedCountry={selectedCountry}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onSelectCountry={(country) => handleSelectCountry(country)}
        onSelectMonth={(month) => handleSelectMonth(month)}
        onSelectYear={(year) => handleSelectYear(year)}
      />
      {holidays && (
        <Holidays
          startDate={startDate}
          endDate={endDate}
          holidays={holidays}
          isLoading={isLoading}
        />
      )}
    </Grid>
  );
};

export default Calendar;
