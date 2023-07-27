import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CalendarForm } from "./controls/CalendarForm";

test("displays selected country and correctly", () => {
  const selectedCountry = "US";
  const selectedMonth = "07";
  const selectedYear = new Date(2023, 0, 1);

  render(
    <CalendarForm
      selectedCountry={selectedCountry}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      onSelectCountry={() => {}}
      onSelectMonth={() => {}}
      onSelectYear={() => {}}
    />
  );

  const countrySelect = screen.getByLabelText("Country");
  const monthSelect = screen.getByLabelText("Month");

  expect(countrySelect).toHaveValue(selectedCountry);
  expect(monthSelect).toHaveValue(selectedMonth);
});

test("calls onSelectCountry and onSelectMonth callbacks correctly", () => {
  const onSelectCountryMock = jest.fn();
  const onSelectMonthMock = jest.fn();
  const onSelectYearMock = jest.fn();

  render(
    <CalendarForm
      selectedCountry="US"
      selectedMonth="07"
      selectedYear={new Date(2023, 0, 1)}
      onSelectCountry={onSelectCountryMock}
      onSelectMonth={onSelectMonthMock}
      onSelectYear={onSelectYearMock}
    />
  );

  const countrySelect = screen.getByLabelText(/country/i);
  const monthSelect = screen.getByLabelText(/month/i);

  fireEvent.change(countrySelect, { target: { value: "DE" } });
  fireEvent.change(monthSelect, { target: { value: "08" } });

  expect(onSelectCountryMock).toHaveBeenCalledWith("DE");
  expect(onSelectMonthMock).toHaveBeenCalledWith("08");
});
