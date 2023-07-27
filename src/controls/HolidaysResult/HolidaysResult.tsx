import React from "react";
import { Box, Grid, Spinner, useMediaQuery } from "@chakra-ui/react";

interface DateAndName {
  date: string;
  name?: string;
}

interface MonthCalendarProps {
  dates: string[];
  datesAndNames: DateAndName[];
  isLoading: boolean;
}

const HolidaysResult: React.FC<MonthCalendarProps> = (props) => {
  const { dates, datesAndNames, isLoading } = props;
  const [isSmallerThanTablet] = useMediaQuery("(max-width: 768px)");

  const renderDayCell = (
    date: string,
    isLoading: boolean,
    holidayName?: string
  ): JSX.Element => (
    <Box
      key={date}
      display="grid"
      gridTemplateRows="1fr 1fr"
      justifyContent="center"
      alignItems="center"
      border="1px solid gray"
      p={2} /* Reduce padding for smaller screens */
      textAlign="center"
      fontWeight="bold"
      fontSize={
        isSmallerThanTablet ? "14px" : "16px"
      } /* Adjust font size for smaller screens */
      color={holidayName ? "teal.500" : "gray.700"}
      bg={date === getCurrentDate() ? "red.100" : undefined}
    >
      <Grid>{date}</Grid>
      <Grid>{isLoading ? <Spinner /> : holidayName}</Grid>
    </Box>
  );

  const getCurrentDate = (): string => {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  };

  return (
    <Grid
      templateColumns={`repeat(${
        isSmallerThanTablet ? 3 : dates.length > 7 ? 7 : dates.length
      }, 1fr)`}
      gap={2}
      p={4}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      mt={4}
      mb={8}
      gridAutoRows={isSmallerThanTablet ? "80px" : "100px"}
    >
      {dates.map((date) => {
        const dateAndName = datesAndNames.find(
          (dateAndName) => dateAndName.date === date
        );
        return renderDayCell(date, isLoading, dateAndName?.name);
      })}
    </Grid>
  );
};

export default HolidaysResult;
