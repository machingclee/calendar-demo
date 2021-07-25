import utils from "..";
import { DateType, TCanlenderItem } from "../../components/commons/Calender/Calender";

export const getYearItem = (year: string): TCanlenderItem => {
  const dateArr = utils.getDaysArray(
    new Date(`${year}-01-01`),
    new Date(`${year}-12-31`)
  );

  const monthItems: TCanlenderItem[] = [];
  for (const currMonth of utils.range(12)) {
    const daysOfCurrMonth = dateArr.filter(date => date.getMonth() === currMonth).map(date => {
      return {
        type: DateType.DAY,
        date,
        value: String(date.getDate())
      }
    });
    const monthItem: TCanlenderItem = {
      type: DateType.MONTH,
      value: String(currMonth + 1),
      children: daysOfCurrMonth
    }
    monthItems.push(monthItem);
  }

  return { type: DateType.YEAR, value: year, children: monthItems }
}