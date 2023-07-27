import React from "react";
import { FormControl, FormLabel, VStack, Select, Box } from "@chakra-ui/react";
import { countryValues } from "./countryValues";
import { monthValues } from "./monthValues";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarFormProps {
  selectedCountry: string;
  selectedMonth: string;
  selectedYear: Date | null;
  onSelectCountry: (country: string) => void;
  onSelectMonth: (month: string) => void;
  onSelectYear: (year: Date | null) => void;
}

const CalendarForm: React.FC<CalendarFormProps> = (props) => {
  const {
    selectedCountry,
    selectedMonth,
    selectedYear,
    onSelectCountry,
    onSelectMonth,
    onSelectYear,
  } = props;

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" shadow="md" bg="white">
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel htmlFor="country">Country</FormLabel>
          <Select
            id="country"
            name="country"
            onChange={(e) => onSelectCountry(e.target.value)}
            value={selectedCountry}
            bg="white"
          >
            {countryValues.map((countryValue, index) => {
              return (
                <option key={countryValue.value} value={countryValue.value}>
                  {countryValue.text}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="year">Year</FormLabel>
          <DatePicker
            selected={selectedYear}
            onChange={(date) => (date ? onSelectYear(date) : new Date())}
            dateFormat="yyyy"
            showYearPicker
            customInput={
              <Box
                as="input"
                w="100%"
                borderWidth="1px"
                borderColor="gray.200"
                px={3}
                py={2}
                borderRadius="md"
                bg="white"
                _hover={{ borderColor: "gray.300" }}
                _focus={{
                  outline: "none",
                  borderColor: "teal.400",
                  boxShadow: "0 0 0 2px rgba(66, 153, 225, 0.3)",
                }}
              />
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="month">Month</FormLabel>
          <Select
            id="month"
            name="month"
            onChange={(e) => onSelectMonth(e.target.value)}
            value={selectedMonth}
            bg="white"
          >
            {monthValues.map((monthValue) => {
              return (
                <option key={monthValue.value} value={monthValue.value}>
                  {monthValue.text}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default CalendarForm;
