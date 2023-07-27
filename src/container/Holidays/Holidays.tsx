import { Result } from "../../api/getPublicHolidays";
import { HolidaysResult } from "../../controls/HolidaysResult";
import { getDatesInRange } from "../../utils/getDatesInRange";

interface HolidaysProps {
  startDate: string;
  endDate: string;
  isLoading: boolean;
  holidays: Result[];
}

const Holidays = (props: HolidaysProps) => {
  const { startDate, endDate, holidays, isLoading } = props;

  const datesInRange = getDatesInRange(startDate, endDate);

  if (!holidays) return <></>;

  const datesAndNames = holidays.map((holiday) => {
    return {
      date: holiday.startDate,
      name: holiday.name.find((name) => name.language === "EN")?.text,
    };
  });

  return (
    <HolidaysResult
      dates={datesInRange}
      datesAndNames={datesAndNames}
      isLoading={isLoading}
    />
  );
};

export default Holidays;
